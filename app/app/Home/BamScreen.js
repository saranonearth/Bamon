import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import UI from '../constants/UI';

export default function BamScreen({route, navigation}) {
  const {otherParam} = route.params;
  const payback_mode = otherParam.payback_mode;

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
        <Text style={styles.infoText}>
          {payback_mode ? 'You will have to' : 'You will be'}
        </Text>
        <Text style={styles.infoText}>
          {payback_mode ? `pay ₹200` : 'bamming out.'}
        </Text>
        <Text style={styles.subText}>
          {payback_mode
            ? 'Pocket: Piggy Pong'
            : 'Available in this Pocket: ₹200.00'}
        </Text>
        {!payback_mode && (
          <Input
            containerStyle={{marginTop: 20}}
            inputContainerStyle={styles.amountInput}
            placeholder="0"
            inputStyle={{fontSize: 30, fontWeight: 'bold34'}}
            leftIcon={
              <Text style={{fontSize: 40, color: UI.GREY, marginTop: -5}}>
                ₹
              </Text>
            }
          />
        )}
      </View>

      <View style={styles.subContianer}>
        <View style={{marginHorizontal: 30, marginBottom: 20}}>
          {!payback_mode && (
            <>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '600',
                  fontSize: 19,
                  color: '#fff',
                }}>
                You will have to pay back
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '600',
                  fontSize: 19,
                  color: '#fff',
                }}>
                ₹200 in next 15 days.
              </Text>
            </>
          )}
        </View>
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
          <TouchableOpacity style={styles.bamButton}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {payback_mode ? 'Pay' : 'Bam'}
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
  bamButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: -30,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
});
