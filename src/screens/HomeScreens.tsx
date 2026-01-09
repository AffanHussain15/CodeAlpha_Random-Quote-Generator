import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import QuoteCard from "../components/QuoteCard";
import { colors } from "../theme/colors";
import { Quote } from "../types/Quote";
import {  quotes } from "../data/quotes";

const HomeScreen = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocalQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const fetchQuote = async () => {
    try {
      setLoading(true);

      // const response = await fetch("https://api.quotable.io/random");
      const response = await fetch("https://api.quotable.io/quotes/random");
      console.log('response', response)

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();
      console.log('data', data)

      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      setQuote(getLocalQuote());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); 
  }, []);

  return (
    <View style={styles.container}>
      {loading && !quote ? (
        <ActivityIndicator size="large" color={colors.button} />
      ) : (
        quote && <QuoteCard quote={quote} />
      )}

      <TouchableOpacity style={styles.button} onPress={fetchQuote}>
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: colors.button,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
});


