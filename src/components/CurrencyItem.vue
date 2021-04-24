<template>
  <div class="conversionItem">
    <CurrencyInput
      :id="id"
      v-model="value.amount"
      :title="title"
      :disabled="disabled"
      @focus="$emit('onFocus', $event)"
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
    id: String,
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
.conversionItem {
  display: flex;
  gap: 10px;
  width: fit-content;
  height: 72px;
}
</style>