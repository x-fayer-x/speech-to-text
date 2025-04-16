import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

// Contexte pour gérer les enregistrements audio.
// Permet de charger, envoyer et supprimer des enregistrements audio.
// Utilisé dans les composants Recorder, Description et Player.

// Propriétés du contexte :
// recordings : Liste des enregistrements audio.
// sendRecording : Fonction pour envoyer un enregistrement audio en base 64.
// deleteRecording : Fonction pour supprimer un enregistrement audio.
// loadRecordings : Fonction pour charger les enregistrements audio.

interface RecordingData {
  audioUri: string; // URI de l'audio
  transcription: string; // Transcription de l'audio
  summary: string; // Résumé de l'audio
}
interface PlayerContextProps {
    recordings: string[];
    sendRecording?: (uri: string) => void;
    deleteRecording?: (uri: string) => void;
    loadRecordings: () => void;
    jsonContent: any[];
    isLoadingJson: boolean;
}

const PlayerContext = createContext<PlayerContextProps>({
    recordings: [],
    loadRecordings: () => { },
    deleteRecording: () => { },
    sendRecording: () => { },
    jsonContent: [],
    isLoadingJson: false,
});

export default function usePlayer() {
    return useContext(PlayerContext);
}

export function PlayerProvider({ children }: any) {
    const [recordings, setRecordings] = useState<string[]>([]);
    const [jsonContent, setJsonContent] = useState<RecordingData[]>([]);
    const [isLoadingJson, setIsLoadingJson] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         loadRecordings();
    //     })();
    // }, []);

    useEffect(() => {
        loadRecordings();
    }, []);


    const loadRecordings = async () => {
        try {
            console.log('dans playerCOntext loeadrecordings Fetching recordings from backend...');
          // Charger les fichiers audio locaux
        //   const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}recordings/`);
        //   const localRecordings = files.filter(file => file.endsWith('.m4a'));
        //   setRecordings(localRecordings);
      
          // Récupérer les données depuis le backend
          const response = await fetch('http://vps-692a3a83.vps.ovh.net:5049/api/recordings', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch recordings from server');
          }

          const serverData: RecordingData[] = await response.json();
          console.log('Recordings fetched from server:', serverData);
      
          // Mettre à jour l'état avec les données du backend
          setJsonContent(serverData);
        } catch (error) {
          console.error('Error loading recordings:', error);
        }
      };

    const saveJsonToFile = async (json: any) => {
        const fileUri = `${FileSystem.documentDirectory}response.json-${Date.now()}.json`;
        console.log("playerContext l46 JSON saved to", fileUri);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(json), {
            encoding: FileSystem.EncodingType.UTF8,
        });
        console.log("playerContext l50 JSON saved to", fileUri);
        return fileUri;
    };

    const sendRecording = async (uri: string) => {
        setIsLoadingJson(true);
        const data = await convertRecordingToBase64(uri);
        try {
            // console.log("PlayerContext Sending recording to API", data);
            const response = await fetch("http://vps-692a3a83.vps.ovh.net:5050/api/audio", {
                mode: "no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log("playerContext mon json :", json);

            const jsonFileUri = await saveJsonToFile(json);
            // met a jour jsonContent pour relancer le rendu
            setJsonContent(prevJsonContents => [...prevJsonContents, json]);
            setIsLoadingJson(false);
        } catch (err) {
            console.error("Failed to send recording", err);
        }
    };

    const convertRecordingToBase64 = async (uri: string) => {
        const fileInfo = await FileSystem.getInfoAsync(uri, { md5: true });
        const mimeType = fileInfo.uri.split('.').pop() === 'm4a' ? 'audio/mp4' : 'audio/mpeg';
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const base64WithMime = `data:${mimeType};base64,${base64}`;
        // console.log("Recording converted to base64", base64WithMime);

        // Send the recording to the API
        const recordingData = {
            Name: `recording-${Date.now()}.m4a`,
            Data: base64WithMime,
            // token: a ajouter plus tard
        };
        return recordingData;
    }

    const deleteRecording = async (uri: string) => {
        try {
            await FileSystem.deleteAsync(uri);
            loadRecordings(); // Reload recordings after deletion
        } catch (error) {
            console.error("Failed to delete recording", error);
        }
    };

    return (
        <PlayerContext.Provider value={{ recordings, loadRecordings, sendRecording, jsonContent ,isLoadingJson/*deleteRecording,*/ }}>
            {children}
        </PlayerContext.Provider>
    );
}




// ANCIENNE VERSION EN LOCAL POUR MES AUDIO
// export function PlayerProvider({ children }: any) {
//     const [recordings, setRecordings] = useState<string[]>([]);
//     const [jsonContent, setJsonContent] = useState<any[]>([]);
//     const [isLoadingJson, setIsLoadingJson] = useState(false);

//     // useEffect(() => {
//     //     (async () => {
//     //         loadRecordings();
//     //     })();
//     // }, []);

//     useEffect(() => {
//         loadRecordings();
//     }, []);


//     const loadRecordings = async () => {
//         try {
//             const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}recordings/`);
//             console.log("playercontext l55 tout mes record ", FileSystem.documentDirectory)
//             setRecordings(files.filter(file => file.endsWith('.m4a')));
//             console.log("playercontext l57 tout mes record ", recordings);
//         } catch (error) {
//             console.log("playerContext l45 Error reading directory:", error);
//         }
//     };

//     const saveJsonToFile = async (json: any) => {
//         const fileUri = `${FileSystem.documentDirectory}response.json-${Date.now()}.json`;
//         console.log("playerContext l46 JSON saved to", fileUri);
//         await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(json), {
//             encoding: FileSystem.EncodingType.UTF8,
//         });
//         console.log("playerContext l50 JSON saved to", fileUri);
//         return fileUri;
//     };

//     const sendRecording = async (uri: string) => {
//         setIsLoadingJson(true);
//         const data = await convertRecordingToBase64(uri);
//         try {
//             // console.log("PlayerContext Sending recording to API", data);
//             const response = await fetch("http://vps-692a3a83.vps.ovh.net:5050/api/audio", {
//                 mode: "no-cors",
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });
//             const json = await response.json();
//             console.log("playerContext mon json :", json);

//             const jsonFileUri = await saveJsonToFile(json);
//             // met a jour jsonContent pour relancer le rendu
//             setJsonContent(prevJsonContents => [...prevJsonContents, json]);
//             setIsLoadingJson(false);
//         } catch (err) {
//             console.error("Failed to send recording", err);
//         }
//     };

//     const convertRecordingToBase64 = async (uri: string) => {
//         const fileInfo = await FileSystem.getInfoAsync(uri, { md5: true });
//         const mimeType = fileInfo.uri.split('.').pop() === 'm4a' ? 'audio/mp4' : 'audio/mpeg';
//         const base64 = await FileSystem.readAsStringAsync(uri, {
//             encoding: FileSystem.EncodingType.Base64,
//         });
//         const base64WithMime = `data:${mimeType};base64,${base64}`;
//         // console.log("Recording converted to base64", base64WithMime);

//         // Send the recording to the API
//         const recordingData = {
//             Name: `recording-${Date.now()}.m4a`,
//             Data: base64WithMime,
//             // token: a ajouter plus tard
//         };
//         return recordingData;
//     }

//     const deleteRecording = async (uri: string) => {
//         try {
//             await FileSystem.deleteAsync(uri);
//             loadRecordings(); // Reload recordings after deletion
//         } catch (error) {
//             console.error("Failed to delete recording", error);
//         }
//     };

//     return (
//         <PlayerContext.Provider value={{ recordings, loadRecordings, sendRecording, jsonContent ,isLoadingJson/*deleteRecording,*/ }}>
//             {children}
//         </PlayerContext.Provider>
//     );
// }
