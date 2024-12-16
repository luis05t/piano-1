import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

interface PianoKeyProps {
  note: string;
  color: 'white' | 'black';
  style?: object;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, color, style }) => {
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

  return (
    <TouchableOpacity
      style={[styles.key, color === 'white' ? styles.whiteKey : styles.blackKey, style]}
      onPress={playSound}
    />
  );
};

const Piano2 = ({ navigation }: { navigation: any }) => {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
  const blackKeys = ['C#4', 'D#4', null, 'F#4', 'G#4', 'A#4', null];

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/13/75/8f/13758f4deb4ebc4b3e226426f7951e0d.jpg' }}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} 
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnnfKxYmtp7tGEIYFTc1YnLJEiSOo-M6146Q&s',
          }}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleButton} onPress={() => {}}>
        <Text style={styles.titleButtonText}>Mi Piano 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pianoButton} onPress={() => {}}>
        <View style={styles.pianoContainer}>
          {whiteKeys.map((note, index) => (
            <PianoKey
              key={note}
              note={note}
              color="white"
              style={[styles.whiteKey, { backgroundColor: getWhiteKeyColor(note) }]}
            />
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
      </TouchableOpacity>
    </ImageBackground>
  );
};


const getWhiteKeyColor = (note: string) => {
  const whiteKeyColors: { [key: string]: string } = {
    C4: '#FF6347', 
    D4: '#FFD700', 
    E4: '#98FB98', 
    F4: '#00BFFF', 
    G4: '#FF1493',
    A4: '#32CD32', 
    B4: '#FF4500',
  };

  return whiteKeyColors[note] || '#FFF';
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  whiteKey: {
    width: 60,
    height: 200,
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

export default Piano2;
