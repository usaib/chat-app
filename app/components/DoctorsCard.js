import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/globalStyles';

const Button = ({onPress, style, title, icon}) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 45,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          borderWidth: 2,
          paddingHorizontal: 7,
        },
        style,
      ]}
      onPress={onPress}>
      {icon && (
        <Image source={icon} style={{height: 25, width: 25, marginRight: 6}} />
      )}
      <Text
        style={[
          globalStyles.cardsubHeading,
          {color: style.color, fontWeight: style.fontWeight},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export const DoctorsCard = ({doctor, navigation}) => {
  return (
    <View style={doctorCard.card}>
      <View style={{marginTop: 15}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={doctorCard.imageContainer}>
            <Image
              source={{
                uri: doctor.imageUrl,
              }}
              style={{
                marginTop: 1.5,
                objectFit: 'contain',
                width: 90,
                height: 90,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 15,
              marginTop: 5,
            }}>
            <Text style={globalStyles.cardHeading}>Dr. {doctor.name}</Text>
            <Text
              style={[
                globalStyles.cardsubHeading,
                {color: '#128C7E', marginTop: 7, fontSize: 15},
              ]}>
              {doctor.specialization}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <Image
                source={require('../images/rating.png')}
                style={{height: 25, width: 25, marginRight: 4}}
              />
              <Text
                style={[
                  globalStyles.cardsubHeading,
                  {color: '#A9A9A9', fontSize: 15},
                ]}>
                {doctor.rating}
              </Text>
              <Image
                source={require('../images/work.png')}
                style={{height: 25, width: 25, marginRight: 4, marginLeft: 20}}
              />
              <Text
                style={[
                  globalStyles.cardsubHeading,
                  {color: '#A9A9A9', fontSize: 15},
                ]}>
                {doctor.experience} years
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginLeft: -8,
          }}>
          <Button
            icon={require('../images/videocall.png')}
            onPress={() =>
              navigation.navigate('Appointment', {
                doctor,
                online: false,
                appointmentType: 'Online',
              })
            }
            title="Video Consultation"
            style={{
              backgroundColor: '#fff',
              borderColor: '#0383d1',
              marginRight: 8,
            }}
          />
          <Button
            onPress={() =>
              navigation.navigate('Appointment', {
                doctor,
                online: true,
                appointmentType: 'In-person',
              })
            }
            title="Book Appoinment"
            style={{
              backgroundColor: '#128C7E',
              borderColor: '#0383d1',
              color: '#fff',
              fontWeight: '500',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const doctorCard = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(181, 222, 255, 0.25)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0,
    shadowRadius: 2.5,
    elevation: 10,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  imageContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 10,
    height: 92,
    width: 95,
    borderRadius: 45,
    overflow: 'hidden',
  },
});
