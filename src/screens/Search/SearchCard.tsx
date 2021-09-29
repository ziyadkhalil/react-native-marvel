import React from 'react';
import {Image, ListRenderItemInfo, Pressable, StyleSheet, Text} from 'react-native';

type Props = {
  character: Character;
  onPress: () => void;
  keyword: string;
};
export function SearchCard({character, onPress, keyword}: Props) {
  const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const pieces = character.name.toLocaleLowerCase().split(keyword.toLocaleLowerCase());
  const [, rest] = pieces;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.img} source={{uri: imgUrl}} />
      <Text style={styles.text}>
        <Text style={styles.highlight}>{keyword}</Text>
        {rest}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
    marginBottom: 16,
  },
  img: {
    height: '100%',
    aspectRatio: 1,
    marginEnd: 16,
  },
  text: {
    color: 'white',
  },
  highlight: {
    backgroundColor: '#F0131E80',
  },
});
