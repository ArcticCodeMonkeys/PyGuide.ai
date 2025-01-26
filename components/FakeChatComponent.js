import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import TextWithFormatting from "@/app/Files/helpers/ChatFormater";

const FakeChatComponent = ({questionData, codeContent}) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = () => {
    // Fake response instead of API call
    const fakeResponse = `
To create a for loop in most programming languages, you typically follow this general syntax:

\`\`\`
for (initialization; condition; increment/decrement) {
    // code block to be executed
}
\`\`\`

Here's a breakdown of each part:
- **Initialization:** This is where you initialize a variable that will be used as a counter in the loop.
- **Condition:** This is the condition that is evaluated before each iteration of the loop. If the condition is true, the code block inside the loop will be executed; otherwise, the loop will exit.
- **Increment/Decrement:** You can specify how the counter variable is updated for each iteration of the loop.

Here's a simple example of a for loop in Python that prints the numbers 0 to 4:

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

In this example:
- \`i\` is the counter variable that starts from 0.
- \`range(5)\` specifies that the loop will run 5 times, printing the numbers 0 through 4.
        `;
    setResponse(fakeResponse);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Send" onPress={handleSend} />
      <ScrollView style={styles.responseContainer}>
        <TextWithFormatting text={codeContent || ''} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  responseContainer: {
    marginTop: 20,
    flex: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    maxHeight: 300,  // Limit the height of the scrollable area
  },
  responseText: {
    fontSize: 16,
    color: 'black',
    whiteSpace: 'pre-wrap', // Ensure the formatted text is displayed properly
  },
});

export default FakeChatComponent;