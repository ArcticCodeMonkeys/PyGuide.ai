import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IDE from "@/components/IDE";
import Question from "@/components/Question";
import OpenAIApp from "@/components/OpenAIService";
import ChatComponent from "@/components/OpenAIService";
import FakeChatComponent from "@/components/FakeChatComponent";
import { ScrollView } from 'react-native';


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
  selectContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff", // White background for selection
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Soft shadow
    justifyContent: "center",
    alignItems: "center",
  },
  selectTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40", // Dark text color
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column  ",
    flexWrap: "wrap", // Allows buttons to wrap based on screen size
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#1a73e8",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0", // Default status
  },
  buttonStatusSolved: {
    backgroundColor: "#22863a", // Green for solved
  },
  buttonStatusAttempted: {
    backgroundColor: "#ffd33d", // Yellow for attempted
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
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a73e8",
  },
  questionDifficulty: {
    fontSize: 14,
    fontWeight: "500",
    color: "green"
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
  scrollContainer: {
    maxHeight: 400, // Adjust as needed
    width: '100%',
  }
});