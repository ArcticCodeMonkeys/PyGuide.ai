import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IDE from "@/components/IDE";
import Question from "@/components/Question";
import ChatComponent from "@/components/OpenAIService";

// Main component for the game
const HomePage = ({question, onBack}) => {
  const [questionData, setQuestionData] = useState(null);
  const [codeContent, setCodeContent] = useState("# Write your Python code here");
  const handleQuestionData = (data) => {
    setQuestionData(data);  // Update state with the question data
  }
  const handleCodeContent = (code) => {
    setCodeContent(code);  // Update state with the question data
  };

  return (
        <View style={styles.programmingContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.leftContainer}>
            {/* Display the Question component */}
            <Question questionId={question} onQuestionData={handleQuestionData}/>
            <ChatComponent question={questionData} code={codeContent}/>
          </View>
          <View style={styles.rightContainer}>
            <IDE onCodeContent={handleCodeContent}/>
          </View>
        </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Light background color
  },
  programmingContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    marginTop: 30,
    position: "relative", // Ensure the back button is positioned relative to this container
  },
  leftContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Light border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 20,
  },
  rightContainer: {
    flex: 2,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  backButton: {
    position: 'absolute',
    top: -20, // Move it above the container
    right: 10, // Align to the right side
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#6c757d',
    borderRadius: 50,
    zIndex: 10, // Ensure it's above other elements
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14, // Smaller text
  },
});