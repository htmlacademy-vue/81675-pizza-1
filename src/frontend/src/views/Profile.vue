<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5@2x.webp 1x,
            @/assets/img/users/user5@4x.webp 2x
          "
        />
        <img
          src="@/assets/img/users/user5@2x.jpg"
          srcset="@/assets/img/users/user5@4x.jpg"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <AddressList />

    <AddressForm v-if="form" />
    <div class="layout__button">
      <button type="button" class="button button--border" @click="onNewAddress">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddressList from "@/modules/profile/AddressList";
import AddressForm from "@/modules/profile/AddressForm";
import isLoggedIn from "@/middlewares/isLoggedIn";

export default {
  name: "Profile",
  components: { AddressForm, AddressList },
  layout: "AppSidebarLayout",
  middleware: isLoggedIn,
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Address", ["form"]),
  },
  methods: {
    onNewAddress() {
      this.$store.commit("Address/startNewAddress");
    },
  },
};
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}
</style>
