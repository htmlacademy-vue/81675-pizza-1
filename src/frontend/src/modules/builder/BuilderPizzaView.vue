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
      >
    </label>

    <AppDrop @drop="onDrop">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="pizzaClass"
        >
          <transition-group
            tag="div"
            name="ingredient"
            class="pizza__wrapper"
          >
            <div
              v-for="item in selectedIngredients"
              :key="item.id"
              class="pizza__filling"
              :class="ingredientClasses(item)"
            />
          </transition-group>
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
    ...mapGetters("Builder", ["totalPrice", "selectedDough", "selectedSauce"]),
    ...mapGetters("Public", ["ingredientById"]),
    doughClassName() {
      return this.selectedDough?.value === "large" ? "big" : "small";
    },
    pizzaClass() {
      return `pizza--foundation--${this.doughClassName}-${this.selectedSauce?.value}`;
    },
    hasAnIngredient() {
      return this.selectedIngredients.length > 0;
    },
    isPizzaReady() {
      return this.pizzaName && this.hasAnIngredient;
    },
  },
  methods: {
    ingredientClasses(item) {
      const ingredientData = this.ingredientById(item.id);
      const classes = [`pizza__filling--${ingredientData?.nameEn}`];
      if (item.amount === 2) classes.push("pizza__filling--second");
      if (item.amount === 3) classes.push("pizza__filling--third");
      return classes.join(" ");
    },
    onDrop(ingredient) {
      this.$store.commit("Builder/ingredientAdd", ingredient.id);
    },
    onPizzaNameChange(e) {
      this.$store.commit("Builder/setState", { pizzaName: e.target.value });
    },
    onAddToCart() {
      const {
        pizzaId,
        pizzaName,
        selectedDoughId,
        selectedSauceId,
        selectedSizeId,
        pizzaAmount,
        selectedIngredients,
      } = this.$store.state.Builder;
      const pizza = {
        id: pizzaId || _.uniqueId(),
        name: pizzaName,
        doughId: selectedDoughId,
        sizeId: selectedSizeId,
        sauceId: selectedSauceId,
        ingredients: _.cloneDeep(selectedIngredients),
        amount: pizzaAmount,
      };
      this.$store.commit("Cart/addToCart", pizza);
      this.$store.dispatch("Builder/resetState");
    },
  },
};
</script>

<style lang="scss">
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

.pizza__filling {
  transition: all 0.5s;
}
.ingredient-enter {
  opacity: 0;
  transform: scale(0);
}

.ingredient-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
