import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VoteButton from './VoteButton';
import colors from '../theme/colors';

export default function PostCard({ post }: any) {
  return (
    <View style={styles.card}>
      {post.type === 'event' && (
        <Text style={styles.eventTitle}>{post.eventTitle} @ {post.eventLocation}</Text>
      )}
      <Text style={styles.content}>{post.content}</Text>
      {post.type === 'event' && (
        <Text style={styles.eventDate}>{new Date(post.eventDate).toLocaleString()}</Text>
      )}
      <View style={styles.actions}>
        <VoteButton postId={post.id} votes={post.votes} />
        {/* Add more actions if needed */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 16, margin: 10, borderRadius: 10 },
  content: { color: colors.text, fontSize: 16 },
  eventTitle: { color: colors.event, fontWeight: 'bold', fontSize: 18 },
  eventDate: { color: colors.secondaryText, fontSize: 13 },
  actions: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
});
