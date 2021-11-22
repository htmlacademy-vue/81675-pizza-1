<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <PlusMinus
        :value="amount"
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
  computed: {
    amount() {
      const miscInCart = this.$store.state.Cart.misc.find(
        (item) => item.id === this.item.id
      );
      return miscInCart?.amount ?? 0;
    },
  },
  methods: {
    onPlus() {
      this.$store.dispatch("Cart/miscAdd", this.item.id);
    },
    onMinus() {
      this.$store.dispatch("Cart/miscRemove", this.item.id);
    },
  },
};
</script>
