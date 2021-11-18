<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizza.size.name }}, {{ doughName }}</li>
          <li>Соус: {{ sauceName }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ price }} ₽</p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderItemPizza",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Cart", ["pizzaPrice"]),
    doughName() {
      return this.pizza.dough?.name?.toLowerCase();
    },
    sauceName() {
      return this.pizza.sauce?.name?.toLowerCase();
    },
    price() {
      return this.pizzaPrice(this.pizza);
    },
    ingredients() {
      return this.pizza.ingredients
        .map((item) => item?.name?.toLowerCase())
        .join(", ");
    },
  },
};
</script>
