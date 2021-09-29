import {IconProps} from '@src/components';
import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

export function SearchIcon({width = 20, height = 20}: SvgProps) {
  return (
    <Svg width={width} height={height} stroke="#fff" viewBox="0 0 490 490">
      <Path
        stroke="#fff"
        strokeWidth={10}
        strokeLinecap="round"
        d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"
      />
    </Svg>
  );
}
