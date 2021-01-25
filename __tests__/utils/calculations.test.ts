import {calculatePercent} from 'KrakenFutures/src/utils/calculations';

describe('calculate percent function', () => {
  it('testing it without parameters', () => {
    expect(calculatePercent()).not.toBeUndefined();
    expect(calculatePercent()).toBe(0);
  });

  it('testing it with wrong parameters', () => {
    expect(calculatePercent('blabla')).toBe(0);
    expect(calculatePercent('20xx')).toBe(0);
    expect(calculatePercent('cs', 'cs')).toBe(0);
  });

  it('testing it with correct parameters to calculate percentage', () => {
    expect(calculatePercent(70, 100)).toBe(70);
    expect(calculatePercent(74.3, 200)).toBe(37.15);
  });
});
