<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          v-for="item in dough"
          :key="item.id"
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
          />
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
