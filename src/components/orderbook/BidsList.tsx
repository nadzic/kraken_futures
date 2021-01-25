import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {
  selectBidsAccumulative,
  selectMaxAccumulative,
} from 'KrakenFutures/src/reducers/orderbookReducer';
import {calculatePercent} from 'KrakenFutures/src/utils/calculations';
import {formatTwoDecimals} from 'KrakenFutures/src/utils/formatters';
import {COLORS} from 'KrakenFutures/src/constants/colors';
import {IN_FLATLIST_ITEMS} from 'KrakenFutures/src/constants/config';

interface Item {
  price: number;
  qty: number;
}

interface BidsListProps {
  setSelectedPrice: (price: number) => void;
}

interface BidItemProps {
  onPress: () => void;
  width: number;
  item: Item;
}

interface RenderBidItemProps {
  item: Item;
}

export const BidItem = ({item, onPress, width}: BidItemProps) => (
  <TouchableOpacity
    style={styles.rowButton}
    onPress={onPress}
    testID="item-press">
    <View
      style={[styles.bidPercentageBar, {width: `${width}%`}]}
      testID="percentage-bar"
    />
    <Text style={styles.qtyItem}>{item.qty.toLocaleString()}</Text>
    <Text style={styles.bidPrice}>{formatTwoDecimals(item.price)}</Text>
  </TouchableOpacity>
);

const BidsList = ({setSelectedPrice}: BidsListProps) => {
  const asksAccumulative = useSelector(selectBidsAccumulative);
  const maxAccumulative = useSelector(selectMaxAccumulative);

  const renderBidItem = ({item}: RenderBidItemProps) => {
    const widthPercent = calculatePercent(item.qty, maxAccumulative);
    return (
      <BidItem
        item={item}
        width={widthPercent}
        onPress={() => setSelectedPrice(item.price)}
      />
    );
  };

  return (
    <FlatList
      data={asksAccumulative}
      scrollEnabled={false}
      renderItem={renderBidItem}
      initialNumToRender={IN_FLATLIST_ITEMS}
      maxToRenderPerBatch={IN_FLATLIST_ITEMS}
      updateCellsBatchingPeriod={100}
      keyExtractor={(item) => `${item.price}`}
    />
  );
};

const styles = StyleSheet.create({
  bidPrice: {
    flex: 1,
    alignItems: 'center',
    color: COLORS.GREEN,
    paddingTop: 5,
    paddingBottom: 5,
  },
  qtyItem: {
    alignItems: 'center',
    flex: 1,
    color: COLORS.WHITE,
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowButton: {
    position: 'relative',
    flexDirection: 'row',
  },
  bidPercentageBar: {
    backgroundColor: COLORS.LIGHT_GREEN,
    right: 0,
    position: 'absolute',
    height: '100%',
  },
});

export default BidsList;
