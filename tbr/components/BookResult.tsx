import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Book } from '@/types';

const BookResult: React.FC<{ book: Book, addBookHandler: (book: Book) => void,buttonDisabled:boolean }> = ({ book, addBookHandler,buttonDisabled }) => {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.year}>Year of Publication: {book.year}</Text>
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
    color: '#333',
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookResult;
