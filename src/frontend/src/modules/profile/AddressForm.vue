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
              v-model="form.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="form.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="form.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="form.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            >
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="form.comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            >
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
        <button
          type="submit"
          class="button"
        >
          Сохранить
        </button>
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

<style lang="scss">
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
