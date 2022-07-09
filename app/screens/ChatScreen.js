import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TextInput, Text, Surface, Button, List} from 'react-native-paper';
import {useUserDispatch, useUserState} from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWrapper from '../components/AppBar';
import {Avatar} from 'react-native-paper';
import HistoryItems from '../components/HistoryItems';
import {getAllRooms} from '../services/users';
import {createRoomChat, getRoomChat} from '../services/room';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function ChatScreen({navigation, route}) {
  const userDispatch = useUserDispatch();
  const {roomId, socket} = route.params;
  const userState = useUserState();
  //   console.log('userstate', userState);
  const name = userState.user.name;
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  //   const [refreshing, setRefreshing] = useState(true);
  //   const [refreshed, setRefreshed] = useState(true);
  //   const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setData([]);
    setRefreshed(prev => !prev);
  };
  const ItemView = obj => {
    return (
      // Flat List Item
      <HistoryItems groupName={obj.item.name} createdAt={obj.item.createdAt} />
    );
  };
  const createChat = async params => {
    try {
      const chat = await createRoomChat(params);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(messages);
    socket.on(
      'chat message',
      message => {
        setMessages(prevState => [...prevState, message]);
        scrollToBottom(70);
      },
      () => {},
    );
  }, [socket]);
  useEffect(() => {
    const getChat = async params => {
      try {
        const chat = await getRoomChat({roomId});
        console.log(chat.data, chat.data.data.data.rows);
        if (chat.data.success) {
          setMessages(chat.data.data.data.rows);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getChat();
  }, []);
  const sendMessage = async () => {
    socket.emit(
      'chat message',
      {
        room: roomId,
        from: userState.user.name,
        text: chatMessage ? chatMessage : 'Hello',
        createdAt: new Date().now,
      },
      () => {
        scrollToBottom(50);
      },
    );

    setChatMessage('');
  };
  const renderName = name => {
    return userState.user.name !== name ? (
      <Text style={{fontSize: 13, marginLeft: 5}}> {name} </Text>
    ) : null;
  };

  const scrollToBottom = offset => {
    const scrollHeight = contentHeight - scrollViewHeight + offset;
    if (scrollHeight > 0) {
      this.flatlist.scrollToOffset({offset: scrollHeight, animated: true});
    }
  };

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
        title={'Messages'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showMenu={true}
        showButton={false}
        onMenuPress={toggle}
      />
      <ScrollView
        contentContainerStyle={{flex: 1, marginTop: 5, paddingLeft: 15}}>
        <FlatList
          ref={flatlist => (this.flatlist = flatlist)}
          data={messages}
          keyExtractor={(item, index) => `${index}`}
          onContentSizeChange={(w, h) => (this.contentHeight = h)}
          onLayout={ev =>
            (this.scrollViewHeight = ev.nativeEvent.layout.height)
          }
          renderItem={({item}) => {
            const cellStyle = {
              container: {
                justifyContent: 'center',
                alignItems:
                  userState.user.name === item.from ? 'flex-end' : 'flex-start',
              },
              textContainer: {
                maxWidth: '70%',
                marginHorizontal: 12,
                marginVertical: 5,
                paddingHorizontal: 13,
                paddingVertical: 8,
                backgroundColor:
                  userState.user.name === item.from ? '#2f73e0' : '#e2e2e2',
                borderRadius: 10,
              },
              text: {
                color:
                  userState.user.name === item.from ? '#ffffff' : '#282828',
                fontSize: 15,
              },
            };
            return (
              <View style={cellStyle.container}>
                {renderName(item.from)}
                <View style={cellStyle.textContainer}>
                  <Text style={cellStyle.text}> {item.text} </Text>
                </View>
              </View>
            );
          }}
        />
        {/* <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="account-circle-outline" />}
        />
        <List.Item
          title="First Item"
          left={props => <List.Icon {...props} icon="account-circle-outline" />}
        /> */}
      </ScrollView>
      <Surface style={[styles.btnCont]}>
        <TextInput
          label="Write Message"
          mode="outlined"
          value={chatMessage}
          onChangeText={chatMessage => {
            setChatMessage(chatMessage);
          }}
          right={
            <TextInput.Icon
              name="check-circle"
              color={'#128C7E'}
              size={40}
              onPress={async () => {
                sendMessage();
                console.log('calling chat message');
                await createChat({
                  room: roomId,
                  from: userState.user.name,
                  text: chatMessage ? chatMessage : 'Hello',
                  createdAt: new Date().now,
                });
              }}
            />
          }
        />
      </Surface>
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
export default ChatScreen;
