import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function Home({ navigation }: { navigation: any }) {
  const IMAGE_SIZE = 180; 

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/piano1.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mi Piano</Text>
      </View>
      <View style={styles.pianosContainer}>
        <View style={styles.pianoSection}>
          <Image
            source={require('../assets/piano2.png')} 
            style={[styles.pianoImage, { width: 200, height: 225 }]}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Piano1')} 
          >
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pianoSection}>
          <Image
            source={require('../assets/piano3.png')} 
            style={[styles.pianoImage, { width: 200, height: 225 }]}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Piano2')} 
          >
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pianoSection}>
          <Image
            source={require('../assets/piano4.png')} 
            style={[styles.pianoImage, { width: 200, height: 225 }]}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Piano3')} 
          >
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  titleContainer: {
    backgroundColor: '#808080', 
    paddingVertical: 5, 
    paddingHorizontal: 250, 
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  pianosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20, 
  },
  pianoSection: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pianoImage: {
    resizeMode: 'contain', 
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#808080', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
    textDecorationColor: '#800080', 
  },
});
