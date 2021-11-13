<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <PlusMinus
        :value="item.amount"
        @plus="onPlus"
        @minus="onMinus"
        type="orange"
      />
      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import PlusMinus from "@/common/components/PlusMinus";
export default {
  name: "CartAdditionalItem",
  components: { PlusMinus },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onPlus() {
      this.item.amount++;
    },
    onMinus() {
      this.item.amount--;
    },
  },
};
</script>
