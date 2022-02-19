<template>
  <li class="ingredients__item">
    <AppDrag
      :transfer-data="item"
      :disabled="isDndDisabled"
    >
      <span
        class="filling"
        :class="`filling--${item.nameEn}`"
      >
        {{ item.name }}
      </span>
    </AppDrag>
    <PlusMinus
      class="ingredients__counter"
      :value="amount"
      :min="min"
      :max="max"
      @plus="onAdd"
      @minus="onRemove"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import {
  INGREDIENT_MAX_AMOUNT,
  INGREDIENT_MIN_AMOUNT,
} from "@/common/constants";
import PlusMinus from "@/common/components/PlusMinus";
import { mapState } from "vuex";

export default {
  name: "BuilderIngredientItem",
  components: { PlusMinus, AppDrag },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Public", ["ingredients"]),
    ...mapState("Builder", ["selectedIngredients"]),
    builderItem() {
      return this.selectedIngredients.find(
        (ingredient) => ingredient.id === this.item.id
      );
    },
    amount() {
      return this.builderItem?.amount ?? 0;
    },
    min() {
      return INGREDIENT_MIN_AMOUNT;
    },
    max() {
      return INGREDIENT_MAX_AMOUNT;
    },
    isDndDisabled() {
      return this.item.amount >= this.max;
    },
  },
  methods: {
    onAdd() {
      this.$store.commit("Builder/ingredientAdd", this.item.id);
    },
    onRemove() {
      this.$store.commit("Builder/ingredientRemove", this.item.id);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}
</style>
