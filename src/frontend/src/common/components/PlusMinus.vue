<template>
  <div class="counter cart-list__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      data-test="minus"
      :disabled="isMinusDisabled"
      @click="$emit('minus')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      data-test="plus"
      :class="[isOrange && 'counter__button--orange']"
      :disabled="isPlusDisabled"
      @click="$emit('plus')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "PlusMinus",
  props: {
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "green",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    isMinusDisabled() {
      return this.value <= this.min;
    },
    isPlusDisabled() {
      return this.value >= this.max;
    },
    isOrange() {
      return this.type === "orange";
    },
  },
};
</script>
