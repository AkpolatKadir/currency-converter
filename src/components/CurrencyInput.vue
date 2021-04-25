<template>
  <div class="inputGroup">
    <label data-testid="input-label" :for="id">{{ title }}</label>
    <input
      data-testid="input"
      :id="id"
      type="text"
      :value="value"
      @input="onInput"
      :disabled="disabled"
      @focus="$emit('focus', id)"
    />
  </div>
</template>

<script>
import { getSanitizedInputValue } from "../utils";

export default {
  name: "CurrencyInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(e) {
      e.target.value = getSanitizedInputValue(e.target.value);
      if (e.target.value) this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped>
.inputGroup {
  position: relative;
  margin-right: 15px;
}

label {
  position: absolute;
  top: -22px;
}

input {
  font-size: 1.5rem;
  width: 230px;
  height: 100%;
}
</style>