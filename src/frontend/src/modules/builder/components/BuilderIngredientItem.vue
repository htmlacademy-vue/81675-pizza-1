<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${itemName}`">
      {{ item.name }}
    </span>

    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        disabled
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="0" />
      <button type="button" class="counter__button counter__button--plus">
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "BuilderIngredientItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemName() {
      const match = this.item.image.match(/(\w+).svg/);
      return match?.[1] ?? "";
    },
  },
};
</script>
