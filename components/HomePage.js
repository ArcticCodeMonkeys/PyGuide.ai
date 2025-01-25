import { useState } from "react";
import { StyleSheet, View } from "react-native";
import IDE from "@/components/IDE";
import Question from "@/components/Question";

// Main component for the game
const HomePage = () => {
  const [question, setQuestion] = useState("question2");  // Set the default question ID

  return (
    <View style={styles.container}>
      <View style={styles.programmingContainer}>
      <View style={styles.leftContainer}>
        {/* Display the Question component */}
        <Question questionId={question} />
      </View>

      <View style={styles.rightContainer}>
        <IDE />
      </View>
      </View>
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