import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import UI from '../constants/UI';
import {Text as Texti} from 'react-native-elements';

import Store from '../Store/Store';

const PocketCompoment = ({payback, data, handleBamPress}) => (
  <View style={styles.pocketContainer}>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={styles.rect}></View>
      <View>
        <Text style={{fontWeight: '700', fontSize: 16}}>
          {data.pocket_name}
        </Text>
        {payback ? (
          <Text>Pending amount: ₹{data.available}</Text>
        ) : (
          <Text>Available: ₹{data.available}</Text>
        )}
      </View>
    </View>

    <View>
      <TouchableOpacity onPress={handleBamPress} style={styles.bamButtonMain}>
        <Text style={{color: '#fff'}}>{payback ? 'Pay back' : 'Bam'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Profile({navigation}) {
  const {_, dispatch} = React.useContext(Store);

  function handleBamPress() {
    navigation.navigate('BamScreen', {
      otherParam: {
        payback_mode: true,
      },
    });
  }

  function handleLogout() {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <Image
              style={styles.avatar}
              source={require('../assets/image.jpeg')}
            />
            <Text style={styles.name}>Hey, Saran</Text>
            <Text style={{color: '#fff'}}>Account Balance</Text>
            <Text style={{color: '#fff', marginBottom: 10}}>₹200.00</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity style={styles.bamButton}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Add Funds
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.bamButton2}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.holder}>
        <Texti h3 style={{margin: 15}}>
          Pay back
        </Texti>
        <View style={{marginHorizontal: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flexGrow: 1}}
            data={[{id: 'XVDNGJ', pocket_name: 'Piggy Pong', available: '200'}]}
            keyExtractor={m => Math.random().toString()}
            renderItem={({item}) => (
              <PocketCompoment
                payback={true}
                data={item}
                handleBamPress={handleBamPress}
              />
            )}
          />
        </View>
        <Texti h3 style={{margin: 15}}>
          Your Pockets
        </Texti>
        <View style={{marginHorizontal: 20}}>
          <Text style={{textAlign: 'center'}}>You dont have any pockets</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI.APP_COLOR,
    flex: 1,
    flexDirection: 'column',
  },
  headerCard: {
    height: '30%',
  },
  holder: {
    backgroundColor: '#FFF',
    height: '70%',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    color: '#96e4d7',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: -40,
  },
  value: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  pocketContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginVertical: 12,
  },
  bamButtonMain: {
    backgroundColor: UI.APP_COLOR,
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  bamButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  bamButton2: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 16,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  rect: {
    backgroundColor: UI.APP_COLOR,
    height: 40,
    width: 6,
    borderRadius: 5,
    marginRight: 5,
  },
});
