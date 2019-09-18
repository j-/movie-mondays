import { parseSessionTime, parseFilmTitle } from './parse';

describe('parseSessionTime()', () => {
  it('handles "0:00am"', () => {
    expect(parseSessionTime({ time: '0:00am' })).toEqual({ time: 0 });
  });
  it('handles "12:00am"', () => {
    expect(parseSessionTime({ time: '12:00am' })).toEqual({ time: 0 });
  });
  it('handles "10:20am"', () => {
    expect(parseSessionTime({ time: '10:20am' })).toEqual({ time: 1020 });
  });
  it('handles "1:10pm"', () => {
    expect(parseSessionTime({ time: '1:10pm' })).toEqual({ time: 1310 });
  });
  it('handles "8:45pm"', () => {
    expect(parseSessionTime({ time: '8:45pm' })).toEqual({ time: 2045 });
  });
});

describe('parseFilmTitle()', () => {
  it('handles "Palm Beach(M) - 97 MIN"', () => {
    expect(parseFilmTitle({ title: 'Palm Beach(M) - 97 MIN' })).toEqual({
      title: 'Palm Beach',
      rating: 'M',
      runtimeMinutes: 97,
    });
  });

  it('handles "IT: Chapter 2 (MA15+) - 169 MIN"', () => {
    expect(parseFilmTitle({ title: 'IT: Chapter 2 (MA15+) - 169 MIN' })).toEqual({
      title: 'IT: Chapter 2',
      rating: 'MA15+',
      runtimeMinutes: 169,
    });
  });

  it('handles "Once Upon a Time in Hollywood (MA15+) - 161 MIN"', () => {
    expect(parseFilmTitle({ title: 'Once Upon a Time in Hollywood (MA15+) - 161 MIN' })).toEqual({
      title: 'Once Upon a Time in Hollywood',
      rating: 'MA15+',
      runtimeMinutes: 161,
    });
  });

  it('handles "Once Upon a Time in Hollywood (MA15+) - 161\n                    MIN"', () => {
    expect(parseFilmTitle({ title: 'Once Upon a Time in Hollywood (MA15+) - 161\n                    MIN' })).toEqual({
      title: 'Once Upon a Time in Hollywood',
      rating: 'MA15+',
      runtimeMinutes: 161,
    });
  });

  it('handles "Roger Waters  Us & Them(CTC) - 135 MIN"', () => {
    expect(parseFilmTitle({ title: 'Roger Waters  Us & Them(CTC) - 135 MIN' })).toEqual({
      title: 'Roger Waters Us & Them',
      rating: 'CTC',
      runtimeMinutes: 135,
    });
  });

  it('handles "The Goldfinch (CTC)"', () => {
    expect(parseFilmTitle({ title: 'The Goldfinch (CTC)' })).toEqual({
      title: 'The Goldfinch',
      rating: 'CTC',
      runtimeMinutes: null,
    });
  });

  it('handles "LIFF19 The Mayor: Italian Politics 4 Dummies (15+) - 90 MIN"', () => {
    expect(parseFilmTitle({ title: 'LIFF19 The Mayor: Italian Politics 4 Dummies (15+) - 90 MIN' })).toEqual({
      title: 'LIFF19 The Mayor: Italian Politics 4 Dummies',
      rating: '15+',
      runtimeMinutes: 90,
    });
  });

  it('handles "LIFF19 Loro (Director\'s Cut)(CTC) - 223 MIN"', () => {
    expect(parseFilmTitle({ title: 'LIFF19 Loro (Director\'s Cut)(CTC) - 223 MIN' })).toEqual({
      title: 'LIFF19 Loro (Director\'s Cut)',
      rating: 'CTC',
      runtimeMinutes: 223,
    });
  });
});
