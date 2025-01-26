import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Menu, User, Star, SquareArrowUp, LoaderCircle, CircleArrowRight, Circle} from "lucide-react";

const IDE = ({onCodeContent, questionContent}) => {
  // State variables

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [languageId, setLanguageId] = useState(71); // Python 3 language ID
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [levelUp, setLevelUp] = useState(true); // New state for level-up popup
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const isInitialRender = useRef(true); // Ref to track initial render

  useEffect(() => {
    // Only update the code state on the first render or if explicitly required
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (questionContent.code !== code) {
      setCode("from typing import List\n"+questionContent.code || "");
    }
  }, [questionContent.code]);


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
            "X-RapidAPI-Key": "15cc6bc58fmshc56c3f53fd6b998p1236d6jsn363bc0653340",
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
              "X-RapidAPI-Key": "15cc6bc58fmshc56c3f53fd6b998p1236d6jsn363bc0653340",
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
      {/* Header */}
      <div style={styles.header}>
      <button style={styles.iconButton}>
      <Menu size={24} />
        </button>
        <h1 style={styles.title}>PyGuide.ai</h1>
        <div style={{ position: "relative" }}>
        <button style={styles.iconButton} onClick={() => {setShowPopup(true)}}>
        <User size={24} />
        </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.popupTitle}>Jeremy: Lvl 10000</h2>
            <ul style={styles.popupList}>
              <li style={styles.listItem}>
              <Star size={16} color="#FFD700" style={{ marginRight: "8px" }} />Yoda Best Achievement: Complete Tutorial <SquareArrowUp size={16} color="#4CAF50" style={{ marginLeft: "auto" }} /> 10</li>
              <li style={styles.listItem}>
              <Star size={16} color="#FFD700" style={{ marginRight: "8px" }} />Defeat Mr. Goose: Solve Mr. Goose's Question <SquareArrowUp size={16} color="#4CAF50" style={{ marginLeft: "auto" }} /> 20</li>
              <li style={styles.listItem}>
              <Star size={16} color="#FFD700" style={{ marginRight: "8px" }} />Never Gonna Give Up: Complete a Task Without Hints <SquareArrowUp size={16} color="#4CAF50" style={{ marginLeft: "auto" }} /> 30</li>
            </ul>
            <div style={styles.loaderContainer}>
              <LoaderCircle size={130} color="#4CAF50" />
              <span style={styles.levelText}>Level 10</span> {/* Add the level text here */}
              </div>
            </div>
            <button style={styles.closeButton} onClick={() => {setShowPopup(false); setShowSecondPopup(true)}}>
              Close
            </button>
          </div>
      )}

       {/* Level-Up Popup */}
       {levelUp && (
          <div style={styles.levelUpPopup}>
            <div style={styles.levelUpContent}>
              <h2 style={styles.levelUpText}>
                <span style={styles.starLeft}>★</span>Level Up!<span style={styles.starRight}>★</span>
              </h2>
              <div style={styles.circleContainer}>
              <Circle
                size={250} // Set the size of the circle
                color="#4CAF50" // Choose the color of the circle
                style={styles.levelUpCircleIcon} // Apply styling for the circle icon
              />
            <span style={styles.levelText2}>Level 5</span> {/* Add text inside the circle */}
          </div>
        </div>
          <CircleArrowRight
            size={40} // Set the size of the icon
            color="#4CAF50" // Choose the color of the icon
            style={styles.levelUpCloseIcon} // Apply styling for the icon
            onClick={() => setLevelUp(false)} // Close popup on click
          />
        </div>
      )}

      {/* IDE section taking up 2/3 of the screen */}
      <div style={styles.ideContainer}>
        <Editor
          height="100%" // Ensure the editor takes up full height of the container
          defaultLanguage="python"
          value={code}
          onChange={(value) =>  {
            setCode(value);
            onCodeContent(value)
          }}
          options={{
            minimap: {
              enabled: false, // Disable the minimap
            },
          }}
        />

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
    </div>
  );
};

const styles = {
  page: {
    display: 'flex', // Use flexbox for layout
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    flexDirection: 'row', // Set the flex direction to row for left-right layout
    width: '100%', // Ensure full width
  },
  header: {
    position: "fixed",
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c8f9c3", // Light purple background
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
    zIndex: 1000,
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  ideContainer: {
    flex: 1, // This ensures the IDE takes up 2/3 of the space
    height: '50vh', // Ensure the editor takes up the full height of the screen
    flexDirection: 'column',
  },
  inputOutputContainer: {
    flex: 1, // This ensures the input/output section takes up 1/3 of the space
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
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
  },
  popupOverlay: {
    position: "fixed",
    marginTop: "50px",
    marginRight: "0px",
    marginLeft: "0px",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    //display: "flex",
    //alignItems: "flex-start",
    //justifyContent: "flex-end",
    zIndex: 2000,
  },
  popup: {
    popsition: "absolute",
    marginTop: "0px",
    marginRight: "0px",
    marginLeft: "1195px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "300px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  /*
  popupTitle: {
    margin: "0 0 10px 0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  */
  popupList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },

  closeButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    alignSelf: "flex-start",
    position: "absolute",
    right: "270px",
    top: "390px",
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    textAlign: "left",
  },

  loaderContainer:{
    display: "flex",
    justifyContent: "center",
    algorithms: "center",
    margin: "20px 0",
    position: "relative",
    /*width: "130px",
    height: "130px",*/
  },

  levelText: {
    position: "absolute",  // Position the text in the center of the loader circle
    fontSize: "18px",  // Set text size
    color: "black",  // White text color for visibility
    fontWeight: "bold",  // Make text bold
    zIndex: 1,  // Ensure text appears above the gradient
    textAlign: "center",
    lineHeight: "130px",
    width: "100%",
  },

  levelUpPopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1500,
    width: "600px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",  // Make sure to stack items vertically
    alignItems: "center",
    textAlign: "center",
  },

  levelUpText: {
    fontSize: "60px",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },

  levelUpCircleIcon: {
    marginBottom: "20px", // Add some space between the circle icon and the close button
  },

  levelUpCloseIcon: {
    marginTop: "425px", // Add some space above the icon
    alignSelf: "flex-start",
    position: "absolute",
    right: "50px",
    cursor: "pointer", // Make it clickable
  },

  levelUpContent: {
    display: "flex",
    flexDirection: "column",  // Stack text and circle vertically
    justifyContent: "center",
    alignItems: "center",  // Center everything inside this container
    marginBottom: "20px",  // Space between text/circle and close button
  },

  circleContainer: {
    position: "relative",  // To position the text inside the circle
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  levelText2: {
    position: "absolute",  // Position the text in the center of the loader circle
    fontSize: "40px",  // Set text size
    color: "black",  // White text color for visibility
    fontWeight: "bold",  // Make text bold
    zIndex: 1,  // Ensure text appears above the gradient
    textAlign: "center",
    lineHeight: "130px",
    width: "100%",
  },

  // Left star
  starLeft: {
    fontSize: "50px", // Adjust size of the star
    marginRight: "10px", // Space between the star and text
    color: "transparent",
    background: "linear-gradient(45deg, #ffe666, #ff5500)",  // Yellow gradient effect
    WebkitBackgroundClip: "text",  // Clip the background to the text
  },

  // Right star
  starRight: {
    fontSize: "50px", // Adjust size of the star
    marginLeft: "10px", // Space between the star and text
    color: "transparent",
    background: "linear-gradient(45deg, #ffe666, #ff5500)",  // Yellow gradient effect
    WebkitBackgroundClip: "text",  // Clip the background to the text
  },


};

export default IDE;