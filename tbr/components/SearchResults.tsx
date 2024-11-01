import React, { useCallback, useEffect, useState } from 'react';
import {  StyleSheet } from 'react-native';
import { Book } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionBookList from '@/components/ActionBookList';




interface Props {
    books?: Book[];
}
export default function SearchResults(props:Props) {
  const { books } = props;

  const [readingList, setReadingList] = useState<Book[]>([]);

  const onReadingListUpdated = useCallback((readingList:Book[])=> {setReadingList(readingList)}, [setReadingList]);
  
  const setAsyncReadingList = async (readingList:Book[]) => {
    const jsonValue = JSON.stringify(readingList);
    await AsyncStorage.setItem('reading-list',jsonValue);
    onReadingListUpdated([...readingList]);

  }

  const handleAddBookToReadingList = useCallback((book:Book)=> {
    setAsyncReadingList([...readingList, book]);
  },[setAsyncReadingList, readingList]);

  useEffect( ()=>{
    const getReadingList = async () => {
      try{
        const tempList = await AsyncStorage.getItem('reading-list');
        onReadingListUpdated(JSON.parse(tempList || '[]') as Book[]);
      }
      catch (e) {
        onReadingListUpdated( [] as Book[]);
      }
    }
    getReadingList();
    
  },[onReadingListUpdated]);

  const buttonDisabled = (item: Book) => readingList.some((book)=>{
    return book.isbn === item.isbn;
  })

  return (
    <>

        <ActionBookList action={handleAddBookToReadingList} actionTitle='Add to Reading List' 
        books={books} buttonDisabled={buttonDisabled} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
