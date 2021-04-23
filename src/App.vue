<template>
  <div id="app">
    <div class="card">
      <CurrencyItem id="source" v-model="source" title="Source" />
      <CurrencyItem id="target" v-model="target" title="Target" />
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
        this.source.currency,
        this.target.currency
      );
    },
  },
  watch: {
    "source.amount": function (val) {
      this.target = {
        ...this.target,
        amount: val * this.exchangeRate,
      };
    },
    "source.currency": function (val) {
      this.$store.dispatch("fetchExchangeRates", val);
    },
    "target.currency": function () {
      this.target = {
        ...this.target,
        amount: this.source.amount * this.exchangeRate,
      };
    },
    exchangeRate: function (val) {
      this.target = { ...this.target, amount: this.source.amount * val };
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
