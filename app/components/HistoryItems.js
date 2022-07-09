import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {HistoryCard} from './HistoryCard';
import {IconButton} from 'react-native-paper';
import socketIOClient from 'socket.io-client';

export default function HistoryItems({
  doctorName,
  patientName,
  appointmentType,
  dateTime,
  appointmentStatus,
  navigation,
  appointmentId,
  appointmentLink,
  createdAt,
  groupName,
  createdBy,
  roomId,
}) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const setColour = status => {
    if (status == 'cancelled') {
      return '#FF0000';
    }
    if (status == 'pending') {
      return '#FFA500';
    }
    if (status == 'completed') {
      return '#90EE90';
    }
    if (status == 'confirmed') {
      return '#128C7E';
    }
  };
  const socket = socketIOClient('http://192.168.0.109:5001', {
    transports: ['websocket'],
    forceNew: true,
    upgrade: false,
  });
  socket.connect();
  socket.on('connect', () => console.log('connected suceessfully'));
  socket.on('disconnect', () => console.log('disconnected'));
  const onPress = () => {
    navigation.navigate('Chat Screen', {
      roomId,
      socket,
    });
  };
  return (
    <HistoryCard
      minHeight={80}
      width={'95%'}
      onPressCard={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 2,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: 10,
          width: 60,
          height: 60,
          marginRight: 15,
        }}>
        <Image
          source={require('../images/messages.png')}
          style={{height: 60, width: 60}}
        />
      </View>

      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{groupName}</Text>

        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 15,
              color: '#a9a9a9',
              alignSelf: 'flex-start',
              fontWeight: '500',
            },
          ]}>
          {days[new Date(createdAt).getDay().toString()]} ,
          {new Date(createdAt).toLocaleTimeString()}
        </Text>
      </View>
    </HistoryCard>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: '35%',
    flexDirection: 'column',
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
    width: '10%',
    flexDirection: 'column',
    marginTop: 10,
  },

  cardTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#2A3D57',
    fontFamily: 'Nunito',
    fontWeight: '800',
    alignSelf: 'flex-start',
    fontSize: 18,
  },
});
