<template>
  <div class="inputGroup">
    <label data-testid="input-label" :for="id">{{ title }}</label>
    <input
      data-testid="input"
      :id="id"
      type="number"
      :value="value"
      @input="onInput"
      :disabled="disabled"
      @focus="$emit('focus', id)"
      placeholder="12345.67"
      pattern="\d*"
    />
  </div>
</template>

<script>
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
  max-width: 230px;
  height: 100%;
}
</style>