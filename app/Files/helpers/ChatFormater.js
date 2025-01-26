import React from 'react';
import { Text } from 'react-native';

const formatText = (inputText) => {
  // Split the input text by bold markers (**) and code markers (''')
  const parts = [];
  let lastIndex = 0;

  // Regular expressions for detecting bold and code markers
  const boldRegex = /\*\*(.*?)\*\*/g;
  const codeRegex = /```(.*?)```/gs;

  // Process bold and code separately
  const processText = (str, regex, style) => {
    let result = [];
    let lastPos = 0;

    let match;
    while ((match = regex.exec(str)) !== null) {
      const before = str.slice(lastPos, match.index); // Text before the match
      if (before) result.push({ text: before });

      // Add styled part
      result.push({ text: match[1], style });

      lastPos = regex.lastIndex;
    }

    // Add remaining text after the last match
    const remainingText = str.slice(lastPos);
    if (remainingText) result.push({ text: remainingText });

    return result;
  };

  // First, process code blocks
  let formattedParts = processText(inputText, codeRegex, { fontFamily: 'monospace' });

  // Then, process bold text within the code blocks or outside
  const finalParts = [];
  formattedParts.forEach((part) => {
    if (part.style) {
      finalParts.push({ text: part.text, style: part.style });
    } else {
      finalParts.push(...processText(part.text, boldRegex, { fontWeight: 'bold' }));
    }
  });

  return finalParts;
};

const TextWithFormatting = ({ text }) => {
  const formattedText = formatText(text);

  // Render the formatted text with proper styles
  return (
    <Text>
      {formattedText.map((part, index) => (
        <Text key={index} style={part.style}>
          {part.text}
        </Text>
      ))}
    </Text>
  );
};

export default TextWithFormatting;