<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="sauce in sauces"
            :key="sauce.id"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.value"
              :checked="sauce.id === selectedSauce.id"
              @change="onSauceChange(sauce)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientItem
              v-for="item in ingredients"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";
import { mapState } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientItem },
  computed: {
    ...mapState("Builder", ["sauces", "ingredients", "selectedSauce"]),
  },
  methods: {
    onSauceChange(item) {
      this.$store.commit("Builder/selectSauce", item);
    },
  },
};
</script>
