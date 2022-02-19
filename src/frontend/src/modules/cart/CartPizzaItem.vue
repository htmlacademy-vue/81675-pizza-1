<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="item.name"
      >
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
      :min="0"
      :max="10"
      type="orange"
      @plus="onPlus"
      @minus="onMinus"
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="onEditPizza"
      >
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

<style lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
