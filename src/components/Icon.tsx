import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SearchIcon} from '@src/assets/icons';

// add icons' names here
export const iconNames = ['search'] as const;

export type IconName = typeof iconNames[number];

type BaseProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export type IconProps = {
  name: IconName;
} & BaseProps;

export function Icon(props: IconProps): React.ReactElement {
  switch (props.name) {
    case 'search':
      return <SearchIcon {...props} />;
  }
}
