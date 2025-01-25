import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Question = ({ question }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`https://your-api-url.com/questions/${question}.json`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching question data.');
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [question]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>

      {/* Optional: Display other parameters like constraints, examples, etc */}
      {data.constraints && (
        <>
          <Text style={styles.subtitle}>Constraints:</Text>
          <Text style={styles.text}>{data.constraints}</Text>
        </>
      )}

      {data.examples && (
        <>
          <Text style={styles.subtitle}>Examples:</Text>
          <Text style={styles.text}>{data.examples}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default Question;