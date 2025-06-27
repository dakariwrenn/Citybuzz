// After login, detect city and save user
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { saveUser } from '../firebase/firestore';
import { detectCityByLocation, detectCityByAreaCode } from '../utils/cityDetect';
import colors from '../theme/colors';

export default function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [loading, setLoading] = useState(false);
  // ...phone/email logic from previous AuthScreen
  // After successful Firebase login:
  async function afterLogin() {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    let city = null;
    city = await detectCityByLocation();
    if (!city && user?.phoneNumber) {
      city = detectCityByAreaCode(user.phoneNumber);
    }
    if (!city) city = 'Unknown';
    await saveUser({
      uid: user.uid,
      phone: user.phoneNumber ?? undefined,
      email: user.email ?? undefined,
      city,
      createdAt: Date.now(),
    });
    setLoading(false);
    onAuth();
  }
  // ...rest of AuthScreen logic
  return (
    <View>
      {loading && (
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator color={colors.accent} />
          <Text style={{color:colors.text}}>Setting up your account...</Text>
        </View>
      )}
      {/* ...rest of your Sign in UI */}
    </View>
  );
}
