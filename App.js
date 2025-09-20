import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [loaded, error] = useFonts({
    'MonserratR': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MonserratB': require('./assets/fonts/Montserrat-Bold.ttf'),
    'MonserratL': require('./assets/fonts/Montserrat-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <MainNavigator />
    </Provider>

  );
};

