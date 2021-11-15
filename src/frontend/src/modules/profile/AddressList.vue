<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №1. Тест</b>
        <div class="address-form__edit">
          <button type="button" class="icon">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>Невский пр., д. 22, кв. 46</p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </div>
  </div>
</template>

<script>
import addressService from "@/services/addressService";

export default {
  name: "AddressList",
  async created() {
    const res = await addressService.getAddresses();
    console.log("res", res);
  },
};
</script>
