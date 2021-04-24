<template>
  <div class="inputGroup">
    <label for="currency">{{ title }}</label>
    <input
      :id="id"
      type="text"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
      :disabled="disabled"
      @focus="$emit('focus', id)"
    />
  </div>
</template>

<script>
export default {
  name: "CurrencyInput",
  props: {
    id: String,
    title: String,
    value: String,
    disabled: Boolean,
  },
};
</script>

<style scoped lang="scss">
.inputGroup {
  position: relative;
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