import { addTime, subtractTime } from './utils';

describe('addTime()', () => {
  test.each`
    time    | diff   | expected
    ${   0} | ${10}  | ${10}
    ${  50} | ${10}  | ${100}
    ${1000} | ${120} | ${1200}
    ${2300} | ${60}  | ${0}
  `('handles "$time + $diff = $expected"', ({ time, diff, expected }) => {
    expect(addTime(time, diff)).toBe(expected);
  });
});

describe('subtractTime()', () => {
  test.each`
    time    | diff   | expected
    ${1200} | ${10}  | ${1150}
    ${1200} | ${50}  | ${1110}
    ${1200} | ${60}  | ${1100}
    ${1000} | ${120} | ${ 800}
    ${   0} | ${10}  | ${2350}
  `('handles "$time - $diff = $expected"', ({ time, diff, expected }) => {
    expect(subtractTime(time, diff)).toBe(expected);
  });
});
