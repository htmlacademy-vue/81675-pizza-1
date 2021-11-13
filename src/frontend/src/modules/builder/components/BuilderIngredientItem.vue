<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="item" :disabled="isDndDisabled">
      <span class="filling" :class="`filling--${item.nameEn}`">
        {{ item.name }}
      </span>
    </AppDrag>
    <PlusMinus
      class="ingredients__counter"
      v-if="true"
      :value="item.amount"
      :min="min"
      :max="max"
      @plus="onAdd(item)"
      @minus="onRemove(item)"
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
    onAdd(item) {
      this.$store.commit("Builder/ingredientAdd", item);
    },
    onRemove(item) {
      this.$store.commit("Builder/ingredientRemove", item);
    },
  },
};
</script>
