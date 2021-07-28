import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../constants/UI';

export default function BamScreen({navigation}) {
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
        <Text style={styles.infoText}>You will be</Text>
        <Text style={styles.infoText}>bamming in.</Text>
        <Text style={styles.subText}>Available in this Pocket: ₹200.00</Text>
        <Input
          containerStyle={{marginTop: 20}}
          inputContainerStyle={styles.amountInput}
          placeholder="0"
          inputStyle={{fontSize: 30, fontWeight: 'bold34'}}
          leftIcon={
            <Text style={{fontSize: 40, color: UI.GREY, marginTop: -5}}>₹</Text>
          }
        />
      </View>
      <View style={styles.subContianer}>
        <View
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            marginRight: 20,
            width: '80%',
            marginBottom: 20,
          }}>
          <TouchableOpacity>
            <Text>Bam</Text>
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
    justifyContent: 'space-between',
  },
  content: {
    height: '60%',
    display: 'flex',
    alignContent: 'center',
    marginHorizontal: 24,
    justifyContent: 'center',
  },
  subContianer: {
    height: '30%',
    backgroundColor: UI.APP_COLOR,
    borderTopLeftRadius: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
});
