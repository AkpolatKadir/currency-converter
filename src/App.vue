<template>
  <div id="app">
    <div class="card">
      <CurrencyItem id="source" v-model="source" title="Source" />
      <CurrencyItem id="target" v-model="target" title="Target" />
      <!-- <CurrencyInput v-model="targetAmount" title="Target" id="target" /> -->
      <!-- <CurrencySelect v-model="targetCurrency" :currencies="currencies" /> -->
    </div>
  </div>
</template>

<script>
import CurrencyItem from "./components/CurrencyItem.vue";

export default {
  name: "App",
  components: {
    CurrencyItem,
  },
  data: function () {
    return {
      source: {
        amount: 1,
        currency: "EUR",
      },
      target: {
        amount: 1,
        currency: "USD",
      },
    };
  },
  computed: {
    exchangeRate() {
      return this.$store.getters.getExchangeRate(
        this.sourceCurrency,
        this.targetCurrency
      );
    },
  },
  watch: {
    exchangeRate: function (val) {
      this.target = { ...this.target, amount: this.sourceAmount * val };
    },
    sourceAmount: function (val) {
      this.target = { ...this.target, amount: val * this.exchangeRate };
    },
    sourceCurrency: function (val) {
      this.$store.dispatch("fetchExchangeRates", val);
    },
    targetCurrency: function () {
      this.targetAmount = this.sourceAmount * this.exchangeRate;
    },
  },

  created() {
    this.$store.dispatch("fetchExchangeRates");
  },
};
</script>

<style>
#app {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
