import { sortTitle } from './sort';

describe('sortTitle()', () => {
  it('puts "A" before "B"', () => {
    const result = ['B', 'A'].sort(sortTitle);
    expect(result).toEqual(['A', 'B']);
  });

  it('puts "A", "The B" and "C" in order', () => {
    const result = ['C', 'The B', 'A'].sort(sortTitle);
    expect(result).toEqual(['A', 'The B', 'C']);
  });
});
