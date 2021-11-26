<template>
  <div class="cart-form__address">
    <span class="cart-form__label">Новый адрес:</span>

    <div class="cart-form__input">
      <label class="input">
        <span>Улица*</span>
        <input
          type="text"
          name="street"
          :value="addressData.street"
          @input="onStreetInput"
          :disabled="isDisabled"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Дом*</span>
        <input
          type="text"
          name="house"
          :value="addressData.building"
          @input="onBuildingInput"
          :disabled="isDisabled"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Квартира</span>
        <input
          type="text"
          name="apartment"
          :value="addressData.flat"
          @input="onFlatInput"
          :disabled="isDisabled"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartAddressForm",
  props: {
    addressData: {
      type: Object,
      required: true,
    },
    isDisabled: Boolean,
  },
  methods: {
    updateAddress(payload) {
      this.$store.commit("Orders/setState", {
        address: { ...this.addressData, ...payload },
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
  },
};
</script>
