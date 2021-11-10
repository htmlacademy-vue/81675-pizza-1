<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="item" :disabled="isAddDisabled">
      <span class="filling" :class="`filling--${item.nameEn}`">
        {{ item.name }}
      </span>
    </AppDrag>

    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="isRemoveDisabled"
        @click="$emit('remove', item)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        v-model="item.amount"
        disabled
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="isAddDisabled"
        @click="$emit('add', item)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import {
  INGREDIENT_MAX_AMOUNT,
  INGREDIENT_MIN_AMOUNT,
} from "@/common/constants";

export default {
  name: "BuilderIngredientItem",
  components: { AppDrag },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAddDisabled() {
      return this.item.amount >= INGREDIENT_MAX_AMOUNT;
    },
    isRemoveDisabled() {
      return this.item.amount <= INGREDIENT_MIN_AMOUNT;
    },
  },
};
</script>
