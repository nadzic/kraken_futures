import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import OrderbookScreen from 'KrakenFutures/src/components/orderbook/OrderbookScreen';
import {navigationRef, isReadyRef} from 'KrakenFutures/src/utils/navigation';
import {store} from 'KrakenFutures/src/utils/store';
import {COLORS} from 'KrakenFutures/src/constants/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              color: COLORS.BLUE,
              fontWeight: 'bold',
              alignSelf: 'center',
            },
            headerStyle: {
              backgroundColor: COLORS.DARK_BLUE,
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          initialRouteName="Orderbook">
          <Stack.Screen name="Orderbook" component={OrderbookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
