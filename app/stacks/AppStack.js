import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerList from '../components/DrawerList';
import {Icon} from 'react-native-elements';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: {marginVertical: 5},
        fontFamily: 'Gibson-Regular',
      }}
      drawerLabelStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      drawerItemStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      labelStyle={{
        fontFamily: 'Gibson-Regular',
      }}
      style={{
        itemStyle: {marginVertical: 5},
        fontFamily: 'Gibson-Regular',
      }}
      drawerContent={props => <DrawerList {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name="home"
              type="feather"
              color={'#128C7E'}
              onPress={() => onDelete(symptom)}
            />
          ),
        }}
        component={HomeStack}
        labelStyle={{
          itemStyle: {marginVertical: 5},
          fontFamily: 'Gibson-Regular',
        }}
      />
    </Drawer.Navigator>
  );
};
export default AppStack;
