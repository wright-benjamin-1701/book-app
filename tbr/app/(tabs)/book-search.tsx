import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { useCallback, useState } from 'react';
import searchBooksRequest from '@/services/search-books';
export default function TabThreeScreen() {

  const [books, setBooks] = useState();

  const runSearch = useCallback(async (query:string)=>{

    const responseBooks = await searchBooksRequest( query );
    setBooks(responseBooks);

  } , [setBooks]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="search-circle" style={styles.headerImage} />}>
  <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Book Search</ThemedText>
      </ThemedView>

    <ThemedView style={{ paddingHorizontal: 24 }}>
      <SearchBar runSearch={runSearch}/>
      <SearchResults books={books} />
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
