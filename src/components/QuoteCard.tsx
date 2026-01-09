import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Quote } from "../types/Quote";
import { colors } from "../theme/colors";

interface Props {
  quote: Quote;
}

const QuoteCard: React.FC<Props> = ({ quote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>"{quote.text}"</Text>
      <Text style={styles.author}>— {quote.author}</Text>
    </View>
  );
};

export default QuoteCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 16,
  },
  text: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  author: {
    color: colors.author,
    marginTop: 16,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Poppins-Medium",
  },
});
