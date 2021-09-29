import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

type Props = {
  resource: Resource;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
export function Resource({resource, onPress, style}: Props) {
  const {colors} = useTheme();
  const imgUrl = resource.thumbnail ? `${resource.thumbnail.path}.${resource.thumbnail.extension}` : '';

  return (
    <Pressable onPress={onPress} style={style} disabled={!imgUrl}>
      {imgUrl ? (
        <SharedElement id={`${resource.id}`}>
          <Image style={[styles.img, {backgroundColor: colors.card}]} source={{uri: imgUrl}} />
        </SharedElement>
      ) : (
        <View style={[styles.img, {backgroundColor: colors.card}]} />
      )}
      <Text numberOfLines={1} style={styles.name}>
        {resource.name ? resource.name : resource.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 150,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8.5,
  },
  name: {
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
    maxWidth: 100,
    alignSelf: 'center',
  },
});
