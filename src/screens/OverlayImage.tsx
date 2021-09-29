import {NavigationProp, RouteProp} from '@react-navigation/core';
import {BlurView} from 'expo-blur';
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

type Props = {route: RouteProp<AppStackParams, 'Image'>; navigation: NavigationProp<AppStackParams, 'Image'>};
export function OverlayImage({route, navigation}: Props) {
  const uri = route.params.uri;
  return (
    <BlurView intensity={80} style={styles.container} tint="dark">
      <Pressable style={StyleSheet.absoluteFillObject} onPress={navigation.goBack} />
      <SharedElement id={`${route.params.id}`}>
        <Image style={styles.img} source={{uri}} />
      </SharedElement>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '75%',
    aspectRatio: 2 / 3,
  },
});
