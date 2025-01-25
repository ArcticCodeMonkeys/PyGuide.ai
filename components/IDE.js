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
    <View>
      <h2>Judge0 IDE</h2>

      {/* Monaco Editor for code input */}
      <Editor
        height="40vh"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
      />

      {/* Command-line input for user input */}
      <LabeledInputField>
        placeholder="Enter input here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="5"
        style={{ width: "100%", marginTop: "10px" }}
      />

      {/* Button to run code */}
      <button onClick={handleRun} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Running..." : "Run Code"}
      </button>

      {/* Output display */}
      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {output}
      </pre>
    </View>
  );
};

export default IDE;