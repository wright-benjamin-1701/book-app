import React, { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { Book } from "@/types";
import BookListElement from "@/components/BookListElement";

interface Props {
  action: (book: Book) => void;
  actionTitle: string;
  buttonDisabled: (book: Book) => boolean;
  books?: Book[];
}
export default function ActionBookList(props: Props) {
  const { action, actionTitle, books, buttonDisabled } = props;

  const resultsPerPage = 5;

  const [index, setIndex] = useState(0);
  const slices = [];

  for (let i = 0; i < Math.ceil((books?.length || 0) / resultsPerPage); i++) {
    slices.push(books?.slice(i * resultsPerPage, (i + 1) * resultsPerPage));
  }

  const onIndexChanged = useCallback(
    (index: number) => {
      setIndex(index);
    },
    [setIndex]
  );

  return (
    <>
      <View>
        <FlatList
          data={slices[index]}
          renderItem={({ item }) => (
            <BookListElement
              book={item}
              buttonDisabled={buttonDisabled(item)}
              title={actionTitle}
              onPressHandler={action}
            />
          )}
          keyExtractor={(item) => item.isbn}
          style={styles.container}
        />
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {slices.map((_slicedBooks, _index) => (
          <Button
            title={(_index + 1).toString()}
            onPress={() => onIndexChanged(_index)}
            disabled={index === _index}
            key={_index}
          />
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
