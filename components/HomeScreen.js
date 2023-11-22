// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { auth } from "./firebaseConfig";
import PetIdentification from "./PetIdentification";
import newLogin from "../assets/new_login.png";

function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const MovetoImagepicker = ()=>{
    navigation.navigate('ImagePicker')
  }
  return (
    <View style={styles.container}>
      <Image source={newLogin} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Pet Tech</Text>
        <Text style={styles.subtitle}>
          Explore our models to identify your pet.
        </Text>

        {user ? null : (
          <Text style={styles.subtitle}>
            Please log in to access the app
          </Text>
        )}

        <PetIdentification />

        {user && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        )}
        <Pressable style={styles.logoutButton} onPress={MovetoImagepicker}>
            <Text style={styles.buttonText}>ImagePicker</Text>
          </Pressable>
      </View>
    </View>
  );
}
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    width: width > 600 ? "60%" : "80%", // Adjusted width for larger screens
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: width > 600 ? 48 : 32, // Adjusted font size for larger screens
    fontWeight: "bold",
    color: "#fff",
    marginBottom: height > 600 ? 20 : 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#FF8C80",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
