import orderbookReducer, {
  orderbookSnapshot,
  orderbookUpdate,
} from 'KrakenFutures/src/reducers/orderbookReducer';

const initialState = {
  asks: [],
  bids: [],
};

describe('orderbook reducer', () => {
  it('should handle initial state', () => {
    expect(orderbookReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle get intial snapshot', () => {
    expect(
      orderbookReducer(initialState, {
        type: orderbookSnapshot.type,
        payload: {
          asks: [
            {price: 11596.5, qty: 89064},
            {price: 11597, qty: 77070},
            {price: 11598, qty: 29829},
            {price: 11598.5, qty: 527},
            {price: 11599.5, qty: 18432},
            {price: 11600.5, qty: 49982},
            {price: 11601, qty: 45962},
            {price: 11601.5, qty: 10000},
            {price: 11602, qty: 28593},
            {price: 11602.5, qty: 163392},
          ],
          bids: [
            {price: 11596, qty: 238154},
            {price: 11593.5, qty: 15014},
            {price: 11593, qty: 161755},
            {price: 11592.5, qty: 10050},
            {price: 11592, qty: 89486},
            {price: 11591.5, qty: 50020},
            {price: 11591, qty: 15000},
            {price: 11589.5, qty: 39003},
            {price: 11589, qty: 72047},
            {price: 11588.5, qty: 75000},
          ],
        },
      }),
    ).toEqual({
      asks: [
        {price: 11596.5, qty: 89064},
        {price: 11597, qty: 77070},
        {price: 11598, qty: 29829},
        {price: 11598.5, qty: 527},
        {price: 11599.5, qty: 18432},
        {price: 11600.5, qty: 49982},
        {price: 11601, qty: 45962},
        {price: 11601.5, qty: 10000},
        {price: 11602, qty: 28593},
        {price: 11602.5, qty: 163392},
      ],
      bids: [
        {price: 11596, qty: 238154},
        {price: 11593.5, qty: 15014},
        {price: 11593, qty: 161755},
        {price: 11592.5, qty: 10050},
        {price: 11592, qty: 89486},
        {price: 11591.5, qty: 50020},
        {price: 11591, qty: 15000},
        {price: 11589.5, qty: 39003},
        {price: 11589, qty: 72047},
        {price: 11588.5, qty: 75000},
      ],
    });
    expect(
      orderbookReducer(initialState, {
        type: orderbookSnapshot.type,
        payload: {
          asks: [],
          bids: [],
        },
      }),
    ).toEqual({
      asks: [],
      bids: [],
    });
  });

  it('should handle update quantity in orderbook', () => {
    expect(
      orderbookReducer(
        {
          asks: [
            {price: 11596.5, qty: 89064},
            {price: 11597, qty: 77070},
            {price: 11598, qty: 29829},
            {price: 11598.5, qty: 527},
            {price: 11599.5, qty: 18432},
            {price: 11600.5, qty: 49982},
            {price: 11601, qty: 45962},
            {price: 11601.5, qty: 10000},
            {price: 11602, qty: 28593},
            {price: 11602.5, qty: 163392},
          ],
          bids: [
            {price: 11596, qty: 238154},
            {price: 11593.5, qty: 15014},
            {price: 11593, qty: 161755},
            {price: 11592.5, qty: 10050},
            {price: 11592, qty: 89486},
            {price: 11591.5, qty: 50020},
            {price: 11591, qty: 15000},
            {price: 11589.5, qty: 39003},
            {price: 11589, qty: 72047},
            {price: 11588.5, qty: 75000},
          ],
        },
        {
          type: orderbookUpdate.type,
          payload: {
            feed: 'book',
            price: 11597,
            product_id: 'PI_XBTUSD',
            qty: 80000,
            seq: 41738805,
            side: 'sell',
            timestamp: 1598165812409,
          },
        },
      ),
    ).toEqual({
      asks: [
        {price: 11596.5, qty: 89064},
        {price: 11597, qty: 80000},
        {price: 11598, qty: 29829},
        {price: 11598.5, qty: 527},
        {price: 11599.5, qty: 18432},
        {price: 11600.5, qty: 49982},
        {price: 11601, qty: 45962},
        {price: 11601.5, qty: 10000},
        {price: 11602, qty: 28593},
        {price: 11602.5, qty: 163392},
      ],
      bids: [
        {price: 11596, qty: 238154},
        {price: 11593.5, qty: 15014},
        {price: 11593, qty: 161755},
        {price: 11592.5, qty: 10050},
        {price: 11592, qty: 89486},
        {price: 11591.5, qty: 50020},
        {price: 11591, qty: 15000},
        {price: 11589.5, qty: 39003},
        {price: 11589, qty: 72047},
        {price: 11588.5, qty: 75000},
      ],
    });
  });

  it('should handle delete item from orderbook', () => {
    expect(
      orderbookReducer(
        {
          asks: [
            {price: 11596.5, qty: 89064},
            {price: 11597, qty: 77070},
            {price: 11598, qty: 29829},
            {price: 11598.5, qty: 527},
            {price: 11599.5, qty: 18432},
            {price: 11600.5, qty: 49982},
            {price: 11601, qty: 45962},
            {price: 11601.5, qty: 10000},
            {price: 11602, qty: 28593},
            {price: 11602.5, qty: 163392},
          ],
          bids: [
            {price: 11596, qty: 238154},
            {price: 11593.5, qty: 15014},
            {price: 11593, qty: 161755},
            {price: 11592.5, qty: 10050},
            {price: 11592, qty: 89486},
            {price: 11591.5, qty: 50020},
            {price: 11591, qty: 15000},
            {price: 11589.5, qty: 39003},
            {price: 11589, qty: 72047},
            {price: 11588.5, qty: 75000},
          ],
        },
        {
          type: orderbookUpdate.type,
          payload: {
            feed: 'book',
            price: 11593,
            product_id: 'PI_XBTUSD',
            qty: 0,
            seq: 41738805,
            side: 'buy',
            timestamp: 1598165812409,
          },
        },
      ),
    ).toEqual({
      asks: [
        {price: 11596.5, qty: 89064},
        {price: 11597, qty: 77070},
        {price: 11598, qty: 29829},
        {price: 11598.5, qty: 527},
        {price: 11599.5, qty: 18432},
        {price: 11600.5, qty: 49982},
        {price: 11601, qty: 45962},
        {price: 11601.5, qty: 10000},
        {price: 11602, qty: 28593},
        {price: 11602.5, qty: 163392},
      ],
      bids: [
        {price: 11596, qty: 238154},
        {price: 11593.5, qty: 15014},
        {price: 11592.5, qty: 10050},
        {price: 11592, qty: 89486},
        {price: 11591.5, qty: 50020},
        {price: 11591, qty: 15000},
        {price: 11589.5, qty: 39003},
        {price: 11589, qty: 72047},
        {price: 11588.5, qty: 75000},
      ],
    });
  });

  it('should handle add new item in empty orderbook', () => {
    expect(
      orderbookReducer(initialState, {
        type: orderbookUpdate.type,
        payload: {
          feed: 'book',
          price: 11618,
          product_id: 'PI_XBTUSD',
          qty: 79899,
          seq: 41738805,
          side: 'sell',
          timestamp: 1598165812409,
        },
      }),
    ).toEqual({
      asks: [{price: 11618, qty: 79899}],
      bids: [],
    });
  });

  it('should handle try to add new item (book buy) to orderbook with lowest price and we have already in memory (18 - IN_MEMORY_ITEMS constant), bids should not change and arrays of bids and asks stay the same', () => {
    expect(
      orderbookReducer(
        {
          asks: [
            {price: 11615.5, qty: 82550},
            {price: 11616.5, qty: 20000},
            {price: 11617, qty: 29829},
            {price: 11617.5, qty: 685},
            {price: 11619, qty: 90367},
            {price: 11619.5, qty: 10050},
            {price: 11620, qty: 37602},
            {price: 11620.5, qty: 156000},
            {price: 11621, qty: 61803},
            {price: 11621.5, qty: 27282},
            {price: 11622, qty: 17},
            {price: 11622.5, qty: 137691},
            {price: 11623, qty: 23673},
            {price: 11623.5, qty: 122730},
            {price: 11624, qty: 285890},
            {price: 11624.5, qty: 157034},
            {price: 11625, qty: 144008},
            {price: 11625.5, qty: 326629},
          ],
          bids: [
            {price: 11615, qty: 340191},
            {price: 11614.5, qty: 76053},
            {price: 11614, qty: 20},
            {price: 11613.5, qty: 20},
            {price: 11613, qty: 88862},
            {price: 11612.5, qty: 240},
            {price: 11612, qty: 240},
            {price: 11611.5, qty: 240},
            {price: 11611, qty: 110647},
            {price: 11610.5, qty: 16358},
            {price: 11610, qty: 98703},
            {price: 11609.5, qty: 143962},
            {price: 11609, qty: 230188},
            {price: 11608.5, qty: 10050},
            {price: 11608, qty: 154613},
            {price: 11607.5, qty: 8728},
            {price: 11607, qty: 50036},
            {price: 11606, qty: 34426},
          ],
        },
        {
          type: orderbookUpdate.type,
          payload: {
            feed: 'book',
            price: 11605,
            product_id: 'PI_XBTUSD',
            qty: 23423,
            seq: 41738805,
            side: 'buy',
            timestamp: 1598165812409,
          },
        },
      ),
    ).toEqual({
      asks: [
        {price: 11615.5, qty: 82550},
        {price: 11616.5, qty: 20000},
        {price: 11617, qty: 29829},
        {price: 11617.5, qty: 685},
        {price: 11619, qty: 90367},
        {price: 11619.5, qty: 10050},
        {price: 11620, qty: 37602},
        {price: 11620.5, qty: 156000},
        {price: 11621, qty: 61803},
        {price: 11621.5, qty: 27282},
        {price: 11622, qty: 17},
        {price: 11622.5, qty: 137691},
        {price: 11623, qty: 23673},
        {price: 11623.5, qty: 122730},
        {price: 11624, qty: 285890},
        {price: 11624.5, qty: 157034},
        {price: 11625, qty: 144008},
        {price: 11625.5, qty: 326629},
      ],
      bids: [
        {price: 11615, qty: 340191},
        {price: 11614.5, qty: 76053},
        {price: 11614, qty: 20},
        {price: 11613.5, qty: 20},
        {price: 11613, qty: 88862},
        {price: 11612.5, qty: 240},
        {price: 11612, qty: 240},
        {price: 11611.5, qty: 240},
        {price: 11611, qty: 110647},
        {price: 11610.5, qty: 16358},
        {price: 11610, qty: 98703},
        {price: 11609.5, qty: 143962},
        {price: 11609, qty: 230188},
        {price: 11608.5, qty: 10050},
        {price: 11608, qty: 154613},
        {price: 11607.5, qty: 8728},
        {price: 11607, qty: 50036},
        {price: 11606, qty: 34426},
      ],
    });
  });
});
