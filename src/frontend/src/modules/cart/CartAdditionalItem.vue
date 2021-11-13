<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          :disabled="isAddDisabled"
          @click="item.amount--"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="item.amount"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          :disabled="isRemoveDisabled"
          @click="item.amount++"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartAdditionalItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAddDisabled() {
      return this.item.amount <= 0;
    },
    isRemoveDisabled() {
      return this.item.amount >= 10;
    },
  },
};
</script>
