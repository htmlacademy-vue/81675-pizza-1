<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="item" :disabled="isDndDisabled">
      <span class="filling" :class="`filling--${item.nameEn}`">
        {{ item.name }}
      </span>
    </AppDrag>
    <PlusMinus
      class="ingredients__counter"
      :value="amount"
      :min="min"
      :max="max"
      @plus="onAdd"
      @minus="onRemove"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import {
  INGREDIENT_MAX_AMOUNT,
  INGREDIENT_MIN_AMOUNT,
} from "@/common/constants";
import PlusMinus from "@/common/components/PlusMinus";
import { mapState } from "vuex";

export default {
  name: "BuilderIngredientItem",
  components: { PlusMinus, AppDrag },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Public", ["ingredients"]),
    ...mapState("Builder", ["selectedIngredients"]),
    builderItem() {
      return this.selectedIngredients.find(
        (ingredient) => ingredient.id === this.item.id
      );
    },
    amount() {
      return this.builderItem?.amount ?? 0;
    },
    min() {
      return INGREDIENT_MIN_AMOUNT;
    },
    max() {
      return INGREDIENT_MAX_AMOUNT;
    },
    isDndDisabled() {
      return this.item.amount >= this.max;
    },
  },
  methods: {
    onAdd() {
      this.$store.commit("Builder/ingredientAdd", this.item.id);
    },
    onRemove() {
      this.$store.commit("Builder/ingredientRemove", this.item.id);
    },
  },
};
</script>
