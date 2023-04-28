class CompositionElement {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
  }
}

class Hamburger {
  static #SIZE_SMALL = new CompositionElement(50, 20);
  static #SIZE_BIG = new CompositionElement(100, 40);
  static #STUFFING_CHEESE = new CompositionElement(10, 20);
  static #STUFFING_SALAD = new CompositionElement(20, 5);
  static #STUFFING_POTATO = new CompositionElement(15, 10);
  static #TOPPING_SAUCE = new CompositionElement(15, 0);
  static #TOPPING_MAYO = new CompositionElement(20, 5);

  static get SIZE_SMALL() {
    return Hamburger.#SIZE_SMALL;
  }
  static get SIZE_BIG() {
    return Hamburger.#SIZE_BIG;
  }
  static get STUFFING_CHEESE() {
    return Hamburger.#STUFFING_CHEESE;
  }
  static get STUFFING_SALAD() {
    return Hamburger.#STUFFING_SALAD;
  }
  static get STUFFING_POTATO() {
    return Hamburger.#STUFFING_POTATO;
  }
  static get TOPPING_SAUCE() {
    return Hamburger.#TOPPING_SAUCE;
  }
  static get TOPPING_MAYO() {
    return Hamburger.#TOPPING_MAYO;
  }

  #size = null;
  #stuff = null;
  #ingredients = [];

  constructor(...args) {
    args.forEach(this.#changeComposition.bind(this));
  }

  #changeComposition(element) {
    switch (element) {
      case Hamburger.#SIZE_SMALL:
      case Hamburger.#SIZE_BIG:
        this.#changeSize(element);
        break;
      case Hamburger.#STUFFING_CHEESE:
      case Hamburger.#STUFFING_SALAD:
      case Hamburger.#STUFFING_POTATO:
        this.#changeStuff(element);
        break;
      default:
        this.addTopping(element);
    }
  }

  #changeSize(size) {
    this.#size = size;
  }

  #changeStuff(stuff) {
    this.#stuff = stuff;
  }

  addTopping(topping) {
    this.#ingredients.push(topping);
  }

  calculate() {
    return (
      this.#size.calories +
      this.#stuff.calories +
      this.#ingredients.reduce(
        (totalCalories, ingredient) => totalCalories + ingredient.calories,
        0
      )
    );
  }

  calculatePrice() {
    return (
      this.#size.price +
      this.#stuff.price +
      this.#ingredients.reduce(
        (totalPrice, ingredient) => totalPrice + ingredient.price,
        0
      )
    );
  }
}

let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

hamburger.addTopping(Hamburger.TOPPING_MAYO);

console.log("CALORIES: " + hamburger.calculate());

console.log("PRICE: " + hamburger.calculatePrice());

hamburger.addTopping(Hamburger.TOPPING_SAUCE);

console.log("PRICE WITH SAUCE:" + hamburger.calculatePrice());
