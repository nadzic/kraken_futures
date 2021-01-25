import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import {RootState} from 'KrakenFutures/src/utils/store';
import {
  IN_FLATLIST_ITEMS,
  IN_MEMORY_ITEMS,
} from 'KrakenFutures/src/constants/config';

enum SideTypes {
  BUY = 'buy',
  SELL = 'sell',
}

interface ItemState {
  price: number;
  qty: number;
}

export interface WebsocketItemState extends ItemState {
  feed: string;
  product_id: string;
  side: string;
  seq: number;
  timestamp: Date;
}

interface OrderbookState {
  asks: Array<ItemState>;
  bids: Array<ItemState>;
}

interface OrderbookSnapshotPayloadActionState extends OrderbookState {}
interface OrderbookUpdtePayloadActionState extends WebsocketItemState {}

const initialState: OrderbookState = {
  asks: [],
  bids: [],
};

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    orderbookSnapshot: (
      state: OrderbookState,
      action: PayloadAction<OrderbookSnapshotPayloadActionState>,
    ) => {
      state.asks = [...action.payload.asks];
      state.bids = [...action.payload.bids];
    },
    orderbookUpdate: (
      state: OrderbookState,
      action: PayloadAction<OrderbookUpdtePayloadActionState>,
    ) => {
      const {price, qty, side} = action.payload;

      const arrayToUpdate =
        side === SideTypes.SELL ? [...state.asks] : [...state.bids];

      const index = arrayToUpdate.findIndex((order: any) => {
        if (side === SideTypes.BUY) {
          return order.price <= price;
        }
        return order.price >= price;
      });

      if (arrayToUpdate[index] && arrayToUpdate[index].price === price) {
        if (qty > 0) {
          arrayToUpdate[index].qty = qty;
        } else {
          arrayToUpdate.splice(index, 1);
        }
      } else {
        if (qty > 0 && arrayToUpdate.length < IN_MEMORY_ITEMS) {
          arrayToUpdate.splice(index, 0, {price, qty});
        }
      }

      state.asks = side === SideTypes.SELL ? arrayToUpdate : state.asks;
      state.bids = side === SideTypes.BUY ? arrayToUpdate : state.bids;
    },
  },
});

export const {orderbookSnapshot, orderbookUpdate} = orderbookSlice.actions;

const selectAsks = (state: RootState) =>
  state.orderbook.asks.slice(0, IN_FLATLIST_ITEMS);
const selectBids = (state: RootState) =>
  state.orderbook.bids.slice(0, IN_FLATLIST_ITEMS);

export const selectAsksAccumulative = createSelector(selectAsks, (asks) =>
  asks.map((elem: ItemState, index: number) =>
    asks.slice(0, index + 1).reduce((a: ItemState, b: ItemState) => ({
      price: b.price,
      qty: a.qty + b.qty,
    })),
  ),
);
export const selectBidsAccumulative = createSelector(selectBids, (bids) =>
  bids.map((elem: ItemState, index: number) =>
    bids.slice(0, index + 1).reduce((a: ItemState, b: ItemState) => ({
      price: b.price,
      qty: a.qty + b.qty,
    })),
  ),
);

export const selectMaxAccumulative = createSelector(
  selectAsksAccumulative,
  selectBidsAccumulative,
  (asksAccumulative, bidsAccumulative) =>
    asksAccumulative.length > 0 && bidsAccumulative.length > 0
      ? Math.max(
          asksAccumulative[asksAccumulative.length - 1].qty,
          bidsAccumulative[bidsAccumulative.length - 1].qty,
        )
      : 0,
);

export default orderbookSlice.reducer;
