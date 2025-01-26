import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IDE from "@/components/IDE";
import Question from "@/components/Question";
import OpenAIApp from "@/components/OpenAIService";
import ChatComponent from "@/components/OpenAIService";
import FakeChatComponent from "@/components/FakeChatComponent";
import { ScrollView } from 'react-native';

const SelectQuestion = ({ onSelect, maxQuestions = 15 }) => {
  const questions = generateQuestions(maxQuestions);

  return (
    <View style={styles.selectContainer}>
      <Text style={styles.selectTitle}>Start Your Python Journey...</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.buttonContainer}
      >
        {questions.map((question) => (
          <TouchableOpacity
            key={question.id}
            style={styles.button}
            onPress={() => onSelect(question.id)}
          >
            <Text style={styles.buttonText}>{question.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// SelectQuestion component for selecting a question
const generateQuestions = (maxQuestions) => {
  return Array.from({ length: maxQuestions }, (_, index) => ({
    id: `question${index + 1}`,
    title: `Question ${index + 1}`,
  }));
};

// Main component for the game
const HomePage = () => {
  const [question, setQuestion] = useState("question2");  // Set the default question ID
  const [isSelecting, setIsSelecting] = useState(true);  // State to handle selection screen

  const handleSelect = (selectedQuestion) => {
    setQuestion(selectedQuestion);
    setIsSelecting(false);  // Once a question is selected, show the main screen
  };

  const handleBack = () => {
    setIsSelecting(true);  // Go back to the question selection screen
  };

  return (
    <View style={styles.container}>
      {isSelecting ? (
        <SelectQuestion onSelect={handleSelect} />
      ) : (
        <View style={styles.programmingContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.leftContainer}>
            {/* Display the Question component */}
            <Question questionId={question} />
            <FakeChatComponent/>
          </View>

          <View style={styles.rightContainer}>
            <IDE />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    flexDirection: "row", // Layout children side by side
    justifyContent: "center",
    alignItems: "flex-start", // Align to the top
  },
  programmingContainer: {
    flex: 1,
    flexDirection: "row", // Layout children side by side
    justifyContent: "center",
    alignItems: "flex-start", // Align to the top
    marginTop: 50
  },
  leftContainer: {
    flex: 1, // 1/3 of the width
    padding: 20,
    justifyContent: "flex-start", // Align the Question component at the top
  },
  rightContainer: {
    flex: 2, // 2/3 of the width
    padding: 20,
  },
});