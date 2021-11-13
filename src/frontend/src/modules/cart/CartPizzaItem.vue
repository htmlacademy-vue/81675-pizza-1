<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="item.name"
      />
      <div class="product__text">
        <h2>{{ item.name }}</h2>
        <ul>
          <li>{{ item.size.name }}, {{ item.dough.name }}</li>
          <li>Соус: {{ item.sauce.name }}</li>
          <li>Начинка: {{ ingredientNames }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="1" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartPizzaItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredientNames() {
      return this.item.ingredients
        .map((ingredient) => ingredient.name)
        .join(", ");
    },
    price() {
      return this.$store.getters["Cart/pizzaPrice"](this.item);
    },
  },
};
</script>
