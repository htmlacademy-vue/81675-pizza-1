<template>
  <div>
    <form
      class="layout-form"
      @submit.prevent="onSubmit"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">
              Корзина
            </h1>
          </div>

          <div
            v-if="isCartEmpty"
            class="sheet cart__empty"
          >
            <p>В корзине нет ни одного товара</p>
          </div>
          <div v-else>
            <CartPizzaList />
            <CartAdditionalList />
            <CartOrderForm />
          </div>
        </div>
      </main>
      <section
        v-if="!isCartEmpty"
        class="footer"
      >
        <div class="footer__more">
          <router-link
            to="/"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br>чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ cartTotalPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button
            type="submit"
            class="button"
          >
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <CartOrderSuccess />
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

  layout: "AppLayout",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["cart"]),
    ...mapGetters("Cart", ["cartTotalPrice"]),
    isCartEmpty() {
      return this.cart.length === 0;
    },

    addressData() {
      const { addressId, isSelfDelivery } = this.$store.state.Orders;
      if (isSelfDelivery) return null;
      if (addressId) return { id: addressId };
      return this.$store.state.Orders.address;
    },

    isNewAddress() {
      const { addressId, isSelfDelivery } = this.$store.state.Orders;
      return !isSelfDelivery && !addressId;
    },
  },

  methods: {
    async onSubmit() {
      const phone = this.$store.state.Orders.userPhone;
      const userId = this.$store.state.Auth.user?.id;
      const pizzas = this.$store.state.Cart.cart;
      const misc = this.$store.state.Cart.misc;
      const orderData = {
        pizzas,
        misc,
        userId,
        phone,
        address: this.addressData,
      };
      await this.$store.dispatch("Orders/createOrder", orderData);
      this.$store.commit("Cart/setState", { isOrderComplete: true });
      if (this.isNewAddress) {
        await this.$store.dispatch("Address/fetchAddresses");
      }
    },
  },
};
</script>

<style lang="scss">
.cart__title {
  margin-bottom: 15px;
}

.cart__empty {
  padding: 20px 30px;
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
