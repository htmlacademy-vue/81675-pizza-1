<template>
  <transition name="fade">
    <div
      v-if="isOrderComplete"
      class="popup"
    >
      <a
        href="#"
        class="close"
        @click.prevent="onClose"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">
          Спасибо за заказ
        </h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          href="#"
          class="button"
          @click.prevent="onClose"
        >Отлично, я жду!</a>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "CartOrderSuccess",
  computed: {
    ...mapState("Cart", ["isOrderComplete"]),
    ...mapGetters("Auth", ["isAuthed"]),
  },
  methods: {
    onClose() {
      this.$store.commit("Cart/setState", { isOrderComplete: false });
      setTimeout(() => {
        this.$store.commit("Cart/resetCart");
        this.$store.dispatch("Builder/resetState");
        const path = this.isAuthed ? "/orders" : "/";
        this.$router.push({ path });
      }, 500);
    },
  },
};
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
