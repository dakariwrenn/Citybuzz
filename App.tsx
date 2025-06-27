import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GlobeSplash from './src/components/GlobeSplash';
import HomeScreen from './src/screens/HomeScreen';
import EventsScreen from './src/screens/EventsScreen';
import AuthScreen from './src/screens/AuthScreen';
import colors from './src/theme/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  if (showSplash) {
    return <GlobeSplash onFinish={() => setShowSplash(false)} />;
  }

  if (!authenticated) {
    return <AuthScreen onAuth={() => setAuthenticated(true)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarStyle: { backgroundColor: colors.card },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Feed' }} />
        <Tab.Screen name="Events" component={EventsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
