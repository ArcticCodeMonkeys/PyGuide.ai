import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const Question = ({ questionId }) => {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    let isMounted = true;  // Track if the component is mounted

    const fetchQuestion = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/ArcticCodeMonkeys/python-app/main/questions/${questionId}.json`);
        const data = await response.json();
        if (isMounted) {
          setQuestionData(data); // Only update if the component is still mounted
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
  }, [questionId]);  // Re-run effect when questionId changes

  if (!questionData) {
    return <Text>Loading...</Text>;  // Show loading state while the data is being fetched
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.description}>{questionData.description}</Text>
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
});

export default Question;