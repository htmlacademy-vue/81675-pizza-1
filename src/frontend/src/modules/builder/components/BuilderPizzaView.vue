<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizzaName"
        @input="onPizzaNameChange"
      />
    </label>

    <AppDrop @drop="onDrop">
      <div class="content__constructor">
        <div class="pizza" :class="pizzaClass">
          <div class="pizza__wrapper">
            <div
              v-for="item in ingredientClasses"
              :key="item"
              class="pizza__filling"
              :class="item"
            ></div>
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="!isPizzaReady"
        @click="onAddToCart"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapState, mapGetters } from "vuex";
export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapState("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedSize",
      "ingredients",
      "pizzaName",
      "pizzaAmount",
    ]),
    ...mapGetters("Builder", ["totalPrice"]),
    doughClassName() {
      return this.selectedDough.value === "large" ? "big" : "small";
    },
    pizzaClass() {
      return `pizza--foundation--${this.doughClassName}-${this.selectedSauce.value}`;
    },
    ingredientClasses() {
      return this.ingredients
        .filter((item) => item.amount > 0)
        .map((item) => {
          const classes = [`pizza__filling--${item.nameEn}`];
          if (item.amount === 2) classes.push("pizza__filling--second");
          if (item.amount === 3) classes.push("pizza__filling--third");
          return classes.join(" ");
        });
    },
    hasAnIngredient() {
      return this.ingredients.some((item) => item.amount > 0);
    },
    isPizzaReady() {
      return this.pizzaName && this.hasAnIngredient;
    },
  },
  methods: {
    onDrop(ingredient) {
      this.$store.commit("Builder/ingredientAddById", ingredient.id);
    },
    onPizzaNameChange(e) {
      this.$store.commit("Builder/setPizzaName", e.target.value);
    },
    onAddToCart() {
      const pizzaIngredients = this.ingredients
        .filter((item) => item.amount > 0)
        .map((item) => {
          return {
            id: item.id,
            amount: item.amount,
            price: item.price,
            name: item.name,
          };
        });

      const pizza = {
        name: this.pizzaName,
        dough: {
          id: this.selectedDough.id,
          name: this.selectedDough.name,
          price: this.selectedDough.price,
        },
        size: {
          id: this.selectedSize.id,
          name: this.selectedSize.name,
          multiplier: this.selectedSize.multiplier,
        },
        sauce: {
          id: this.selectedSauce.id,
          name: this.selectedSauce.name,
          price: this.selectedSauce.price,
        },
        ingredients: pizzaIngredients,
        amount: this.pizzaAmount,
      };
      this.$store.commit("Cart/addToCart", pizza);
      this.$store.commit("Builder/resetState");
    },
  },
};
</script>
