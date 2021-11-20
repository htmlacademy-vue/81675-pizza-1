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
import _ from "lodash";
export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapState("Builder", ["selectedIngredients", "pizzaName", "pizzaAmount"]),
    ...mapGetters("Builder", [
      "totalPrice",
      "pizzaObj",
      "selectedDough",
      "selectedSauce",
    ]),
    ...mapGetters("Public", ["ingredientById"]),
    doughClassName() {
      return this.selectedDough?.value === "large" ? "big" : "small";
    },
    pizzaClass() {
      return `pizza--foundation--${this.doughClassName}-${this.selectedSauce.value}`;
    },
    ingredientClasses() {
      return this.selectedIngredients.map((item) => {
        const ingredientData = this.ingredientById(item.id);
        const classes = [`pizza__filling--${ingredientData.nameEn}`];
        if (item.amount === 2) classes.push("pizza__filling--second");
        if (item.amount === 3) classes.push("pizza__filling--third");
        return classes.join(" ");
      });
    },
    hasAnIngredient() {
      return this.selectedIngredients.length > 0;
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
      const pizza = _.cloneDeep(this.pizzaObj);
      if (!pizza.id) pizza.id = _.uniqueId();
      this.$store.commit("Cart/addToCart", pizza);
      this.$store.dispatch("Builder/resetState");
    },
  },
};
</script>
