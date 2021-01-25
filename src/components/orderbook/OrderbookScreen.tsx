import React, {useEffect, useState, SyntheticEvent, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useDispatch, batch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  orderbookSnapshot,
  orderbookUpdate,
  WebsocketItemState,
} from 'KrakenFutures/src/reducers/orderbookReducer';
import {COLORS} from 'KrakenFutures/src/constants/colors';
import BidsList from 'KrakenFutures/src/components/orderbook/BidsList';
import AsksList from 'KrakenFutures/src/components/orderbook/AsksList';
import {
  IN_MEMORY_ITEMS,
  BATCH_SIZE,
  WSS_OPEN_MESSAGE,
  WSS_URL,
} from 'KrakenFutures/src/constants/config';

let cachedWebsocketItems: Array<WebsocketItemState> = [];

interface MessageEvent extends SyntheticEvent {
  data: string;
}

const OrderbookScreen = () => {
  const rws = new ReconnectingWebSocket(WSS_URL);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const dispatch = useDispatch();

  const socketMessageListener = useCallback(
    (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.feed === 'book_snapshot' && data.asks && data.bids) {
        dispatch(
          orderbookSnapshot({
            asks: data.asks.slice(0, IN_MEMORY_ITEMS),
            bids: data.bids.slice(0, IN_MEMORY_ITEMS),
          }),
        );
      } else if (data.feed === 'book') {
        cachedWebsocketItems.push(data);
        if (cachedWebsocketItems.length === BATCH_SIZE) {
          batch(() => {
            cachedWebsocketItems.forEach((item) =>
              dispatch(orderbookUpdate(item)),
            );
          });
          cachedWebsocketItems = [];
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isConnected) {
      rws.addEventListener('open', () => {
        rws.send(WSS_OPEN_MESSAGE);
      });
      rws.addEventListener('message', socketMessageListener);
    } else {
      rws.removeEventListener('message', socketMessageListener);
    }
  }, [isConnected, socketMessageListener, rws]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      rws.removeEventListener('message', socketMessageListener);
      unsubscribe();
    };
  }, [socketMessageListener, rws]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.priceInput}
        onChangeText={(text) => setSelectedPrice(Number(text))}
        value={selectedPrice.toString()}
        defaultValue={selectedPrice.toString()}
      />

      {isConnected ? (
        <View style={styles.table}>
          <View style={styles.halfTableContainer}>
            <View style={styles.header}>
              <Text style={styles.th}>TOTAL</Text>
              <Text style={styles.th}>PRICE</Text>
            </View>
            <BidsList {...{setSelectedPrice}} />
          </View>

          <View style={styles.halfTableContainer}>
            <View style={styles.header}>
              <Text style={styles.th}>PRICE</Text>
              <Text style={styles.th}>TOTAL</Text>
            </View>
            <AsksList {...{setSelectedPrice}} />
          </View>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={COLORS.BLUE}
          style={styles.loader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.DARK_BLUE,
  },
  table: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BLUE,
    marginTop: 10,
    paddingBottom: 10,
  },
  halfTableContainer: {
    marginTop: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  th: {
    flex: 1,
    color: COLORS.BLUE,
    fontWeight: '700',
  },
  priceInput: {
    height: 40,
    backgroundColor: COLORS.LIGHT_VIOLET,
    borderColor: COLORS.BLUE,
    borderRadius: 5,
    paddingLeft: 15,
    borderWidth: 1,
    color: COLORS.WHITE,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default OrderbookScreen;
