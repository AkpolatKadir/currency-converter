<template>
  <div id="app">
    <h1>Currency Converter</h1>

    <div class="card">
      <input
        class="inputDate"
        type="date"
        id="start"
        name="trip-start"
        :value="selectedDate"
        @change="onDateChange"
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
import { mapMutations } from "vuex";

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
    onDateChange(e) {
      this.setSelectedDate(e.target.value);
    },
  },
  computed: {
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
      this.$store.dispatch("fetchExchangeRates", { base: val }).then(() => {
        this.exchangeRate = this.$store.getters.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    "target.currency": function () {
      this.exchangeRate = this.$store.getters.getExchangeRate(
        this.source.currency,
        this.target.currency
      );

      this.target = {
        ...this.target,
        amount: getConversionResult(this.source.amount, this.exchangeRate),
      };
    },
    selectedDate: function (val) {
      this.$store
        .dispatch("fetchExchangeRates", {
          base: this.source.currency,
          date: val,
        })
        .then(() => {
          this.exchangeRate = this.$store.getters.getExchangeRate(
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
    this.$store.dispatch("fetchExchangeRates", { base: "EUR" }).then(() => {
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
