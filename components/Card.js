import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';



const Card = ({ suit, rank }) => {
  // Determine the text color based on the suit
  const cardImages = {
    'Clubs_2': require('../assets/images/2_of_clubs.png'),
    'Clubs_3': require('../assets/images/3_of_clubs.png'),
    'Clubs_4': require('../assets/images/4_of_clubs.png'),
    'Clubs_5': require('../assets/images/5_of_clubs.png'),
    'Clubs_6': require('../assets/images/6_of_clubs.png'),
    'Clubs_7': require('../assets/images/7_of_clubs.png'),
    'Clubs_8': require('../assets/images/8_of_clubs.png'),
    'Clubs_9': require('../assets/images/9_of_clubs.png'),
    'Clubs_10': require('../assets/images/10_of_clubs.png'),
    'Clubs_J': require('../assets/images/jack_of_clubs.png'),
    'Clubs_Q': require('../assets/images/queen_of_clubs.png'),
    'Clubs_K': require('../assets/images/king_of_clubs.png'),
    'Clubs_A': require('../assets/images/ace_of_clubs.png'),
    'Diamonds_2': require('../assets/images/2_of_diamonds.png'),
    'Diamonds_3': require('../assets/images/3_of_diamonds.png'),
    'Diamonds_4': require('../assets/images/4_of_diamonds.png'),
    'Diamonds_5': require('../assets/images/5_of_diamonds.png'),
    'Diamonds_6': require('../assets/images/6_of_diamonds.png'),
    'Diamonds_7': require('../assets/images/7_of_diamonds.png'),
    'Diamonds_8': require('../assets/images/8_of_diamonds.png'),
    'Diamonds_9': require('../assets/images/9_of_diamonds.png'),
    'Diamonds_10': require('../assets/images/10_of_diamonds.png'),
    'Diamonds_J': require('../assets/images/jack_of_diamonds.png'),
    'Diamonds_Q': require('../assets/images/queen_of_diamonds.png'),
    'Diamonds_K': require('../assets/images/king_of_diamonds.png'),
    'Diamonds_A': require('../assets/images/ace_of_diamonds.png'),
    'Hearts_2': require('../assets/images/2_of_hearts.png'),
    'Hearts_3': require('../assets/images/3_of_hearts.png'),
    'Hearts_4': require('../assets/images/4_of_hearts.png'),
    'Hearts_5': require('../assets/images/5_of_hearts.png'),
    'Hearts_6': require('../assets/images/6_of_hearts.png'),
    'Hearts_7': require('../assets/images/7_of_hearts.png'),
    'Hearts_8': require('../assets/images/8_of_hearts.png'),
    'Hearts_9': require('../assets/images/9_of_hearts.png'),
    'Hearts_10': require('../assets/images/10_of_hearts.png'),
    'Hearts_J': require('../assets/images/jack_of_hearts.png'),
    'Hearts_Q': require('../assets/images/queen_of_hearts.png'),
    'Hearts_K': require('../assets/images/king_of_hearts.png'),
    'Hearts_A': require('../assets/images/ace_of_hearts.png'),
    'Spades_2': require('../assets/images/2_of_spades.png'),
    'Spades_3': require('../assets/images/3_of_spades.png'),
    'Spades_4': require('../assets/images/4_of_spades.png'),
    'Spades_5': require('../assets/images/5_of_spades.png'),
    'Spades_6': require('../assets/images/6_of_spades.png'),
    'Spades_7': require('../assets/images/7_of_spades.png'),
    'Spades_8': require('../assets/images/8_of_spades.png'),
    'Spades_9': require('../assets/images/9_of_spades.png'),
    'Spades_10': require('../assets/images/10_of_spades.png'),
    'Spades_J': require('../assets/images/jack_of_spades.png'),
    'Spades_Q': require('../assets/images/queen_of_spades.png'),
    'Spades_K': require('../assets/images/king_of_spades.png'),
    'Spades_A': require('../assets/images/ace_of_spades.png'),
  }
  const getImage = (suit, rank) => {
    return cardImages[suit + "_" + rank];
  }
  return (
    <View style={styles.card}>
      <Image
        style={styles.card}
        source={getImage(suit, rank)}></Image>
    </View>
  );
};





const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  suit: {
    width: 40,
    height: 40,
  },

});

export default Card;