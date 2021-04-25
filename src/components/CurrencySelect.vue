<template>
  <select
    :id="`${id}-currency`"
    aria-label="Change Currency"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
    <option v-for="currency in currencies" :key="currency" :value="currency">
      {{ currency }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    currencies: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
select {
  max-width: 100px;
  height: 100%;
  font-size: 1.5rem;
  padding-left: 15px;
}
</style>