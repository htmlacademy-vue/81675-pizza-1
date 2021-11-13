<template>
  <form @submit.prevent="onSubmit" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartPizzaList />
        <CartAdditionalList />
        <CartOrderForm />
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartTotalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import CartAdditionalList from "@/modules/cart/CartAdditionalList";
import CartPizzaList from "@/modules/cart/CartPizzaList";
import CartOrderForm from "@/modules/cart/CartOrderForm";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: { CartOrderForm, CartPizzaList, CartAdditionalList },
  computed: {
    ...mapGetters("Cart", ["cartTotalPrice"]),
  },
  methods: {
    onSubmit() {
      console.log("todo");
    },
  },
};
</script>
