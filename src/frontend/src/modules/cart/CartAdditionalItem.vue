<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="item.image"
        width="39"
        height="60"
        :alt="item.name"
      >
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <PlusMinus
        :value="amount"
        type="orange"
        @plus="onPlus"
        @minus="onMinus"
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
      this.$store.commit("Cart/miscAdd", this.item.id);
    },
    onMinus() {
      this.$store.commit("Cart/miscRemove", this.item.id);
    },
  },
};
</script>

<style lang="scss">
.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
