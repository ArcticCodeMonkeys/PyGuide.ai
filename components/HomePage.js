import { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import IDE from "@/components/IDE";


// Main component for the game
const HomePage = () => {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <IDE/>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Container for the PLayer's Hand
  playerHandContainer: {
    position: 'absolute',
    bottom: 225,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // Container for the Dealer's Hand
  dealerHandContainer: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // Hit Button
  hitButton: {
    position: 'absolute',
    bottom: 75,
    left: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  // Stand Button
  standButton: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  // Disabled Button
  disabledButton: {
    backgroundColor: 'gray',
  },
  // Button Text
  buttonText: {
    color: 'black',
    fontSize: 22,
  },
  // Player's Score
  playerScore: {
    position: 'absolute',
    top: 30,
    left: 20,
    color: 'black',
    fontSize: 32,
  },
  // Dealer's Score
  dealerScore: {
    position: 'absolute',
    top: 30,
    right: 20,
    color: 'black',
    fontSize: 32,
  },
  // Display Message
  message: {
    position: 'absolute',
    top: 200,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
  },
  // Betting Input Container
  betContainer: {
    position: 'absolute',
    bottom: 65,
    alignItems: 'center',
  },
  // Balance Text
  moneyText: {
    fontSize: 24,
    marginBottom: 10,
  },
  // Bet Text Field
  betInput: {
    width: 250,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  // Bet Button
  betButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  // Disabled Bet Button
  disabledBet: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 8,
  },
  splitConfirm: {
    position: 'absolute',
    bottom: 75,
    left: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  splitDeny: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  playAgainButton: {
    position: 'absolute',
    top: 275,
    width: 200,
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});