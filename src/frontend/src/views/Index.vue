<template>
  <AppLayout>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :dough="dough" />

          <BuilderSizeSelector :sizes="sizes" />

          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
          />

          <BuilderPizzaView />
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
    return {
      dough: pizzaData.dough,
      sizes: pizzaData.sizes,
      ingredients: pizzaData.ingredients,
      sauces: pizzaData.sauces,
    };
  },
};
</script>

<style></style>
