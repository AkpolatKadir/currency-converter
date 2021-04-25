<template>
  <div id="app">
    <h1 class="appName">Currency Converter</h1>

    <div
      class="card"
      :class="{
        'card--error': error,
      }"
    >
      <div class="conversionDate">
        <label for="inputDate">Conversion Date:</label>
        <input
          type="date"
          min="1999-01-04"
          :max="today"
          id="conversion-history-date"
          name="conversion-history-date"
          aria-label="Conversion Date"
          :value="selectedDate"
          @change="setSelectedDate($event.target.value)"
          placeholder="1999-01-04"
        />
      </div>

      <div class="currencyItems">
        <CurrencyItem
          id="source"
          v-model="source"
          title="Source"
          :disabled="error"
          @onFocus="setFocus"
        />

        <font-awesome-icon
          class="switchIcon"
          icon="arrows-alt-h"
          size="4x"
          @click="switchCurrencies"
          aria-label="Switch Currencies"
        />

        <CurrencyItem
          id="target"
          v-model="target"
          title="Target"
          :disabled="error"
          @onFocus="setFocus"
        />
      </div>

      <p class="exchangeInfo">
        1 {{ source.currency }} =
        <span
          class="exchangeRate"
          :class="{
            'exchangeRate--error': error,
          }"
        >
          {{ exchangeRateText }}</span
        >
        {{ target.currency }}
      </p>
    </div>
  </div>
</template>

<script>
import CurrencyItem from "@/components/CurrencyItem.vue";
import { getConversionResult, getDateText } from "@/utils";
import { PRECISION } from "@/constants";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

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
      focusedInput: "source",
    };
  },
  methods: {
    ...mapMutations(["setSelectedDate"]),
    ...mapActions(["fetchExchangeRates"]),
    openFailureToast(errorMessage) {
      this.$toast.open({
        message: errorMessage,
        type: "error",
      });
    },
    setFocus(input) {
      this.focusedInput = input;
    },
    switchCurrencies() {
      const temp = this.source.currency;

      this.source.currency = this.target.currency;
      this.target.currency = temp;
    },
  },
  computed: {
    ...mapGetters(["getExchangeRate"]),
    ...mapState({
      error: (state) => state.exchangeRates.error,
      isLoading: (state) => state.exchangeRates.isLoading,
      selectedDate: (state) => state.exchangeRates.selectedDate,
    }),
    today() {
      const now = new Date();
      return getDateText(now);
    },
    exchangeRateText() {
      if (this.isLoading) {
        return "...";
      }
      if (this.error) {
        return "xxx";
      }

      return this.exchangeRate.toFixed(PRECISION);
    },
  },
  watch: {
    "source.amount": function (val) {
      if (this.focusedInput === "source") {
        this.target = {
          ...this.target,
          amount: getConversionResult(val, this.exchangeRate),
        };
      }
    },
    "source.currency": function (val) {
      this.fetchExchangeRates({ base: val }).then(() => {
        this.exchangeRate = this.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    "target.amount": function (val) {
      if (this.focusedInput === "target") {
        this.source = {
          ...this.source,
          amount: getConversionResult(val, 1 / this.exchangeRate),
        };
      }
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
    error: function (val) {
      if (val) this.openFailureToast(val);
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
  margin-top: 120px;
}

.conversionDate {
  margin-bottom: 60px;

  label {
    margin-right: 10px;
  }
}

.appName {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.card {
  padding: 20px 15px;
  border-radius: 6px;
  gap: 10px;
  min-height: 250px;
  width: 90%;
  max-width: 984px;
  margin: auto;
  box-shadow: 0 4px 29px rgb(0 0 0 / 10%);

  &--error {
    border: 1px solid red;
  }
}

.currencyItems {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.switchIcon {
  cursor: pointer;
  border-radius: 50%;
  @media (max-width: 768px) {
    transform: rotate(90deg);
  }

  &:hover {
    background: rgba(grey, 0.2);
  }
}

.exchangeInfo {
  font-size: 1.375rem;
  font-weight: 600;
  .exchangeRate {
    color: #2ed06e;

    &--error {
      color: red;
    }
  }
}
</style>
