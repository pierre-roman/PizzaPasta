import Pizza from './pizza';

describe('Pizza', () => {
  it('should create an instance', () => {
    expect(new Pizza(1, "royale", "fdggf", 10.50, [1, 2])).toBeTruthy();
  });
});
