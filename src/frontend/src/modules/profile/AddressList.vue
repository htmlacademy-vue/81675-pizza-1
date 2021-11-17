<template>
  <div>
    <div class="layout__address" v-for="address in addresses" :key="address.id">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №{{ address.id }}. {{ address.name }}</b>
          <div class="address-form__edit">
            <button type="button" class="icon" @click="onEdit(address)">
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
