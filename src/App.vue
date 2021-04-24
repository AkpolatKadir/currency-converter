<template>
  <div id="app">
    <h1>Currency Converter</h1>

    <div class="card">
      <input
        class="inputDate"
        type="date"
        id="conversion-history-date"
        name="conversion-history-date"
        aria-label="Conversion Rates Date"
        :value="selectedDate"
        @change="setSelectedDate($event.target.value)"
      />

      <div class="currencyItems">
        <CurrencyItem id="source" v-model="source" title="Source" />
        <CurrencyItem id="target" v-model="target" title="Target" />
      </div>

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
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    CurrencyItem,
  },
  data: function () {
    return {
      source: {
        amount: "1",
        currency: "",
      },
      target: {
        amount: "1",
        currency: "",
      },
      exchangeRate: 1,
    };
  },
  methods: {
    ...mapMutations(["setSelectedDate"]),
    ...mapActions(["fetchExchangeRates"]),
  },
  computed: {
    ...mapGetters(["getExchangeRate"]),
    selectedDate() {
      return this.$store.state.exchangeRates.selectedDate;
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
      this.fetchExchangeRates({ base: val }).then(() => {
        this.exchangeRate = this.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    "target.currency": function () {
      this.exchangeRate = this.getExchangeRate(
        this.source.currency,
        this.target.currency
      );
    },
    selectedDate: function (val) {
      this.fetchExchangeRates({
        base: this.source.currency,
        date: val,
      }).then(() => {
        this.exchangeRate = this.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    exchangeRate: function (val) {
      this.target = {
        ...this.target,
        amount: getConversionResult(this.source.amount, val),
      };
    },
  },

  created() {
    this.fetchExchangeRates({ base: "EUR" }).then(() => {
      this.source.currency = "EUR"; // TODO: Get Local currency.
      this.target.currency = "USD";
    });
  },
};
</script>

<style lang="scss">
#app {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.inputDate {
  margin-bottom: 60px;
}
h1 {
  text-align: center;
}

.currencyItems {
  display: flex;
  gap: 20px;
}

.card {
  display: block;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  border-radius: 6px;
  gap: 10px;
  min-height: 250px;
  width: 100%;
  max-width: 984px;
  margin: auto;
  box-shadow: 0 4px 29px rgb(0 0 0 / 10%);
}
</style>
