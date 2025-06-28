import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import FeedTabs from '../components/FeedTabs';
import PostCard from '../components/PostCard';
import { getFeed } from '../firebase/firestore';
import colors from '../theme/colors';

export default function HomeScreen({ userCity = 'Tampa' }) {
  const [tab, setTab] = useState<'New'|'Hot'|'Events'>('New');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let type = tab === 'Events' ? 'event' : 'post';
    let sort = tab === 'Hot' ? 'hot' : 'new';
    setLoading(true);
    getFeed(userCity, type, sort).then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, [tab, userCity]);

  return (
    <View style={styles.container}>
      <FeedTabs current={tab} setCurrent={setTab} />
      {loading ? <ActivityIndicator color={colors.accent} /> : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          ListEmptyComponent={<Text style={styles.text}>No posts yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  text: { color: colors.text, alignSelf: 'center', margin: 20 },
});
