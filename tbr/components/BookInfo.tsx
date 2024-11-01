import React from 'react';
import { Book } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';

interface BookInfoProps {
    book: Book;
}
export function BookInfo (props:BookInfoProps)  {
    const {book } = props;
    return (
    <>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText style={styles.author}>Author: {book.author}</ThemedText>
        <ThemedText style={styles.year}>Year of Publication: {book.year}</ThemedText>
    </>
    );
}


const styles = StyleSheet.create({

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    author: {
      fontSize: 16,
    
    },
    year: {
      fontSize: 14,
     
    },
  });

export default BookInfo;