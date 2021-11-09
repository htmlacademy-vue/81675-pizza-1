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
            checked
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
};
</script>
