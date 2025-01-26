import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import IDE from "@/components/IDE";
import QuestionSelect from "@/components/QuestionSelect";
import HomePage from "@/components/HomePage";

const questionSelectScreen = 'questionSelectScreen';
const codePage = 'codePage';

// Main component
const AllPages = () => {
  const [currentPage, setCurrentPage] = useState(questionSelectScreen);
  const [question, setQuestion] = useState("question2"); // Manage the 'question' state here

  const handleSelectQuestion = (selectedQuestion) => {
    setQuestion(selectedQuestion); // Update 'question' when a new question is selected
    setCurrentPage(codePage); // Navigate to the IDE screen after a selection
  };

  const handleBackToSelect = () => {
    setCurrentPage(questionSelectScreen); // Go back to the question select screen
  };

  const renderPage = () => {
    switch (currentPage) {
      case questionSelectScreen:
        return <QuestionSelect onSelect={handleSelectQuestion} question={question} />;
      case codePage:
        return <HomePage question={question} onBack={handleBackToSelect}/>
      default:
        return <Text>No page found</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
    </View>
  );
};

export default AllPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Light background color
  },
});