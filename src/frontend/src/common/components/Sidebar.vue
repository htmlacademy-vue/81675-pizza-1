<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link to="/orders" class="layout__link layout__link--active">
      История заказов
    </router-link>
    <router-link to="/profile" class="layout__link">Мои данные</router-link>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
