import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import newLogin from "../assets/new_login.png";

function PetIdentification({ onCatModel, onDogModel }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={newLogin} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
      <Text style={styles.title}>Identify Your Pet</Text>

        <Text style={styles.contentText}>
          Welcome to the Pet Identification tool. Follow these steps to identify your pet:
        </Text>
        <Text style={styles.contentText}>
          1. Select the model (Cat or Dog) you want to use.
        </Text>
        <Text style={styles.contentText}>
          2. Choose to upload an image or capture a photo of your pet.
        </Text>
        <Text style={styles.contentText}>
          3. Get results, breed Identification and more pet recomendations.
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        <Pressable style={styles.optionButton} onPress={onCatModel}>
          <Text style={styles.buttonText}>Cat Model</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={onDogModel}>
          <Text style={styles.buttonText}>Dog Model</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: Dimensions.get("window").width > 360 ? 24 : 20,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: Dimensions.get("window").width > 360 ? 100 : 80,
    height: Dimensions.get("window").width > 360 ? 100 : 80,
    borderRadius: 50,
  },
  contentContainer: {
    width: "80%",
    marginBottom: 20,
  },
  contentText: {
    color: "#fff",
    fontSize: Dimensions.get("window").width > 360 ? 16 : 14,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#69A5E0",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PetIdentification;
