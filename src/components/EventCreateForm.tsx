import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addPost } from '../firebase/firestore';
import colors from '../theme/colors';

export default function EventCreateForm({ onClose, onCreated }: { onClose: () => void, onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    // TODO: upload image to storage and get URL (for now, just use local uri)
    await addPost({
      city: 'Tampa', // TODO: get current city from context
      content: '', // Could allow optional event description
      type: 'event',
      eventTitle: title,
      eventLocation: location,
      eventDate: date.getTime(),
      flyerUrl: image,
      createdAt: Date.now(),
      votesYes: 0,
      votesNo: 0,
    });
    setSubmitting(false);
    onCreated();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Create Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.secondaryText}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor={colors.secondaryText}
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDate(true)}>
        <Text style={{ color: colors.text }}>{date.toLocaleString()}</Text>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(_, d) => {
              setShowDate(false);
              if (d) setDate(d);
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.imgBtn} onPress={pickImage}>
        <Text style={{ color: colors.event }}>{image ? 'Change flyer' : 'Upload flyer image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.flyer} />}
      <View style={styles.row}>
        <TouchableOpacity style={styles.cancel} onPress={onClose} disabled={submitting}>
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit} onPress={submit} disabled={submitting || !title || !location || !image}>
          <Text style={styles.submitTxt}>{submitting ? 'Posting...' : 'Post Event'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: colors.card, margin: 20, borderRadius: 16, padding: 20 },
  title: { color: colors.event, fontSize: 20, fontWeight: 'bold', marginBottom: 18 },
  input: { backgroundColor: colors.background, color: colors.text, borderRadius: 8, padding: 12, marginBottom: 14 },
  imgBtn: { marginBottom: 10, alignItems: 'center' },
  flyer: { width: '100%', height: 160, borderRadius: 10, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancel: { padding: 12, borderRadius: 8, backgroundColor: colors.background },
  cancelTxt: { color: colors.secondaryText, fontWeight: 'bold' },
  submit: { padding: 12, borderRadius: 8, backgroundColor: colors.event },
  submitTxt: { color: colors.card, fontWeight: 'bold' },
});
