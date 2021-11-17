<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem v-for="order in orders" :order="order" :key="order.id" />
  </div>
</template>

<script>
import OrderItem from "@/modules/orders/OrderItem";
import { mapState } from "vuex";
export default {
  name: "Orders",
  components: { OrderItem },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
};
</script>
