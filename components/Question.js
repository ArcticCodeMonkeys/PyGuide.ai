import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";

const Question = ({ questionId, onQuestionData}) => {
  const [questionData, setQuestionData] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, definition: "" });
  const [wordDefinitions, setWordDefinitions] = useState({}); // State for definitions

  useEffect(() => {
    let isMounted = true;  // Track if the component is mounted

    const fetchDefinitions = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/ArcticCodeMonkeys/python-app/main/dictionary/dictionary.json'); // Load the JSON file

        // Log the raw response to see if it's valid JSON
        const rawData = await response.text();
        console.log("Raw Data:", rawData);

        // Parse the response as JSON
        const data = JSON.parse(rawData); // Use JSON.parse to catch any issues with the structure
        if (data) {
          // Convert array to a dictionary for quick lookup
          const definitions = data.reduce((acc, curr) => {
            acc[curr.word.toLowerCase()] = curr.definition;
            return acc;
          }, {});
          setWordDefinitions(definitions); // Set definitions in state
          console.log(definitions);
        }
      } catch (error) {
        console.error("Error fetching definitions:", error);
      }
    };

    fetchDefinitions();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);  // Only run once when the component mounts

  useEffect(() => {
    let isMounted = true;  // Track if the component is mounted

    const fetchQuestion = async () => {
      try {
        const url = `https://raw.githubusercontent.com/ArcticCodeMonkeys/python-app/main/questions/${questionId}.json`;
        const response = await fetch(url);
        const data = await response.json();
        if (isMounted) {
          setQuestionData(data); // Only update if the component is still mounted
          onQuestionData(data);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [questionId, onQuestionData]);  // Re-run effect when questionId changes

  // Function to handle word touches
  const handleWordPress = (word) => {
    setTooltip({
      visible: true,
      definition: wordDefinitions[word.toLowerCase()] || "No definition available",
    });
  };

  // Format the description text and replace words with tooltips
  const formatDescription = (description) => {
    if (!description) return null;

    // Split the description into words and check if they need to be styled
    const words = description.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, ""); // Remove punctuation
      const isSpecialWord = wordDefinitions[cleanWord.toLowerCase()];

      return isSpecialWord ? (
        <TouchableOpacity
          key={index}
          onPress={() => handleWordPress(cleanWord)}
        >
          <Text style={styles.specialWord}>{word} </Text>
        </TouchableOpacity>
      ) : (
        <Text key={index}>{word} </Text>
      );
    });
  };

  if (!questionData) {
    return <Text>Loading...</Text>;  // Show loading state while the data is being fetched
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.description}>{formatDescription(questionData.description)}</Text>
      <Text style={styles.description}>{formatDescription(questionData.examples)}</Text>
      <Text style={styles.description}>{formatDescription(questionData.constraints)}</Text>
      {/* Tooltip Modal */}
      <Modal
        visible={tooltip.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setTooltip({ visible: false })}
      >
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{tooltip.definition}</Text>
            <TouchableOpacity onPress={() => setTooltip({ visible: false })}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    width: "100%", // Take up full width of its container
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  specialWord: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#007BFF",
  },
  tooltipContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  tooltip: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  tooltipText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default Question;