<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>

    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>

<script>
import OrderItem from "@/modules/orders/OrderItem";
import { mapState } from "vuex";
import isLoggedIn from "@/middlewares/isLoggedIn";
export default {
  name: "Orders",
  components: { OrderItem },
  layout: "AppSidebarLayout",
  middleware: isLoggedIn,
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  created() {
    this.$store.dispatch("Orders/getOrders");
  },
};
</script>
