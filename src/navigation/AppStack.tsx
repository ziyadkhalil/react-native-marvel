import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import * as Screens from '@src/screens';
import {useTheme} from '@react-navigation/native';
import {Image, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Main = createSharedElementStackNavigator<AppStackParams>();

export function AppStack() {
  const {
    colors: {primary},
  } = useTheme();
  const safeInsets = useSafeAreaInsets();
  return (
    <Main.Navigator screenOptions={{headerShown: false}}>
      <Main.Screen
        component={Screens.Home}
        name="Home"
        options={({navigation}) => ({
          headerShown: true,
          headerTintColor: primary,
          headerTitle: () => <Image source={require('@src/assets/images/marvel-logo.png')} />,
          headerStyle: {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 77 + safeInsets.top,
          },
          headerRight: ({tintColor}) => (
            <Pressable onPress={() => navigation.navigate('Search')}>
              <Image style={{left: -33, tintColor}} source={require('@src/assets/images/search.png')} />
            </Pressable>
          ),
        })}
      />
      <Main.Screen component={Screens.Search} name="Search" options={{presentation: 'transparentModal'}} />
      <Main.Screen component={Screens.Charachter} name="Character" />
      <Main.Screen
        component={Screens.OverlayImage}
        name="Image"
        options={{presentation: 'transparentModal'}}
        sharedElements={route => [{id: `${route.params.id}`}]}
      />
    </Main.Navigator>
  );
}
