import { useState, useEffect, useRef } from "react";
import { Pressable, View, Animated, Easing } from "react-native";
import Svg, { Mask, Rect, Path, G, Defs, Circle, RadialGradient, Stop } from "react-native-svg";
import { Audio } from "expo-av";
import usePlayer from "@/app/contexts/playerContext";
import useThemeColor from "@/app/hooks/useThemeColor";
import * as FileSystem from "expo-file-system";


export default function Recorder() {

    //animation//
    const rotationAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotationAnim, {
                toValue: 1,
                duration: 10000, // Durée de la rotation
                easing: Easing.linear, // Animation fluide
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotateInterpolate = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"], // Rotation complète
    });

    const themeBackgroundColor = useThemeColor({}, "background");


    //recorder function//

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [savedRecordings, setSavedRecordings] = useState<string[]>([]);

    const [isRecording, setIsRecording] = useState(false);
    const { sendRecording, loadRecordings } = usePlayer();

    useEffect(() => {
        const fetchRecordings = async () => {
            const dir = `${FileSystem.documentDirectory}recordings/`;
            const files = await FileSystem.readDirectoryAsync(dir);
            setSavedRecordings(files);
        };

        fetchRecordings();
    }, []);

    const createDirectory = async () => {
        const dir = `${FileSystem.documentDirectory}recordings/`;
        const dirInfo = await FileSystem.getInfoAsync(dir);

        if (dirInfo.exists) {
            console.log('Directory already exists at', dir);
            return dir;
        }

        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        console.log('Directory created at', dir);
        return dir;
    };

    const toggleRecording = async () => {
        if (isRecording) {
            console.log("Stopping recording..");
            await recording?.stopAndUnloadAsync();

            const uri = recording?.getURI();
            const dir = await createDirectory();

            if (!uri) {
                console.error("Failed to get URI of the recording");
                return;
            }

            const newUri = `${dir}recording-${Date.now()}.m4a`;
            await FileSystem.moveAsync({
                from: uri,
                to: newUri,
            });

            console.log("Recording moved to", newUri);

            // Convert the recording to base64
            if (newUri && sendRecording) {
                sendRecording(newUri);
            }

            loadRecordings();

            setRecording(null);
            setIsRecording(false);
        } else {
            try {

                console.log("Requesting permissions..");

                const { status } = await Audio.requestPermissionsAsync();
                if (status !== "granted") {
                    alert("Permission to access microphone is required!");
                }

                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                console.log("Starting recording..");
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                
                setRecording(recording);
                console.log("Recording started");
            } catch (err) {
                console.error("Failed to start recording", err);
            }
        }
        setIsRecording(!isRecording);
    }

    return (
        <Pressable
            onPress={toggleRecording}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "white" : "transparent",
                    borderColor: useThemeColor({}, "icon"),
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 100,
                    width: 200,
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                },
            ]}
        >
            {/* Container qui tourne */}
            <Animated.View
                style={{
                    position: "absolute",
                    width: 160,
                    height: 160,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ rotate: rotateInterpolate }],
                }}
            >
                {/* Insert your SVG here */}
                <Svg
                    width={248}
                    height={228}
                    viewBox="0 0 248 260"
                    style={{ position: "absolute" }}
                >
                    <Defs>
                        {/* Radial Gradient for the Centered Circle */}
                        <RadialGradient
                            id="paint0_radial_381_9"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(124 130) rotate(90) scale(100 100)"
                        >
                            <Stop offset="0%" stopColor="white" />
                            <Stop offset="53%" stopColor="#666666" />
                            <Stop offset="100%" stopColor="transparent" />
                        </RadialGradient>

                        <Mask id="mask1" x="0" y="0" width="200" height="200">
                            <Circle cx="124" cy="130" r="200" fill="white" />
                            <Circle cx="124" cy="130" r="200" fill="url(#paint0_radial_381_9)" />
                        </Mask>
                    </Defs>
                    <G>
                        <Circle cx="125.5" cy="71" r="71" fill="#BC4FFF" />
                    </G>
                    <G>
                        <Circle cx="71" cy="157" r="71" fill="#564FFF" />
                    </G>
                    <G>
                        <Circle cx="177" cy="157" r="71" fill="#8D4FFF" />
                    </G>
                    <Path
                        d="M108.099 139.768C118.523 142.454 129.518 142.774 140.139 140.492C137.678 130.43 132.722 120.191 124.486 110.324C124.324 110.138 124.16 109.952 123.995 109.767C117.474 117.623 113.004 125.508 110.132 133.214C109.367 135.338 108.687 137.523 108.099 139.768Z"
                        fill="#E694FF"
                    />
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M108.056 139.757L108.099 139.768L108.085 139.819C119.173 142.66 130.039 142.689 140.139 140.495L140.139 140.492L140.141 140.492C137.88 130.164 132.472 119.476 124.486 110.324C124.327 110.134 124.167 109.944 124.006 109.754L123.995 109.767L123.986 109.757C118.125 116.369 113.366 124.238 110.132 133.214C109.314 135.412 108.625 137.594 108.056 139.757ZM110.132 133.214C113.004 125.508 117.474 117.623 123.995 109.767C124.16 109.952 124.324 110.138 124.486 110.324C132.722 120.191 137.678 130.43 140.139 140.492C129.518 142.774 118.523 142.454 108.099 139.768C108.687 137.523 109.367 135.338 110.132 133.214Z"
                        fill="#DD76FF"
                    />
                    <Path
                        d="M193.957 88.0388C168.265 81.6688 141.31 90.2173 123.986 109.757L123.995 109.767L124.006 109.754C124.167 109.944 124.327 110.134 124.486 110.324C132.472 119.476 137.88 130.164 140.141 140.492L140.139 140.492L140.139 140.495C166.621 134.742 187.835 113.709 193.957 88.0388Z"
                        fill="#DD76FF"
                    />
                    <Path
                        d="M123.998 204.248C136.797 189.853 146.309 165.726 140.139 140.495C130.039 142.689 119.173 142.66 108.085 139.819L108.099 139.768L108.056 139.757C100.523 168.388 113.93 193.621 123.998 204.248Z"
                        fill="#AA76FF"
                    />
                    <Path
                        d="M56.8896 87.403C63.5638 115.249 84.3295 133.63 108.056 139.757C108.625 137.594 109.314 135.412 110.132 133.214C113.366 124.238 118.125 116.369 123.986 109.757C109.113 93.056 85.5713 81.6789 56.8896 87.403Z"
                        fill="#CD76FF"
                    />
                    <G>
                        <Circle cx="124" cy="130" r="200" fill="white" mask="url(#mask1)" />
                    </G>
                </Svg>
            </Animated.View>

            {/* Masque SVG */}
            <Svg width={200} height={200} viewBox="0 0 200 200">
                <Defs>
                    <Mask id="iconMask">
                        <Rect width="100%" height="100%" fill="white" />
                        <G>
                            <Rect x="64" y="169" width="75" height="13" rx="6.5" fill="black" />
                            <Rect x="96" y="151" width="12" height="23" fill="black" />
                            <Rect x="69" y="20" width="63" height="116" rx="31.5" fill="black" />
                            <Path d="M101 145C80 145 57 129 57 101V88.9999C56.5 80.5 44.5 80.5 44 89L44 101C44 136 70.5 159 101 159C129 159 157 135.5 157 102.5V88.9999C156.5 81 144.5 81 144 88.9999V102.5C144 125.5 123.5 145 101 145Z" fill="black" />
                        </G>
                    </Mask>
                </Defs>
                <Rect width="100%" height="100%" fill={themeBackgroundColor} mask="url(#iconMask)" />
            </Svg>


        </Pressable>
    );
}
