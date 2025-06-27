import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function FeedTabs({ current, setCurrent }) {
  return (
    <View style={styles.row}>
      {['New', 'Hot', 'Events'].map(tab => (
        <TouchableOpacity key={tab} onPress={() => setCurrent(tab)} style={[styles.tab, current === tab && styles.active]}>
          <Text style={[styles.text, current === tab && styles.textActive]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 8, margin: 8, overflow: 'hidden' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  active: { backgroundColor: colors.accent + '22' },
  text: { color: colors.secondaryText, fontWeight: '600' },
  textActive: { color: colors.accent },
});
