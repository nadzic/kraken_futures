import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {
  selectAsksAccumulative,
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

interface AsksListProps {
  setSelectedPrice: (price: number) => void;
}

interface AskItemProps {
  onPress: () => void;
  width: number;
  item: Item;
}

interface RenderAskItemProps {
  item: Item;
}

export const AskItem = ({item, onPress, width}: AskItemProps) => (
  <TouchableOpacity
    style={styles.rowButton}
    onPress={onPress}
    testID="item-press">
    <View
      style={[styles.askPercentageBar, {width: `${width}%`}]}
      testID="percentage-bar"
    />
    <Text style={styles.askPrice}>{formatTwoDecimals(item.price)}</Text>
    <Text style={styles.qtyItem}>{item.qty.toLocaleString()}</Text>
  </TouchableOpacity>
);

const AsksList = ({setSelectedPrice}: AsksListProps) => {
  const asksAccumulative = useSelector(selectAsksAccumulative);
  const maxAccumulative = useSelector(selectMaxAccumulative);

  const renderAskItem = ({item}: RenderAskItemProps) => {
    const widthPercent = calculatePercent(item.qty, maxAccumulative);
    return (
      <AskItem
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
      renderItem={renderAskItem}
      initialNumToRender={IN_FLATLIST_ITEMS}
      maxToRenderPerBatch={IN_FLATLIST_ITEMS}
      updateCellsBatchingPeriod={100}
      keyExtractor={(item) => `${item.price}`}
    />
  );
};

const styles = StyleSheet.create({
  askPrice: {
    flex: 1,
    alignItems: 'center',
    color: COLORS.RED,
    paddingTop: 5,
    paddingBottom: 5,
  },
  qtyItem: {
    flex: 1,
    alignItems: 'center',
    color: COLORS.WHITE,
    paddingTop: 5,
    paddingBottom: 5,
  },
  rowButton: {
    position: 'relative',
    flexDirection: 'row',
  },
  askPercentageBar: {
    backgroundColor: COLORS.LIGHT_RED,
    left: 0,
    position: 'absolute',
    height: '100%',
  },
});

export default AsksList;
