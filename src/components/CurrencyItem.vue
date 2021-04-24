<template>
  <div class="currencyItem">
    <CurrencyInput
      v-model.number="value.amount"
      :title="title"
      :disabled="disabled"
    />
    <CurrencySelect v-model="value.currency" :currencies="currencies" />
  </div>
</template>

<script>
import CurrencyInput from "./CurrencyInput.vue";
import CurrencySelect from "./CurrencySelect.vue";

export default {
  name: "CurrencyItem",
  props: {
    title: String,
    value: Object,
    disabled: Boolean,
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
.currencyItem {
  display: flex;
  gap: 10px;
  width: fit-content;
  height: 72px;
}
</style>