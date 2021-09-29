import React from 'react';
import {FlatList, StyleSheet, ActivityIndicator, RefreshControl, FlatListProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, useTheme} from '@react-navigation/native';

import {useCharachtersInfiniteQuery} from '@src/hooks';

import {CharachterCard} from './CharachterCard';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';

const AFlatList = Animated.createAnimatedComponent<FlatListProps<Character>>(FlatList);

type Props = {
  navigation: NavigationProp<AppStackParams, 'Home'>;
};
export function Home({navigation}: Props) {
  const {
    colors: {primary},
  } = useTheme();
  const query = useCharachtersInfiniteQuery();
  const heroes = query.data?.pages.flatMap(p => p.results) ?? [];
  const safeInsets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({onScroll: e => (scrollY.value = e.contentOffset.y)});
  return (
    <AFlatList
      onScroll={onScroll}
      style={{flex: 1, paddingTop: 16, paddingHorizontal: 16}}
      contentContainerStyle={{paddingBottom: safeInsets.bottom}}
      data={heroes}
      keyExtractor={({id}) => `${id}`}
      renderItem={itemInfo => (
        <CharachterCard
          itemInfo={itemInfo}
          scrollY={scrollY}
          onPress={() => navigation.navigate('Character', {character: itemInfo.item})}
        />
      )}
      refreshControl={<RefreshControl tintColor={primary} refreshing={query.isFetching} onRefresh={query.refetch} />}
      onEndReached={query.fetchNextPage as () => void}
      onEndReachedThreshold={1}
      scrollEventThrottle={16}
      ListFooterComponent={query.isFetchingNextPage ? <ActivityIndicator size="large" color={primary} /> : undefined}
    />
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
