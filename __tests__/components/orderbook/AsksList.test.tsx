import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AskItem} from 'KrakenFutures/src/components/orderbook/AsksList';

jest.mock('@react-native-community/netinfo', () => {});
jest.mock('reconnecting-websocket', () => jest.fn(() => {}));

test('Test bid item existance of text, touchableopacity click check, checking bar styles', () => {
  const width = 80.0;
  const onPress = jest.fn();
  const item = {
    price: 12312,
    qty: 221321,
  };

  const {getByTestId, getByText} = render(
    <AskItem {...{onPress, item, width}} />,
  );

  const touchableElm = getByTestId('item-press');
  fireEvent.press(touchableElm);
  fireEvent.press(touchableElm);

  const percentageBar = getByTestId('percentage-bar');

  expect(getByText('12,312.00')).toBeDefined();
  expect(getByText('221,321')).toBeDefined();
  expect(percentageBar).toHaveStyle({ width: '80%' });
  expect(onPress).toHaveBeenCalledTimes(2);
});

// NOTE: I did not test other components except those two smaller, becuase I just wanted that you see how I am testing components.
