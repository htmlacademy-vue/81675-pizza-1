<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="deliveryOptionId"
          name="test"
          class="select"
        >
          <option :value="-1">Заберу сам</option>
          <option :value="0">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="userPhone"
          @input="onUserPhoneInput"
        >
      </label>

      <template v-if="!isSelfDelivery">
        <CartAddressForm
          v-if="existingAddressData"
          :address-data="existingAddressData"
          is-disabled
        />
        <CartAddressForm
          v-else
          :address-data="address"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CartAddressForm from "@/modules/cart/CartAddressForm";

export default {
  name: "CartOrderForm",
  components: { CartAddressForm },
  data() {
    const { isSelfDelivery, addressId } = this.$store.state.Orders;
    let deliveryOptionId = null;
    if (isSelfDelivery) {
      deliveryOptionId = -1;
    } else {
      deliveryOptionId = addressId ? addressId : 0;
    }
    return {
      deliveryOptionId,
    };
  },

  computed: {
    ...mapGetters("Auth", ["isAuthed"]),
    ...mapState("Address", ["addresses"]),
    ...mapState("Orders", [
      "address",
      "userPhone",
      "addressId",
      "isSelfDelivery",
    ]),

    existingAddressData() {
      return this.addresses.find((item) => item.id === this.addressId);
    },
  },

  watch: {
    deliveryOptionId(v) {
      const value = Number(v);
      const isSelfDelivery = value === -1;
      const addressId = value ? value : null;
      this.$store.commit("Orders/setState", { isSelfDelivery, addressId });
    },
  },

  methods: {
    onUserPhoneInput(e) {
      this.$store.commit("Orders/setState", { userPhone: e.target.value });
    },
  },
};
</script>

<style lang="scss">
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
