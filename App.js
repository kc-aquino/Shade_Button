import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Audio } from "expo-av";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    const loadSound = async () => {
      await Audio.setAudioModeAsync({});
      const sound = new Audio.Sound();

      try {
        await sound.loadAsync(require("./assets/shadeSFX.wav"), {
          shouldPlay: false,
        });
        console.log("Sound loaded successfully.");

        // Play sound logic with access to the loaded sound object:
        const playSound = async () => {
          try {
            await sound.replayAsync();
          } catch (error) {
            console.error("Error playing sound:", error);
          }
        };

        this.sound = sound;
        this.playSound = playSound;
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };
    loadSound();
  }, []);

  const playSound = async () => {
    if (this.sound) {
      try {
        await this.sound.replayAsync();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    } else {
      console.warn("Sound is not loaded yet.");
    }
  };

  return (
    <View style={styles.imageBG}>
      <ImageBackground
        source={require("./assets/bg.png")}
        style={styles.container}
      >
        <Pressable
          onPress={playSound}
          style={({ pressed }) => {
            return { opacity: pressed ? 0.5 : 1 };
          }}
        >
          <Image
            style={styles.imgButton}
            source={require("./assets/shadeButton.png")}
          />
        </Pressable>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imgButton: {
    width: 340,
    height: 300,
    marginTop: 450,
  },
});
