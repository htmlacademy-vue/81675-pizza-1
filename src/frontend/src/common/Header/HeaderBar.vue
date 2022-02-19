<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to="/"
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">
        {{ cartTotalPrice }} ₽
      </router-link>
    </div>
    <HeaderAuthed v-if="isAuthed" />
    <HeaderGuest v-else />
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderAuthed from "@/common/Header/HeaderAuthed";
import HeaderGuest from "@/common/Header/HeaderGuest";
export default {
  name: "HeaderBar",
  components: { HeaderGuest, HeaderAuthed },
  computed: {
    ...mapGetters("Auth", ["isAuthed"]),
    ...mapGetters("Cart", ["cartTotalPrice"]),
  },
};
</script>
