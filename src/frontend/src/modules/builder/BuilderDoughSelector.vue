<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div class="sheet__content dough">
        <label
          v-for="item in dough"
          :key="item.id"
          class="dough__input"
          :class="`dough__input--${item.value}`"
          data-test="dough"
        >
          <input
            type="radio"
            name="dough"
            :value="item.value"
            class="visually-hidden"
            :checked="isChecked(item)"
            @change="onChange(item)"
          >
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Public", ["dough"]),
    ...mapState("Builder", ["selectedDoughId"]),
  },
  methods: {
    isChecked(item) {
      return item.id === this.selectedDoughId;
    },
    onChange(item) {
      this.$store.commit("Builder/setState", { selectedDoughId: item.id });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
