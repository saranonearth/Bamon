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

const PocketCompoment = ({data, handleBamPress}) => (
  <View style={styles.pocketContainer}>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={styles.rect}></View>
      <View>
        <Text style={{fontWeight: '700', fontSize: 16}}>
          {data.pocket_name}
        </Text>
        <Text>Available: ₹{data.available}</Text>
      </View>
    </View>

    <View>
      <TouchableOpacity onPress={handleBamPress} style={styles.bamButton}>
        <Text style={{color: '#fff'}}>Bam</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Home({navigation}) {
  const [bamToggle, setBamToggle] = React.useState(true);

  function handleBamPress() {
    navigation.navigate('BamScreen', {
      otherParam: {
        payback_mode: false,
      },
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerContainer}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.name}>Hey, Saran</Text>
            </View>
            <View>
              <Image
                style={styles.avatar}
                source={require('../assets/image.jpeg')}
              />
            </View>
          </View>
          <View style={styles.left}>
            <TouchableWithoutFeedback onPress={() => setBamToggle(!bamToggle)}>
              <View>
                {bamToggle ? (
                  <>
                    <Text style={styles.text}>You've Bammed In</Text>
                    <Text style={styles.value}>₹200.00</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.text}>You've Bammed Out</Text>
                    <Text style={styles.value}>₹0.00</Text>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={styles.holder}>
        <Texti h2 style={{margin: 15}}>
          Pockets
        </Texti>
        <View style={{marginHorizontal: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flexGrow: 1}}
            data={[
              {id: 'XVDNGJ', pocket_name: 'Piggy Pong', available: '1300'},
              {id: 'XVDNGXJ', pocket_name: `Dhruv's Pocket`, available: '700'},
            ]}
            keyExtractor={m => Math.random().toString()}
            renderItem={({item}) => (
              <PocketCompoment data={item} handleBamPress={handleBamPress} />
            )}
          />
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
    fontSize: 16,
    fontWeight: '600',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
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
    width: 30,
    height: 30,
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
  bamButton: {
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
  rect: {
    backgroundColor: UI.APP_COLOR,
    height: 40,
    width: 6,
    borderRadius: 5,
    marginRight: 5,
  },
});
