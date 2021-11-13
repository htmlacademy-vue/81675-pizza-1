<template>
  <div>
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
    <CartOrderSuccess v-if="isOrderComplete" />
  </div>
</template>

<script>
import CartAdditionalList from "@/modules/cart/CartAdditionalList";
import CartPizzaList from "@/modules/cart/CartPizzaList";
import CartOrderForm from "@/modules/cart/CartOrderForm";
import { mapGetters, mapState } from "vuex";
import CartOrderSuccess from "@/modules/cart/CartOrderSuccess";
export default {
  name: "Cart",
  components: {
    CartOrderSuccess,
    CartOrderForm,
    CartPizzaList,
    CartAdditionalList,
  },
  computed: {
    ...mapState("Cart", ["isOrderComplete"]),
    ...mapGetters("Cart", ["cartTotalPrice"]),
  },
  methods: {
    onSubmit() {
      this.$store.commit("Cart/setOrderComplete", true);
    },
  },
};
</script>
