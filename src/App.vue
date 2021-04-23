<template>
  <div id="app">
    <div class="card">
      <CurrencyInput title="Source" id="source" />
      <CurrencyInput title="Target" id="target" />
    </div>
  </div>
</template>

<script>
import CurrencyInput from "./components/CurrencyInput.vue";

export default {
  name: "App",
  components: {
    CurrencyInput,
  },

  created() {
    this.$store.dispatch("fetchExchangeRates");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
