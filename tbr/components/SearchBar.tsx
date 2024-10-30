import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
    runSearch(query: string): void;
}

const SearchBar = (props:Props) => {


  const {runSearch} = props;
  const [searchQuery, setSearchQuery] = useState('');
 

  const handleSearch = () => {
    
    runSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center vertically within the row
    padding: 20,
  },
  input: {
    flex: 1, // Take up remaining space
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // Add some space between input and button
    paddingHorizontal: 10,
    backgroundColor: 'white',
    
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default SearchBar;
