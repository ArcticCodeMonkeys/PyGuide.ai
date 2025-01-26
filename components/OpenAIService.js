import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const apiKey = process.env.REACT_APP_API_KEY;



const url = 'https://api.openai.com/v1/chat/completions';

const ChatComponent = ({question, code}) => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSendMessage = async () => {
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are an AI teacher for Python coding. Your goal is to guide the user with simple, clear, and concise explanations. Avoid complex jargon and never give the final answer, only provide hints and guidance to help the user solve the problem themselves.' },

        { role: 'user', content: `Here is the question: ${question.description} \n\nHere is my code: ${code} \n\n${userInput}`
        }
            ],
            max_tokens: 500
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };

        try {
            const result = await axios.post(url, data, config);
            const messageContent = result.data.choices[0].message.content;
            setResponse(messageContent);
        } catch (error) {
            console.error('Error making API request:', error);
            setResponse('Error occurred while fetching the response.');
        }
    };

    return (
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={userInput}
            onChangeText={setUserInput}
          />
          <Button title="Send" onPress={handleSendMessage} />
          <ScrollView style={styles.responseContainer}>
              <Text>{response}</Text>
          </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    responseContainer: {
        marginTop: 16,
        width: '100%',
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
    }
});

export default ChatComponent;