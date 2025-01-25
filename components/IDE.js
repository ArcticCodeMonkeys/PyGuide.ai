import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

const IDE = () => {
  // State variables
  const [code, setCode] = useState("# Write your Python code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [languageId, setLanguageId] = useState(71); // Python 3 language ID
  const [loading, setLoading] = useState(false);

  // Handle code execution
  const handleRun = async () => {
    setLoading(true);
    setOutput(""); // Reset output

    try {
      // Send code to Judge0 API
      const submissionResponse = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false",
        {
          source_code: code,
          language_id: languageId,
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "5c9ccf5690msh845045ae2754aa2p1bf8d9jsn5865582cc2df",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      // Get the token from the response
      const token = submissionResponse.data.token;

      // Poll the API to get the result
      let result;
      do {
        const resultResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              "X-RapidAPI-Key": "5c9ccf5690msh845045ae2754aa2p1bf8d9jsn5865582cc2df",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        result = resultResponse.data;

        if (result.status.id <= 2) {
          // Status: In Queue or Processing
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          break;
        }
      } while (true);

      // Display the result in the output
      setOutput(result.stdout || result.stderr || "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* IDE section taking up 2/3 of the screen */}
      <div style={styles.ideContainer}>
        <Editor
          height="100%" // Ensure the editor takes up full height of the container
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: {
              enabled: false, // Disable the minimap
            },
          }}
        />
      </div>

      {/* Input/output section for user input and results */}
      <div style={styles.inputOutputContainer}>
    <textarea
      placeholder="Enter input here"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      rows="5"
      style={styles.input}
    />
        <button onClick={handleRun} disabled={loading} style={styles.runButton}>
          {loading ? "Running..." : "Run Code"}
        </button>

        {/* Scrollable output area */}
        <div style={styles.output}>
          {output}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'block', // Remove flexbox layout from the page container
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    width: '100%', // Ensure the width is properly set
  },
  ideContainer: {
    width: 'calc(100% - 650px)', // Ensure the editor container takes up full width
    height: 'calc(100vh - 400px)', // Adjust height to leave space for input/output
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: '400px', // Left margin to position the editor
    marginRight: '200px', // Right margin
    paddingRight: '200px',
    paddingLeft: '200px',
    position: 'relative', // Ensure the Monaco Editor is positioned properly
  },
  inputOutputContainer: {
    marginLeft: '500px', // Align input/output section with the editor
    marginRight: '175px', // Align input/output section with the editor
    marginTop: '20px',
    paddingRight: '0px',
    paddingLeft: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
  },
  runButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '25px',
  },
  output: {
    whiteSpace: 'pre-wrap', // Ensure text wraps if it's too long
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '16px',
    maxHeight: '125px', // Set max height to limit the output area size
    overflowY: 'auto', // Enable scrolling for long content
    border: '1px solid #ccc', // Optional: Add a border for a clean look
    marginTop: '10px', // Ensure spacing from the button and input
    marginLeft: '25px',
  },
};

export default IDE;