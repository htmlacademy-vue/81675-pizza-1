<template>
  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="onSave"
    >
      <div class="address-form__header">
        <b>{{ title }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              v-model="form.name"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              v-model="form.street"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              v-model="form.building"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              v-model="form.flat"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              v-model="form.comment"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          data-test="remove"
          @click="onRemove"
        >
          {{ isNew ? "Отмена" : "Удалить" }}
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddressForm",
  computed: {
    ...mapState("Address", ["form"]),
    ...mapState("Auth", ["user"]),
    isNew() {
      return !this.form.id;
    },
    title() {
      return this.isNew ? "Новый адрес" : `Адрес №${this.form.id}`;
    },
  },
  methods: {
    ...mapActions("Address", ["addAddress", "editAddress", "removeAddress"]),
    onSave() {
      const payload = {
        ...this.form,
        userId: this.user.id,
      };
      this.form.id ? this.editAddress(payload) : this.addAddress(payload);
    },
    onRemove() {
      if (this.isNew) {
        this.$store.commit("Address/setState", { form: null });
        return;
      }

      this.removeAddress(this.form);
    },
  },
};
</script>
