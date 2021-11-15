<template>
  <div class="header__user">
    <router-link to="/profile">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5.webp    1x,
            @/assets/img/users/user5@2x.webp 2x
          "
        />
        <img
          src="@/assets/img/users/user5.jpg"
          srcset="@/assets/img/users/user5@2x.jpg"
          :alt="user.name"
          width="32"
          height="32"
        />
      </picture>
      <span>{{ user.name }}</span>
    </router-link>
    <a href="#" class="header__logout" @click.prevent="onLogout"
      ><span>Выйти</span></a
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderAuthed",
  computed: {
    ...mapState("Auth", ["user"]),
  },
  methods: {
    onLogout() {
      this.$store.dispatch("Auth/logout");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
