import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import UI from '../constants/UI';

export default function Fund({navigation}) {
  function handleCreate() {
    navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 10, marginTop: 12}}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-back"
          size={30}
          color="#3d3a3a"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>Create a</Text>
        <Text style={styles.infoText}>Bam Pocket</Text>
        <Text style={styles.subText}>Max Limit ₹20,000.00</Text>
        <Input
          label="Pocket Name"
          containerStyle={{marginTop: 20, marginLeft: -10}}
          inputContainerStyle={styles.amountInput}
          placeholder="My pocket"
          inputStyle={{fontSize: 30, fontWeight: 'bold'}}
        />
        <Input
          keyboardType={'numeric'}
          inputContainerStyle={styles.amountInput}
          placeholder="0"
          inputStyle={{fontSize: 30, fontWeight: 'bold'}}
          leftIcon={
            <Text style={{fontSize: 40, color: UI.GREY, marginTop: -5}}>₹</Text>
          }
        />
        <View
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            marginRight: 20,
            width: '80%',
            marginBottom: 100,
          }}>
          <TouchableOpacity onPress={handleCreate} style={styles.bamButton}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Create
              <Icon2 size={15} name="chevron-right" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    height: '60%',
    display: 'flex',
    alignContent: 'center',
    marginHorizontal: 24,
    justifyContent: 'center',
    marginTop: 140,
  },
  subContianer: {
    height: '30%',
    backgroundColor: UI.APP_COLOR,
    borderTopLeftRadius: 60,
    display: 'flex',
    flexDirection: 'column',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#636363',
    marginTop: -10,
  },
  subText: {
    color: UI.GREY,
  },
  amountInput: {
    borderWidth: 0,
    borderBottomColor: '#fff',
  },
  bamButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: -60,
    borderRadius: 16,
    backgroundColor: UI.APP_COLOR,
  },
});
