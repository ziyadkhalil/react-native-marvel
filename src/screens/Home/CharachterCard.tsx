import React from 'react';
import {Dimensions, ListRenderItemInfo, Pressable, StyleSheet, Text} from 'react-native';
import {BlurView} from 'expo-blur';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const CARD_HEIGHT = 140;
const MARGIN_BOTTOM = 16;
const HEIGHT = CARD_HEIGHT + MARGIN_BOTTOM;
const PARALLEX_WINDOW = 75;
type Props = {
  itemInfo: ListRenderItemInfo<Character>;
  onPress: () => void;
  scrollY: Animated.SharedValue<number>;
};

export function CharachterCard({itemInfo: {item: character, index}, onPress, scrollY}: Props) {
  const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const position = index * (CARD_HEIGHT + MARGIN_BOTTOM);
  const topAnimation = useAnimatedStyle(() => {
    const offset = position - (scrollY.value + 2.5 * HEIGHT);
    return {
      top:
        -20 -
        (position !== undefined
          ? -interpolate(offset, [-2.5 * HEIGHT, 2.5 * HEIGHT], [0, -2 * PARALLEX_WINDOW], Animated.Extrapolate.CLAMP)
          : 0),
    };
  }, []);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.Image source={{uri: imgUrl}} style={[styles.img, topAnimation]} />
      <BlurView intensity={60} style={styles.blur}>
        <Text style={styles.text}>{character.name}</Text>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: MARGIN_BOTTOM,
    justifyContent: 'flex-end',
  },
  img: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: 140 + 2 * PARALLEX_WINDOW,
    top: 0,
  },
  blur: {
    height: 35,
    backgroundColor: '#fdf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#E6EAF3',
    fontWeight: '900',
  },
});
