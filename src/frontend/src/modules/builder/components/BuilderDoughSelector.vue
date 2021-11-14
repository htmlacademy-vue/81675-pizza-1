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
    ...mapState("Builder", ["dough", "selectedDough"]),
  },
  methods: {
    isChecked(item) {
      return item.id === this.selectedDough?.id;
    },
    onChange(item) {
      this.$store.commit("Builder/selectDough", item);
    },
  },
};
</script>
