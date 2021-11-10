<template>
  <div>
    <Header :cart="cart" />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :dough="dough"
            :selected-dough="selectedDough"
            @change="onDoughChange"
          />

          <BuilderSizeSelector
            :sizes="sizes"
            :selected-size="selectedSize"
            @change="onSizeChange"
          />

          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            :selected-sauce="selectedSauce"
            @sauceChange="onSauceChange"
            @ingredientAdd="onIngredientAdd"
            @ingredientRemove="onIngredientRemove"
          />

          <BuilderPizzaView
            :ingredients="ingredients"
            :total-price="totalPrice"
            :selected-sauce="selectedSauce"
            :selected-dough="selectedDough"
            :pizza-name="pizzaName"
            @pizzaNameInput="(v) => (pizzaName = v)"
            @addToCart="onAddToCart"
            @ingredientAdd="onIngredientAddById"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import pizzaData from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import Header from "@/common/components/Header";
import { INGREDIENT_MAX_AMOUNT } from "@/common/constants";

export default {
  name: "Index",
  components: {
    Header,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data() {
    const dough = pizzaData.dough;
    const sizes = pizzaData.sizes;
    const sauces = pizzaData.sauces;
    const ingredients = pizzaData.ingredients.map((item) => {
      const match = item.image.match(/(\w+).svg/);
      const nameEn = match?.[1] ?? "";
      return {
        ...item,
        nameEn,
        amount: 0,
      };
    });
    return {
      dough,
      sizes,
      ingredients,
      sauces,
      selectedDough: dough[0],
      selectedSize: sizes[0],
      selectedSauce: sauces[0],
      pizzaName: "",
      cart: [],
    };
  },
  computed: {
    ingredientsPrice() {
      return this.ingredients.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    totalPrice() {
      return (
        this.selectedSize.multiplier *
        (this.selectedDough.price +
          this.selectedSauce.price +
          this.ingredientsPrice)
      );
    },
  },
  methods: {
    onDoughChange(doughItem) {
      this.selectedDough = doughItem;
    },
    onSizeChange(size) {
      this.selectedSize = size;
    },
    onSauceChange(sauce) {
      this.selectedSauce = sauce;
    },
    onIngredientAdd(item) {
      item.amount++;
    },
    onIngredientRemove(item) {
      item.amount--;
    },
    onIngredientAddById(id) {
      const ingredient = this.ingredients.find((item) => item.id === id);
      if (ingredient.amount < INGREDIENT_MAX_AMOUNT) {
        ingredient.amount++;
      }
    },
    onAddToCart() {
      const pizzaIngredients = this.ingredients
        .filter((item) => item.amount > 0)
        .map((item) => {
          return {
            id: item.id,
            amount: item.amount,
            price: item.price,
          };
        });

      const pizza = {
        name: this.pizzaName,
        dough: {
          id: this.selectedDough.id,
          price: this.selectedDough.price,
        },
        size: {
          id: this.selectedSize.id,
          multiplier: this.selectedSize.multiplier,
        },
        sauce: {
          id: this.selectedSauce.id,
          price: this.selectedSauce.price,
        },
        ingredients: pizzaIngredients,
      };
      this.cart.push(pizza);
      this.resetState();
    },
    resetState() {
      this.selectedDough = pizzaData.dough[0];
      this.selectedSize = pizzaData.sizes[0];
      this.selectedSauce = pizzaData.sauces[0];
      this.pizzaName = "";
      this.ingredients.forEach((item) => {
        item.amount = 0;
      });
    },
  },
};
</script>

<style></style>
