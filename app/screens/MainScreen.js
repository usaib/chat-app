import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {useUserDispatch, useUserState} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWrapper from '../components/AppBar';
import {Avatar} from 'react-native-paper';
import socketIOClient from 'socket.io-client';
import HistoryItems from '../components/HistoryItems';
import {getAllRooms} from '../services/users';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function MainScreen({navigation}) {
  const userDispatch = useUserDispatch();
  const userState = useUserState();
  console.log('userstate', userState);
  const name = userState.user.name;
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [refreshed, setRefreshed] = useState(true);
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setData([]);
    setRefreshed(prev => !prev);
  };
  const ItemView = obj => {
    return (
      // Flat List Item
      <HistoryItems
        roomId={obj.item.id}
        groupName={obj.item.name}
        createdAt={obj.item.createdAt}
        navigation={navigation}
      />
    );
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await getAllRooms({
          id: userState.user.id,
        });
        setData(resp.data.data.data.rows[0].rooms);
        console.log('fetched', resp.data.data.data.rows[0].rooms);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getData();
  }, [refreshed]);

  const removeValue = async value => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      console.log('Error in removing', e);
    }
    console.log('Done');
  };
  const toggle = () => {
    navigation?.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <AppBarWrapper
        title={'Chats'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showMenu={true}
        showButton={true}
        onMenuPress={toggle}
      />
      <ScrollView
        contentContainerStyle={{flex: 1, marginTop: 5, paddingLeft: 15}}>
        {/* {loading ? (
        <ActivityIndicator
          animating={true}
          style={{
            marginTop: 250,
          }}
          color={'#3498DB'}
          size="small"
        />
      ) : (
        data.length &&
        data.map(obj => (
          <HistoryItems
            doctorName={obj.doctor.name}
            appointmentId={obj.id}
            patientName={obj.user.name}
            dateTime={obj.dateTime}
            appointmentType={obj.type}
            appointmentStatus={obj.status}
            navigation={navigation}
          />
        ))
      )} */}
        <FlatList
          data={data}
          keyExtractor={(obj, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </ScrollView>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  cardView: {
    flex: 1,
    margin: 10,
  },
  sendBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    marginLeft: 10,
    color: '#128C7E',
    fontFamily: 'Gibson-Regular',
    fontSize: 20,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
  top: {
    height: 170,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#B5DEFF35',
    position: 'absolute',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 20,
  },
  openText: {
    fontSize: 28,
    color: '#05375a',
    fontWeight: '600',
    marginVertical: 12,
    letterSpacing: 0.5,
  },
  cardText: {
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#05375a',
    maxWidth: 230,
    textTransform: 'capitalize',
    marginHorizontal: 20,
  },
  cardImage: {
    height: 150,
    width: 160,
    position: 'absolute',
    right: 5,
    bottom: 0,
  },
});
export default MainScreen;
