import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

interface ILocationModel {
  coords?: {
    accuracy: number;
    latitude: number;
    longitude: number;
  }
}

export default function App() {
  const [location, setLocation] = useState<ILocationModel>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    checkPermissions();
    getLocationAndUpdate();
  }, []);

  const checkPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };
  
  const getLocationAndUpdate = async (): Promise<void> => {
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      setLocation(location as ILocationModel);
    } else {
      setErrorMsg("no location found");
    }
  };

  return (
    <View style={styles.container}>
      {location && errorMsg?.length === 0 ? 
      <Text style={styles.paragraph}>{location.coords?.latitude}, {location.coords?.longitude}</Text> : <Text>Loading...</Text>}

      {/* error with location */}
      {errorMsg?.length ? <Text>{errorMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
