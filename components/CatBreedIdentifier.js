import React, { useState } from 'react';
import { Button, Image, View, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CatBreedIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [breed, setBreed] = useState('Unknown Breed');
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setResult(null);
    }
  };



const classifyImage = async () => {
  if (image) {
    try {
      setIsLoading(true);

      const form = new FormData();
      const blob = await (await fetch(image)).blob();
      form.append('file', new File([blob], 'image.jpg', { type: 'image/jpeg' }));

      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const result = await response.json();
        // console.log('Full Response:', result);

        setResult(result.result || 'Failed to get the result. Unexpected response format.');
        setBreed(result.class || 'Unknown Breed'); 
        setConfidence(parseFloat(result.confidence || 0)); 
      } else {
        console.error('Error during classification:', response.status, response.statusText);
        setResult('Failed to classify the image. Unexpected response.');
      }
    } catch (error) {
      console.error('Error during classification:', error);
      setResult('Failed to classify the image.');
    } finally {
      setIsLoading(false);
    }
  } else {
    setResult('No image selected for classification.');
  }
};

const formattedConfidence = (parseFloat(confidence) * 100).toFixed(2);

return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Pick an image from camera roll" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    {image && <Button title="Classify Image" onPress={classifyImage} />}
    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    {result && (
      <Text style={{ marginTop: 10 }}>
        The detected breed is {breed} with {formattedConfidence}% accuracy
      </Text>
    )}
  </View>
);
    }
