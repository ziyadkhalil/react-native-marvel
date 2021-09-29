import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import {Resource} from './Resource';

type Props = {
  title: string;
  resources: Resource[];
  navigation: NavigationProp<AppStackParams, 'Character'>;
};
export function ResourceList({title, resources, navigation}: Props) {
  return (
    <>
      <Text style={styles.subtitle}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.ps}
        style={styles.nmh}
        horizontal
        keyExtractor={(_, idx) => `${idx}`}
        data={resources}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Resource
            resource={item}
            onPress={() => {
              navigation.navigate('Image', {
                uri: `${item!.thumbnail!.path}.${item!.thumbnail!.extension}`,
                id: item!.id!,
              });
            }}
            style={styles.me}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FF898E',
  },
  nmh: {
    marginHorizontal: -16,
    marginBottom: 30,
  },
  ps: {
    paddingStart: 16,
    paddingEnd: 6,
  },
  me: {
    marginEnd: 10,
  },
});
