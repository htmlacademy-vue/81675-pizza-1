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
        <img :src="misc.image" width="20" height="30" :alt="misc.name" />
        <p>
          <span>{{ misc.name }}</span>
          <b>{{ misc.price }} ₽ x {{ misc.amount }}</b>
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
    ...mapGetters("Cart", ["pizzaPrice"]),
    miscPrice() {
      return this.order.orderMisc.reduce((acc, item) => {
        return acc + item.price * item.amount;
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
      console.log("todo remove");
    },
    onReOrder() {
      console.log("todo reorder");
    },
  },
};
</script>
