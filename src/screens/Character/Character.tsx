import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import {StyleSheet, View, Text, Image, Pressable, FlatList} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useResources} from './useResources';
import {ResourceList} from './ResourceList';

const IMG_HEIGHT = 300;

type Props = {navigation: NavigationProp<AppStackParams, 'Character'>; route: RouteProp<AppStackParams, 'Character'>};
export function Charachter({navigation, route}: Props) {
  const charachter = route.params.character;

  const [storiesQuery, comicsQuery, eventsQuery, seriesQuery] = useResources(charachter.id);

  const imgUrl = `${charachter.thumbnail.path}.${charachter.thumbnail.extension}`;

  const safeInsets = useSafeAreaInsets();

  const translationY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translationY.value = event.contentOffset.y;
    },
  });

  const scaleAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {scale: interpolate(translationY.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [3, 1.3, 1], Extrapolate.CLAMP)},
      ],
    }),
    [],
  );

  const imgContainerAnimation = useAnimatedStyle(() => ({
    height: interpolate(
      translationY.value,
      [-IMG_HEIGHT, 0, IMG_HEIGHT],
      [IMG_HEIGHT * 2, IMG_HEIGHT, IMG_HEIGHT / 2],
      Extrapolate.CLAMP,
    ),
  }));

  const stories = storiesQuery.data ? storiesQuery.data : charachter.stories.items;
  const comics = comicsQuery.data ? comicsQuery.data : charachter.comics.items;
  const events = eventsQuery.data ? eventsQuery.data : charachter.events.items;
  const series = seriesQuery.data ? seriesQuery.data : charachter.series.items;

  return (
    <>
      <Animated.ScrollView
        onScroll={onScroll}
        contentContainerStyle={[styles.scrollContainer, {paddingBottom: safeInsets.bottom}]}
        scrollEventThrottle={16}>
        <Image style={styles.bg} source={require('@src/assets/images/background.png')} />
        <Text style={styles.name}>{charachter.name}</Text>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.description}>{charachter.description ? charachter.description : 'N/A'}</Text>
        {comics.length > 0 && <ResourceList title="Comics" resources={comics} navigation={navigation} />}
        {events.length > 0 && <ResourceList title="Events" resources={events} navigation={navigation} />}
        {series.length > 0 && <ResourceList title="Series" resources={series} navigation={navigation} />}
        {stories.length > 0 && <ResourceList title="Stories" resources={stories} navigation={navigation} />}
      </Animated.ScrollView>
      <Animated.View style={[styles.imageContainer, imgContainerAnimation]}>
        <Animated.Image source={{uri: imgUrl}} style={[styles.image, scaleAnimatedStyle]} resizeMode="cover" />
        <Pressable onPress={navigation.goBack} style={[styles.backContainer, {top: safeInsets.top + 14}]}>
          <Image source={require('@src/assets/images/ic-back.png')} />
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {flexGrow: 1, paddingHorizontal: 16, minHeight: '100%', paddingTop: IMG_HEIGHT + 26},
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: IMG_HEIGHT,
    resizeMode: 'cover',
  },
  bg: {
    top: 0,
    resizeMode: 'cover',
    width: '120%',
    left: -10,
    backgroundColor: 'white',
    position: 'absolute',
  },
  backContainer: {
    position: 'absolute',
    height: 40,
    width: 68,
    backgroundColor: '#24242480',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    paddingVertical: 10,
    paddingStart: 20,
  },
  name: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 35,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FF898E',
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 30,
  },
  nmh: {
    marginHorizontal: -16,
  },
  ps: {
    paddingStart: 16,
    paddingEnd: 6,
  },
  me: {
    marginEnd: 10,
  },
});
