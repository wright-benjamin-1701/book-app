import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import BookResult from '@/components/BookResult'; // Assuming you have a BookResult component defined somewhere
import { Book } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListBook from './ReadingListElement';




interface Props {
}
export default function SearchResults(props:Props) {


  const resultsPerPage = 5;


  const [index, setIndex] = useState(0);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const slices = [];

  for (let i = 0; i < Math.ceil((readingList?.length || 0) / resultsPerPage); i++) {
    slices.push(readingList?.slice(i * resultsPerPage, (i + 1) * resultsPerPage));
  }

  const onIndexChanged = useCallback((index:number)=> {setIndex(index);},[setIndex]);
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

  return (
    <>

        <View>
          <FlatList
            data={slices[index]}
            renderItem={({ item }) => <ListBook book={item} removeBookHandler={handleRemoveBookFromReadingList} buttonDisabled={false} />}
            keyExtractor={(item) => item.isbn}
            style={styles.container}
          />
        </View>
        <View style={{ flexDirection: 'row', alignSelf:'center'}} >
                  {slices.map((_slicedBooks,_index) => (

            <Button title={(_index + 1).toString()} onPress={()=>(onIndexChanged(_index))}
              disabled={index === _index} key={_index} />

        ))}
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
