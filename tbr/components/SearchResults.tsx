import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import BookResult from '@/components/BookResult'; // Assuming you have a BookResult component defined somewhere
import { Book } from '@/types';

interface Props {
    books?: Book[];

}
export default function SearchResults(props:Props) {
  const { books } = props;

  const slicedBooks = books?.slice(0, 10);
  return (
    <FlatList
      data={slicedBooks}
      renderItem={({ item }) => <BookResult book={item} />}
      keyExtractor={(item) => item.isbn}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
