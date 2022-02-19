<template>
  <div>
    <div
      v-for="address in addresses"
      :key="address.id"
      class="layout__address"
    >
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №{{ address.id }}. {{ address.name }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              @click="onEdit(address)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street }}, д. {{ address.building }}, кв.
          {{ address.flat }}
        </p>
        <small>{{ address.comment }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddressList",
  computed: {
    ...mapState("Address", ["addresses"]),
  },

  methods: {
    onEdit(address) {
      this.$store.commit("Address/editAddress", address);
    },
  },
};
</script>

<style lang="scss">
.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>
