import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Book } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionBookList from '@/components/ActionBookList';

interface Props {
}
export default function ReadingList(props:Props) {

  const [readingList, setReadingList] = useState<Book[]>([]);

  const onReadingListUpdated = useCallback((readingList:Book[])=> {setReadingList(readingList)}, [setReadingList]);
  
  const setAsyncReadingList = async (readingList:Book[]) => {
    const jsonValue = JSON.stringify(readingList);
    await AsyncStorage.setItem('reading-list',jsonValue);
    onReadingListUpdated([...readingList]);

  }

  const handleRemoveBookFromReadingList = useCallback((book:Book)=> {
    setAsyncReadingList(readingList.filter(b => b.isbn !== book.isbn));
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

  const buttonDisabled = (book:Book)=>false;

  return (
    <>
    <ActionBookList  action={handleRemoveBookFromReadingList} actionTitle='Remove from Reading List' 
    books={readingList}  buttonDisabled={buttonDisabled}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
