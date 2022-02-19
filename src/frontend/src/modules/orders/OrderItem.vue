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
        <button
          type="button"
          class="button button--border"
          data-test="remove"
          @click="onRemove"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="reorder"
          @click="onReOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <OrderItemPizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional">
      <li
        v-for="misc in order.orderMisc"
        :key="misc.id"
      >
        <img
          :src="miscData(misc.id).image"
          width="20"
          height="30"
          :alt="miscData(misc.id).name"
        >
        <p>
          <span>{{ miscData(misc.id).name }}</span>
          <b>{{ miscData(misc.id).price }} ₽ x {{ misc.amount }}</b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      Адрес доставки: {{ orderAddress }}
    </p>
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
      const { orderPizzas, orderMisc, phone, addressId } = this.order;
      this.$store.commit("Cart/setState", {
        cart: orderPizzas,
        misc: orderMisc || [],
      });
      this.$store.commit("Orders/setState", {
        addressId,
        isSelfDelivery: !addressId,
        userPhone: phone,
      });
      this.$router.push({ name: "Cart" });
    },

    miscData(id) {
      return this.$store.getters["Public/miscById"](id);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
