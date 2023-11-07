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

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Pet Tech</Text>
        <Text style={styles.subtitle}>
          Explore our models to identify your pet.
        </Text>

        {user ? (
          null
        ) : (
          <Text style={styles.subtitle}>Please log in to access the app</Text>
        )}

        <PetIdentification />

        {/* <Pressable
          style={styles.exploreButton}
          onPress={() => navigation.navigate("Explore")}
        >
          <Text style={styles.buttonText}>Explore More</Text>
        </Pressable> */}

        {user && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: Dimensions.get("window").width > 360 ? 32 : 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: Dimensions.get("window").width > 360 ? 18 : 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#FF8C80",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "20",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  exploreButton: {
    backgroundColor: "#69A5E0",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
