import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Book } from '@/types';
import { BookInfo } from '@/components/BookInfo';

const BookListElement: React.FC<{ book: Book, onPressHandler: (book: Book) => void,buttonDisabled:boolean,title:string }> 
= ({ book, onPressHandler, buttonDisabled, title }) => {
  return (
    <>
    <View style={styles.container}>
      <BookInfo book={book} />
      <View style={{alignSelf:'baseline', marginVertical:2}}>
      <Button title={title} onPress={()=> {onPressHandler(book);}} disabled={buttonDisabled} />
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
 
});

export default BookListElement;
