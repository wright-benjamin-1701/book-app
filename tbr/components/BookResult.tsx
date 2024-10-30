import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Book } from '@/types';
import { ThemedText } from './ThemedText';

const BookResult: React.FC<{ book: Book, addBookHandler: (book: Book) => void,buttonDisabled:boolean }> = ({ book, addBookHandler,buttonDisabled }) => {
  return (
    <>
    <View style={styles.container}>
      <ThemedText style={styles.title}>{book.title}</ThemedText>
      <ThemedText style={styles.author}>Author: {book.author}</ThemedText>
      <ThemedText style={styles.year}>Year of Publication: {book.year}</ThemedText>
      <View style={{alignSelf:'baseline', marginVertical:2}}>
      <Button title='Add to reading list' onPress={()=> {addBookHandler(book);}} disabled={buttonDisabled} />
    </View>
      
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
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

export default BookResult;
