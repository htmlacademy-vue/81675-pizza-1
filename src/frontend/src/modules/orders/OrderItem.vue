<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border" @click="onRemove">
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="onReOrder">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <OrderItemPizza
        v-for="pizza in order.orderPizzas"
        :pizza="pizza"
        :key="pizza.id"
      />
    </ul>

    <ul class="order__additional">
      <li v-for="misc in order.orderMisc" :key="misc.id">
        <img
          :src="miscData(misc.id).image"
          width="20"
          height="30"
          :alt="miscData(misc.id).name"
        />
        <p>
          <span>{{ miscData(misc.id).name }}</span>
          <b>{{ miscData(misc.id).price }} ₽ x {{ misc.amount }}</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ orderAddress }}</p>
  </section>
</template>

<script>
import OrderItemPizza from "@/modules/orders/OrderItemPizza";
import { mapGetters } from "vuex";
export default {
  name: "OrderItem",
  components: { OrderItemPizza },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Public", ["pizzaPrice"]),
    miscPrice() {
      return this.order.orderMisc.reduce((acc, item) => {
        const miscData = this.$store.getters["Public/miscById"](item.id);
        return acc + miscData.price * item.amount;
      }, 0);
    },
    orderAddress() {
      return this.order.orderAddress?.name ?? "самовывоз";
    },
    orderPrice() {
      const pizzasPrice = this.order.orderPizzas.reduce(
        (acc, pizza) => acc + this.pizzaPrice(pizza),
        0
      );
      return pizzasPrice + this.miscPrice;
    },
  },
  methods: {
    onRemove() {
      this.$store.dispatch("Orders/removeOrder", this.order.id);
    },
    onReOrder() {
      const { orderPizzas, orderAddress, orderMisc, phone, userId } =
        this.order;
      const orderData = {
        pizzas: orderPizzas,
        misc: orderMisc,
        address: orderAddress,
        phone,
        userId,
      };
      this.$store.dispatch("Orders/createOrder", orderData);
    },
    miscData(id) {
      return this.$store.getters["Public/miscById"](id);
    },
  },
};
</script>
