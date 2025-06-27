import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';

export default function GlobeSplash({ onFinish }) {
  // Placeholder: Animate and call onFinish after 2s
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      {/* Replace with 3D Globe later */}
      <Text style={styles.globe}>🌐</Text>
      <Text style={styles.text}>CityBuzz</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  globe: { fontSize: 80, marginBottom: 24 },
  text: { color: colors.accent, fontSize: 32, fontWeight: 'bold' },
});
