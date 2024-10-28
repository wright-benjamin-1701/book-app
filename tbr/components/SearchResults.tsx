import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import BookResult from '@/components/BookResult'; // Assuming you have a BookResult component defined somewhere
import { Book } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';




interface Props {
    books?: Book[];
}
export default function SearchResults(props:Props) {
  const { books } = props;

  const resultsPerPage = 5;

  const slices = [];

  for (let i = 0; i < Math.ceil((books?.length || 0) / resultsPerPage); i++) {
    slices.push(books?.slice(i * resultsPerPage, (i + 1) * resultsPerPage));
  }

  const [index, setIndex] = useState(0);
  const [readingList, setReadingList] = useState<Book[]>([]);

  const onIndexChanged = useCallback((index:number)=> {setIndex(index);},[setIndex]);
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

  return (
    <>

        <View>
          <FlatList
            data={slices[index]}
            renderItem={({ item }) => <BookResult book={item} addBookHandler={handleAddBookToReadingList} buttonDisabled={readingList.some((book)=>{
              return book.isbn === item.isbn;
            })} />}
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
