import {formatTwoDecimals} from 'KrakenFutures/src/utils/formatters';

describe('format to two decimals function', () => {
  it('testing it without parameters', () => {
    expect(formatTwoDecimals()).not.toBeUndefined();
    expect(formatTwoDecimals()).toBe('0.00');
  });

  it('testing it with wrong parameters', () => {
    expect(formatTwoDecimals('blabla')).toBe('0.00');
    expect(formatTwoDecimals('20xx')).toBe('0.00');
    expect(formatTwoDecimals('cs', 'cs')).toBe('0.00');
  });

  it('testing it with correct parameters to correctly format numbers', () => {
    expect(formatTwoDecimals(32432423)).toBe('32,432,423.00');
    expect(formatTwoDecimals(1)).toBe('1.00');
  });
});
