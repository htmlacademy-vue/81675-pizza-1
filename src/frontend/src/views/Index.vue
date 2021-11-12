<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />
        <BuilderSizeSelector />
        <BuilderIngredientsSelector />
        <BuilderPizzaView @addToCart="onAddToCart" />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
      this.$emit("addToCart", pizza);
      this.$store.dispatch("Builder/resetState");
    },
  },
};
</script>

<style></style>
