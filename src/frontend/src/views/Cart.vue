<template>
  <div>
    <form @submit.prevent="onSubmit" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div class="sheet cart__empty" v-if="isCartEmpty">
            <p>В корзине нет ни одного товара</p>
          </div>
          <div v-else>
            <CartPizzaList />
            <CartAdditionalList />
            <CartOrderForm />
          </div>
        </div>
      </main>
      <section class="footer" v-if="!isCartEmpty">
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
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["isOrderComplete", "cart", "additional"]),
    ...mapGetters("Cart", ["cartTotalPrice"]),
    isCartEmpty() {
      return this.cart.length === 0;
    },
  },
  methods: {
    onSubmit() {
      // this.$store.commit("Cart/setOrderComplete", true);
      const pizzas = this.cart.map((item) => {
        return {
          name: item.name,
          sauceId: item.sauce.id,
          doughId: item.dough.id,
          sizeId: item.size.id,
          quantity: item.amount,
          ingredients: item.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.amount,
            };
          }),
        };
      });
      const misc = this.additional
        .filter((item) => item.amount > 0)
        .map((item) => {
          return {
            miscId: item.id,
            quantity: item.amount,
          };
        });
      const order = {
        userId: this.user.id,
        phone: this.user.phone,
        address: "todo",
        pizzas,
        misc,
      };
      this.$store.dispatch("Orders/createOrder", order);
    },
  },
};
</script>
