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
          />

          <BuilderPizzaView :total-price="totalPrice" />
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
    return {
      dough,
      sizes,
      ingredients: pizzaData.ingredients,
      sauces,

      selectedDough: dough[0],
      selectedSize: sizes[0],
      selectedSauce: sauces[0],
    };
  },
  computed: {
    totalPrice() {
      return (
        this.selectedSize.multiplier *
        (this.selectedDough.price + this.selectedSauce.price)
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
  },
};
</script>

<style></style>
