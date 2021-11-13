<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="onClose">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="onClose">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartOrderSuccess",
  computed: {
    ...mapState("Auth", ["isAuthed"]),
  },
  methods: {
    onClose() {
      this.$store.commit("Cart/resetCart");
      this.$store.commit("Builder/resetState");
      const path = this.isAuthed ? "/orders" : "/";
      this.$router.push({ path });
    },
  },
};
</script>
