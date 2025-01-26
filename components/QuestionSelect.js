import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SelectQuestion = ({ onSelect, question, maxQuestions = 15 }) => {
  const questions = generateQuestions(maxQuestions);
  const difficulty = (title) => {
    const num = (parseInt(title.split(" ")[1], 10));
    return (
      num >= 1 && num <= 5 ? 'Easy' : 
      num >= 6 && num <= 10 ? 'Medium' : 
      num >= 11 && num <= 15 ? 'Hard' : 'Invalid'
    )
  }
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.selectTitle}>Start Your Python Journey...</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.buttonContainer}
      >
        {questions.map((questionItem) => (
          <TouchableOpacity
            key={questionItem.id}
            style={styles.button}
            onPress={() => onSelect(questionItem.id)} // Call onSelect to update 'question'
          >
            <Text style={styles.buttonText}>
              {questionItem.title}
            </Text>
            <Text
      style={[
        styles.buttonText,
        difficulty(questionItem.title) === "Easy"
          ? styles.easyGreen
          : difficulty(questionItem.title) === "Medium"
          ? styles.mediumYellow
          : styles.hardRed,
      ]}
    >
      {difficulty(questionItem.title)}
    </Text>
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

export default SelectQuestion;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Light background color
  },
  easyGreen: {
    color: "green",
  },
  mediumYellow: {
    color: "orange",
  },
  hardRed: {
    color: "red",
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
  scrollContainer: {
    maxHeight: 400, // Adjust as needed
    width: '100%',
  }
});