import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions, ScrollView} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  Snackbar,
  Surface,
  Chip,
  List,
} from 'react-native-paper';
import {useUserDispatch, useUserState} from '../context/userContext';
import AppBarWrapper from '../components/AppBar';
import {Avatar} from 'react-native-paper';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import {create} from '../services/room';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

function CreateRoom({navigation, socket}) {
  const userDispatch = useUserDispatch();
  const userState = useUserState();
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [emailList, setEmailList] = useState([]);

  const addEmail = email => {
    setEmails(prev => [...prev, email]);
  };

  onRoomAdd = async (values, actions) => {
    try {
      const resp = await create({
        name: values.roomName,
        members: emails,
        createdBy: userState.user.id,
      });
      console.log(resp.data);
      setEmails([]);
      actions.resetForm({
        values: {
          roomName: '',
          email: '',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const toggle = () => {
    navigation?.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <AppBarWrapper
        showButton={false}
        title={'Create Room'}
        onPress={async () => {
          navigation.navigate('Main');
        }}
        showMenu={true}
        onMenuPress={toggle}
      />

      <View style={styles.subCont}>
        <Formik
          initialValues={{email: '', roomName: ''}}
          onSubmit={(values, actions) => {
            onRoomAdd(values, actions);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                position: 'relative',
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <TextInput
                  theme={{roundness: 10}}
                  mode="outlined"
                  label="Add Member's Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                  onSubmitEditing={() => {
                    addEmail(values.email);
                    console.log(values);
                  }}
                  clearButtonMode="while-editing"
                />
                <Text style={styles.errorText}>
                  {touched.email && errors.email}
                </Text>
                <TextInput
                  theme={{roundness: 10}}
                  label="Room Name"
                  mode="outlined"
                  onChangeText={handleChange('roomName')}
                  onBlur={handleBlur('roomName')}
                  value={values.roomName}
                  activeOutlineColor="#05375a"
                  outlineColor="#d9d9d9"
                  style={styles.textInput}
                />
                <Text style={styles.errorText}>
                  {touched.roomName && errors.roomName}
                </Text>
              </View>
              <List.Section title="Members">
                <View style={styles.row}>
                  {emails.map(obj => {
                    console.log(obj, emails);
                    return (
                      <Chip
                        mode="outlined"
                        closeIcon="delete"
                        onClose={() => {
                          const arr = emails.filter(item => item !== obj);
                          setEmails(arr);
                        }}
                        onPress={() => {}}
                        style={styles.chip}>
                        {obj}
                      </Chip>
                    );
                  })}
                </View>
              </List.Section>
              <Surface style={[styles.btnCont]}>
                <Button
                  loading={loading}
                  style={styles.submitBtn}
                  icon="account-check-outline"
                  mode="contained"
                  onPress={handleSubmit}
                  title="Submit">
                  <Text style={styles.button}>Create</Text>
                </Button>
              </Surface>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
  },
  chip: {
    margin: 10,
    height: 35,
    color: '#000',
    backgroundColor: '#25D366',
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
  textInput: {
    color: '#1b1b1b',
    backgroundColor: 'white',
    height: 45,
    fontSize: 15,
  },
  spinnerTextStyle: {
    color: '#128C7E',
  },
  errorText: {
    color: '#E74C3C',
    marginVertical: 2,
    fontSize: 13,
  },
  btnCont: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c9c9c9',
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 239,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
    shadowOffset: {
      width: 0,
      height: -1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  submitBtn: {
    padding: 8.5,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#128C7E',
    alignSelf: 'stretch',
    shadowColor: 'transparent',
  },
  mainCont: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 85,
    width: 50,
    height: 50,
    marginLeft: 20,
    position: 'relative',
  },
  imgCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    backgroundColor: '#FFE194',
    borderRadius: 13,
    position: 'absolute',
    top: 0,
    padding: 6.5,
  },
  imgContin: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#128C7E',
    borderRadius: 25,
  },
  tip: {
    height: 15,
    transform: [{rotate: '45deg'}],
    width: 15,
    backgroundColor: '#FFE194',
    position: 'absolute',
    bottom: -16,
    right: 4,
    zIndex: -1,
  },
  subCont: {
    position: 'relative',
    marginTop: 30,
    height: Dimensions.get('window').height,
  },
  head: {
    fontSize: 25,
    color: '#05375a',
    fontWeight: '600',
    paddingLeft: 20,
    marginBottom: 12,
  },
  subhead: {
    marginBottom: 12,
    paddingLeft: 20,
    fontSize: 15,
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
export default CreateRoom;
