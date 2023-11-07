import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import signup from "../assets/signup.png";
import Icon from 'react-native-vector-icons/FontAwesome';

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = () => {
    // Check if email or password fields are empty
    if (email === '') {
      setError('Email field must not be blank.');
    } else if (password === '') {
      setError('Password field must not be blank.');
    } else {
      // Fields are not empty, proceed with signup
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User signed up:', user);
          navigation.navigate('Login');
        })
        .catch((error) => {
          let errorMessage = "An error occurred. Please try again.";
  
          if (error.code === "auth/invalid-email") {
            errorMessage = "Invalid email address. Please check your email format.";
          } else if (error.code === "auth/weak-password") {
            errorMessage = "Weak password. Password should be at least 6 characters long.";
          } // Add more specific error codes and messages as needed
  
          setError(errorMessage);
          console.error('Error signing up:', error);
        });
    }
  }
  
  

  const navigateToLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
    >
      <View style={styles.innerContainer}>
        <Image source={signup} style={styles.image} />

        <Text style={styles.title}>Sign Up for Pet Tech</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>
              <Icon name="user-plus" size={20} color="#FFF" /> Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center', // Center the content horizontally
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: '#69A5E0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#FF8C80',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignupScreen;
