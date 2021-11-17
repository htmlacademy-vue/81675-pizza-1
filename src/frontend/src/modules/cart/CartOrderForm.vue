<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="deliveryOptionId">
          <option :value="-1">Заберу сам</option>
          <option :value="0">Новый адрес</option>
          <option
            :value="address.id"
            v-for="address in addresses"
            :key="address.id"
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
        />
      </label>

      <div class="cart-form__address" v-if="isAddressFormVisible">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="address.street"
              @input="onStreetInput"
              :disabled="isAddressInputDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="address.building"
              @input="onBuildingInput"
              :disabled="isAddressInputDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="address.flat"
              @input="onFlatInput"
              :disabled="isAddressInputDisabled"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "CartOrderForm",
  computed: {
    ...mapGetters("Auth", ["isAuthed"]),
    ...mapState("Address", ["addresses", "form"]),
    ...mapState("Orders", ["address", "userPhone"]),
    isAddressFormVisible() {
      return this.deliveryOptionId !== -1;
    },
    isAddressInputDisabled() {
      return this.deliveryOptionId > 0;
    },
  },
  data() {
    return {
      deliveryOptionId: -1,
    };
  },
  watch: {
    deliveryOptionId(value) {
      const address = this.addresses.find((item) => item.id === value);
      const addressData = address
        ? {
            street: address.street,
            building: address.building,
            flat: address.flat,
            comment: address.comment,
          }
        : { street: "", building: "", flat: "", comment: "" };
      this.$store.commit("Orders/setState", { address: addressData });
      Object.assign(this, addressData);
    },
  },
  methods: {
    updateAddress(payload) {
      this.$store.commit("Orders/setState", {
        address: { ...this.address, ...payload },
      });
    },
    onStreetInput(e) {
      this.updateAddress({ street: e.target.value });
    },
    onBuildingInput(e) {
      this.updateAddress({ building: e.target.value });
    },
    onFlatInput(e) {
      this.updateAddress({ flat: e.target.value });
    },
    onUserPhoneInput(e) {
      this.$store.commit("Orders/setState", { userPhone: e.target.value });
    },
  },
};
</script>
