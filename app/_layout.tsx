import { Inter_900Black,Inter_400Regular,Inter_200ExtraLight,Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
      Inter_900Black,Inter_400Regular,Inter_200ExtraLight,Inter_600SemiBold
  })

  useEffect(()=>{
    if(error) throw error
    if(fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded, error])
  if(!fontsLoaded && !error) return null;
  return (
    <>
      <Stack>
      <Stack.Screen name="index" options={{
        headerShown:false
      }} />
      <Stack.Screen name="(tabs)" options={{
        headerShown:false
      }} />
    </Stack>
    <StatusBar style='light'/>
    </>
  );
}
