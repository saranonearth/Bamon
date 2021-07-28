import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Reducer from './app/Store/Reducer';
import Store from './app/Store/Store';
import Home from './app/Home/index';
import Profile from './app/profile/index';
import UI from './app/constants/UI';
import Fund from './app/fund/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import Signup from './app/Auth/Signup';
import Signin from './app/Auth/Signin';
import Details from './app/Home/Details';
import BamScreen from './app/Home/BamScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: UI.DARK_GREY,
      keyboardHidesTabBar: true,
      style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 15,
        ...styles.shadow,
      },
      labelStyle: {
        fontSize: 12,
        marginBottom: 15,
        fontWeight: UI.FONT_WEIGHT_MEDIUM,
      },
    }}
    initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Icon
              name="home"
              size={25}
              color={focused ? UI.DARK_GREY : UI.GREY}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Fund"
      component={Fund}
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              backgroundColor: UI.APP_COLOR,
              width: 70,
              height: 70,
              borderRadius: 100,
              marginTop: -40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="plus" color={'#fff'} size={22} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Icon
              name="user"
              size={25}
              color={focused ? UI.DARK_GREY : UI.GREY}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={'Signin'} component={Signin} />
    <Stack.Screen name={'Signup'} component={Signup} />
  </Stack.Navigator>
);

const App = () => {
  const initialState = React.useContext(Store);
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  return (
    //@ts-ignore
    <Store.Provider value={{state, dispatch}}>
      {true ? (
        <NavigationContainer>
          {false ? (
            <AuthStack />
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={TabNav} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="BamScreen" component={BamScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <View>
          <Text>SplashScreen</Text>
        </View>
      )}
    </Store.Provider>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;
