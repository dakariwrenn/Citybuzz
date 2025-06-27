import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { votePost } from '../firebase/firestore';
import colors from '../theme/colors';

// Assume userId is globally available or from context
const userId = 'anon_user_123';

export default function VoteButton({ postId, votes }: { postId: string, votes: number }) {
  const [myVote, setMyVote] = useState<0|1|-1>(0);
  const [count, setCount] = useState(votes);

  const handleVote = async (value: 1|-1) => {
    if (myVote === value) return;
    setMyVote(value);
    setCount(count + value);
    await votePost(postId, userId, value);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => handleVote(1)}>
        <Text style={[styles.up, myVote === 1 && styles.active]}>▲</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={() => handleVote(-1)}>
        <Text style={[styles.down, myVote === -1 && styles.active]}>▼</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  up: { color: colors.upvote, fontSize: 20 },
  down: { color: colors.downvote, fontSize: 20 },
  count: { color: colors.text, marginHorizontal: 6, fontWeight: 'bold' },
  active: { textShadowColor: colors.accent, textShadowRadius: 8 },
});
