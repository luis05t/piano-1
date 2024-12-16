import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image, ImageBackground } from 'react-native';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

interface PianoKeyProps {
  note: string;
  color: 'white' | 'black';
  style?: object;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, color, style }) => {
  const [isPressed, setIsPressed] = useState(false);

 
  const noteColors: { [key: string]: string } = {
    C4: '#FF0000', 
    D4: '#00FF00', 
    E4: '#0000FF',
    F4: '#FFFF00', 
    G4: '#FF00FF', 
    A4: '#00FFFF', 
    B4: '#FF4500', 
    'C#4': '#8A2BE2', 
    'D#4': '#FF1493', 
    'F#4': '#1E90FF', 
    'G#4': '#32CD32', 
    'A#4': '#FFD700', 
  };

  const playSound = async () => {
    try {
      const soundMapping: { [key: string]: any } = {
        C4: require('../assets/sounds/C4.mp3'),
        D4: require('../assets/sounds/D4.mp3'),
        E4: require('../assets/sounds/E4.mp3'),
        F4: require('../assets/sounds/F4.mp3'),
        G4: require('../assets/sounds/G4.mp3'),
        A4: require('../assets/sounds/A4.mp3'),
        B4: require('../assets/sounds/B4.mp3'),
        'C#4': require('../assets/sounds/C4.mp3'),
        'D#4': require('../assets/sounds/D4.mp3'),
        'F#4': require('../assets/sounds/F4.mp3'),
        'G#4': require('../assets/sounds/G4.mp3'),
        'A#4': require('../assets/sounds/A4.mp3'),
      };

      const { sound } = await Audio.Sound.createAsync(soundMapping[note]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status && (status as AVPlaybackStatusSuccess).didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
    playSound();
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.key,
        color === 'white' ? styles.whiteKey : styles.blackKey,
        isPressed && { backgroundColor: noteColors[note] },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{ color: 'transparent' }} 
    />
  );
};

const Piano = ({ navigation }: { navigation: any }) => {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
  const blackKeys = ['C#4', 'D#4', null, 'F#4', 'G#4', 'A#4', null];

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/13/75/8f/13758f4deb4ebc4b3e226426f7951e0d.jpg' }}
      style={styles.container}
    >
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnnfKxYmtp7tGEIYFTc1YnLJEiSOo-M6146Q&s',
          }}
          style={styles.backButtonImage}
        />
      </Pressable>

      <Pressable style={styles.titleButton} onPress={() => {}}>
        <Text style={styles.titleButtonText}>Mi Piano 3</Text>
      </Pressable>

      <View style={styles.pianoButton}>
        <View style={styles.pianoContainer}>
          {whiteKeys.map((note) => (
            <PianoKey key={note} note={note} color="white" />
          ))}
          {blackKeys.map((note, index) =>
            note ? (
              <PianoKey
                key={note}
                note={note}
                color="black"
                style={{ left: 45 + index * 60, position: 'absolute' }}
              />
            ) : null
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  titleButton: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#808080',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  titleButtonText: {
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 250,
  },
  pianoButton: {
    backgroundColor: '#808080',
    padding: 20,
    borderRadius: 10,
    marginTop: 80,
  },
  pianoContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 200,
    width: '90%',
  },
  key: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  whiteKey: {
    width: 60,
    height: 200,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  blackKey: {
    width: 40,
    height: 120,
    backgroundColor: '#000',
    zIndex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default Piano;
