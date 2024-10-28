import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { useCallback, useEffect, useState } from 'react';
import searchBooksRequest from '@/services/search-books';
import ReadingList from '@/components/ReadingList';
import { Book } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


// Todo: refactor other code
// add reading list and remove from reading list buttons
export default function TabFourScreen() {

  const isFocused = useIsFocused();

  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="book-outline" style={styles.headerImage} />}>
  <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Reading List</ThemedText>
      </ThemedView>

    <ThemedView style={{ paddingHorizontal: 24 }}>
      {isFocused?<><ReadingList  /></>:<></> }
      
    </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
