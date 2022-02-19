<template>
  <div class="sign-form">
    <router-link
      to="/"
      class="close close--white"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">
        Авторизуйтесь на сайте
      </h1>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
          >
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            required
          >
        </label>
      </div>
      <p>{{ loginError }}</p>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import isNotLoggedIn from "@/middlewares/isNotLoggedIn";

export default {
  name: "Login",
  layout: "AppLayout",
  middleware: isNotLoggedIn,
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapState("Auth", ["loginError"]),
  },

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("Auth/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ path: "/profile" });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
