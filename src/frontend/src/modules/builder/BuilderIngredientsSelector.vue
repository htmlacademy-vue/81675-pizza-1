<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="sauce in sauces"
            :key="sauce.id"
            data-test="sauce"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.value"
              :checked="sauce.id === selectedSauceId"
              @change="onSauceChange(sauce)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientItem
              v-for="item in ingredients"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderIngredientItem from "@/modules/builder/BuilderIngredientItem";
import { mapState } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientItem },
  computed: {
    ...mapState("Public", ["sauces", "ingredients"]),
    ...mapState("Builder", ["selectedSauceId"]),
  },
  methods: {
    onSauceChange(item) {
      this.$store.commit("Builder/setState", { selectedSauceId: item.id });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
