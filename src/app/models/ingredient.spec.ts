import Ingredient from './ingredient';

describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(new Ingredient(1, "tomate")).toBeTruthy();
  });
});
