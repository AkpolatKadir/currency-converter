<template>
  <div id="app">
    <h1>Currency Converter</h1>
    <div class="card">
      <CurrencyItem id="source" v-model="source" title="Source" />
      <CurrencyItem id="target" v-model="target" title="Target" />

      <p>
        1 {{ source.currency }} = {{ exchangeRate.toFixed(5) }}
        {{ target.currency }}
      </p>
    </div>
  </div>
</template>

<script>
import CurrencyItem from "./components/CurrencyItem.vue";
import getConversionResult from "./utils/getConversionResult";

export default {
  name: "App",
  components: {
    CurrencyItem,
  },
  data: function () {
    return {
      source: {
        amount: "1",
        currency: "EUR",
      },
      target: {
        amount: "1",
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
        amount: getConversionResult(val, this.exchangeRate),
      };
    },
    "source.currency": function (val) {
      this.$store.dispatch("fetchExchangeRates", val);
    },
    "target.currency": function () {
      this.target = {
        ...this.target,
        amount: getConversionResult(this.source.amount, this.exchangeRate),
      };
    },
    exchangeRate: function (val) {
      this.target = {
        ...this.target,
        amount: getConversionResult(this.source.amount, val),
      };
    },
  },

  created() {
    this.$store.dispatch("fetchExchangeRates");
  },
};
</script>

<style lang="scss">
#app {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 250px;
  width: 100%;
  max-width: 984px;
  margin: auto;
  box-shadow: 0 4px 29px rgb(0 0 0 / 10%);
}
</style>
