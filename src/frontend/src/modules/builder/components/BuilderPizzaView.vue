<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

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

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
  },
};
</script>
