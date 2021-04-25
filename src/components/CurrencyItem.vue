<template>
  <div class="conversionItem">
    <CurrencyInput
      :id="id"
      v-model="value.amount"
      :title="title"
      :disabled="disabled"
      @focus="$emit('onFocus', $event)"
    />
    <CurrencySelect
      v-model="value.currency"
      :id="id"
      :currencies="currencies"
    />
  </div>
</template>

<script>
import CurrencyInput from "./CurrencyInput.vue";
import CurrencySelect from "./CurrencySelect.vue";

export default {
  name: "CurrencyItem",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CurrencySelect,
    CurrencyInput,
  },
  computed: {
    currencies() {
      return this.$store.state.exchangeRates.currencies;
    },
  },
};
</script>

<style>
.conversionItem {
  display: flex;
  width: fit-content;
  height: 72px;
}
</style>