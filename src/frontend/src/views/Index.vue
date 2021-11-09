<template>
  <AppLayout>
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
          />
        </div>
      </form>
    </main>
  </AppLayout>
</template>

<script>
import pizzaData from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "Index",
  components: {
    AppLayout,
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
  },
};
</script>

<style></style>
