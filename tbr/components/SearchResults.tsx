import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import BookResult from '@/components/BookResult'; // Assuming you have a BookResult component defined somewhere
import { Book } from '@/types';


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

  const onIndexChanged = useCallback((index:number)=> {setIndex(index);},[setIndex]);

  return (
    <>

        <View>
          <FlatList
            data={slices[index]}
            renderItem={({ item }) => <BookResult book={item} />}
            keyExtractor={(item) => item.isbn}
            style={styles.container}
          />
        </View>
        <View style={{ flexDirection: 'row', alignSelf:'center'}} >
                  {slices.map((_slicedBooks,_index) => (

            <Button title={(_index + 1).toString()} onPress={()=>(setIndex(_index))}
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
