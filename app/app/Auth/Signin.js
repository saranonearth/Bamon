import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import UI from '../constants/UI';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Store from '../Store/Store';
export default function Signin({navigation}) {
  const {state, dispatch} = React.useContext(Store);
  function handleLoginPress() {
    console.log('Login Clicked');
    dispatch({
      type: 'LOGIN',
      payload: null,
    });
  }

  function handleNewSignUp() {
    console.log('clicked handle new signup');
    navigation.navigate('Signup');
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.round}></View>
        <Text style={styles.brand}>
          Bam<Text style={{fontWeight: 'bold'}}>ON</Text>
        </Text>
      </View>

      <View style={styles.bottom}>
        <Input
          inputContainerStyle={styles.inputStyle}
          placeholder="Email"
          leftIcon={<Icon name="user" size={15} color={UI.GREY} />}
        />
        <Input
          inputContainerStyle={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={15} color={UI.GREY} />}
        />
        <Button
          onPress={handleLoginPress}
          buttonStyle={{backgroundColor: UI.APP_COLOR, marginHorizontal: 10}}
          title="Login"
        />
        <TouchableOpacity onPress={handleNewSignUp} style={styles.center}>
          <Text style={styles.newcta}>New? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 35,
    flexDirection: 'column',
  },
  top: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    marginBottom: 20,
  },
  brand: {
    color: UI.APP_COLOR,
    fontSize: 40,
  },
  inputStyle: {
    borderColor: UI.GREY,
    borderRadius: 10,
    padding: 10,
    height: 50,
    width: '100%',
    margin: 0,
    borderWidth: 1,
  },
  round: {
    width: 30,
    height: 30,
    backgroundColor: UI.APP_COLOR,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  newcta: {},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
