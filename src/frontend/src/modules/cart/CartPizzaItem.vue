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
          <li>{{ sizeName }}, {{ doughName }}</li>
          <li>Соус: {{ sauceName }}</li>
          <li>Начинка: {{ ingredientNames }}</li>
        </ul>
      </div>
    </div>

    <PlusMinus
      :value="item.amount"
      @plus="onPlus"
      @minus="onMinus"
      :min="0"
      :max="10"
      type="orange"
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="onEditPizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import PlusMinus from "@/common/components/PlusMinus";
export default {
  name: "CartPizzaItem",
  components: { PlusMinus },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredientNames() {
      return this.item.ingredients
        .map((ingredient) => {
          return this.$store.getters["Public/ingredientById"](ingredient.id)
            ?.name;
        })
        .join(", ");
    },
    price() {
      return this.$store.getters["Public/pizzaPrice"](this.item);
    },
    sauceName() {
      return this.$store.getters["Public/sauceById"](this.item.sauceId)?.name;
    },
    sizeName() {
      return this.$store.getters["Public/sizeById"](this.item.sizeId)?.name;
    },
    doughName() {
      return this.$store.getters["Public/doughById"](this.item.doughId)?.name;
    },
  },
  methods: {
    onMinus() {
      this.$store.commit("Cart/pizzaRemove", this.item);
    },
    onPlus() {
      this.$store.commit("Cart/pizzaAdd", this.item);
    },
    onEditPizza() {
      this.$store.dispatch("Builder/editPizza", this.item);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
