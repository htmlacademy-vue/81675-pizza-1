<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${item.nameEn}`">
      {{ item.name }}
    </span>

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
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 3;

export default {
  name: "BuilderIngredientItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAddDisabled() {
      return this.item.amount >= MAX_AMOUNT;
    },
    isRemoveDisabled() {
      return this.item.amount <= MIN_AMOUNT;
    },
  },
};
</script>
