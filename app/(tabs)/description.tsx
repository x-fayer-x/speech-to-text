import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import useThemeColor from "../hooks/useThemeColor";
import Resume from "../components/description/resume";
import usePlayer from '../contexts/playerContext';
import loadRecordings from '../contexts/playerContext';


export default function Description() {
  // const [record, setRecordings] = useState<string[]>([]);
  const { recordings, loadRecordings } = usePlayer();
  const [jsonContents, setJsonContents] = useState<any[]>([]);
  const scrollRef = useRef<FlatList>(null);

  // useEffect(() => {
  //   (async () => {
  //     const files = await FileSystem.readDirectoryAsync('file:///data/user/0/com.fayer.speech_to_text/files/recordings/');
  //     setRecordings(files);
  //   })();
  // }, []);

  useEffect(() => {
    const readJsonFiles = async () => {
      try {
        if (!FileSystem.documentDirectory) {
          console.error("FileSystem.documentDirectory is null");
          return;
        }
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        console.log('description.tsx l32 Files in directory:', files);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        console.log('description.tsx JSON files:', jsonFiles);
        const jsonContents = await Promise.all(jsonFiles.map(async (file) => {
          const fileUri = `${FileSystem.documentDirectory}${file}`;
          const json = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          console.log('description.tsx Read JSON file:', file, json);
          return JSON.parse(json);
        }));
        setJsonContents(jsonContents);
        console.log('description.tsx JSON contents:', jsonContents);
      } catch (error) {
        console.error('Error reading JSON files:', error);
      }
    };

    readJsonFiles();
  }, [recordings]);

  useEffect(() => {
    loadRecordings();
  }, []);

  const deleteAllFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`);
      await Promise.all(files.map(async (file) => {
        const fileUri = `${FileSystem.documentDirectory}${file}`;
        await FileSystem.deleteAsync(fileUri);
        console.log('Deleted file:', fileUri);
      }));
      setJsonContents([]);
      loadRecordings();
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  };
  //   useEffect(() => {
  //     (async () => {
  //         loadRecordings();
  //     })();
  // }, []);

  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: useThemeColor({}, "background"), flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center", // Centrer horizontalement
            paddingVertical: 30, // Ajouter de l'espace en haut et en bas
          }}
        >
          <Button title="Delete All Files" onPress={deleteAllFiles} />
          <FlatList
            ref={scrollRef}
            data={recordings}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <Resume item={item} index={index} scrollRef={scrollRef} jsonContent={jsonContents[index]} /> // Utilisez le composant Resume
            )}
          />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});