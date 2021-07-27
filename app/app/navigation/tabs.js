import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Home/index';
import Profile from '../profile/index';
import Fund from '../fund/index';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AddFund" component={Fund} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
