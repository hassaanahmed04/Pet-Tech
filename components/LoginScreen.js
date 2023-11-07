import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import login from "../assets/login.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Check if email or password fields are empty
    if (email === '') {
      setError('Email field must not be blank.');
    } else if (password === '') {
      setError('Password field must not be blank.');
    } else {
      // Fields are not empty, proceed with login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User logged in:', user);
          navigation.navigate('Home');
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error logging in:', error);
        });
    }
  }
  

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={true}
    >
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={login} style={styles.image} />
        </View>

        <Text style={styles.title}>Welcome back to Pet Tech!</Text>
        <View style={styles.inputContainer}>
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
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              Login
            </Text>
          </Pressable>
          <Pressable style={styles.signupButton} onPress={navigateToSignup}>
            <Text style={styles.buttonText}>
              Don't have an account? Signup
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
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
  },
  loginButton: {
    backgroundColor: '#69A5E0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  signupButton: {
    backgroundColor: '#FF8C80',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
