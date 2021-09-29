import {NavigationProp, useTheme} from '@react-navigation/native';
import {useCharachtersInfiniteQuery} from '@src/hooks';
import {BlurView} from 'expo-blur';
import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDebounce} from 'use-debounce/lib';
import {SearchCard} from './SearchCard';

type Props = {
  navigation: NavigationProp<AppStackParams, 'Search'>;
};

export function Search({navigation}: Props) {
  const safeInsets = useSafeAreaInsets();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 700)[0];
  const query = useCharachtersInfiniteQuery(debouncedKeyword);
  const heroes = query.data?.pages.flatMap(p => p.results) ?? [];
  return (
    <BlurView style={[styles.container, {paddingTop: safeInsets.top + 16}]} intensity={80} tint="dark">
      <View style={styles.bar}>
        <TextInput autoFocus style={styles.input} value={keyword} onChangeText={setKeyword} />
        <Text style={[styles.cancel, {color: colors.primary}]} onPress={navigation.goBack}>
          Cancel
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: safeInsets.bottom - 16}}
        refreshControl={
          <RefreshControl
            tintColor={colors.primary}
            refreshing={query.isFetching || query.isLoading}
            onRefresh={query.refetch}
          />
        }
        style={styles.list}
        data={heroes}
        renderItem={({item: character}) => (
          <SearchCard
            keyword={debouncedKeyword}
            character={character}
            onPress={() => navigation.navigate('Character', {character})}
          />
        )}
        keyExtractor={({id}) => `${id}`}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626CC',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  list: {flex: 1, marginHorizontal: -16, paddingHorizontal: 16},
  bar: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  cancel: {
    paddingVertical: 20,
    paddingStart: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: 'white',
  },
});
