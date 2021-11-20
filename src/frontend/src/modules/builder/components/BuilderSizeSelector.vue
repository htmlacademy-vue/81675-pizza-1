<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          class="diameter__input"
          v-for="size in sizes"
          :key="size.id"
          :class="`diameter__input--${size.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            class="visually-hidden"
            :checked="size.id === selectedSizeId"
            @change="onSelect(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState("Public", ["sizes"]),
    ...mapState("Builder", ["selectedSizeId"]),
  },
  methods: {
    onSelect(item) {
      this.$store.commit("Builder/selectSize", item.id);
    },
  },
};
</script>
