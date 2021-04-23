<template>
  <div class="currencyItem">
    <CurrencyInput v-model="value.amount" :title="title" id="source" />
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
}
</style>