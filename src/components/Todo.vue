<template>
  <button
    class="list-group-item text-left"
    @click="clickButton"
    v-bind:key="todo.index in activeTodoList"
  >{{ label }}</button>
</template>
<script>
export default {
  props: ["label"],
  methods: {
    clickButton() {
      this.$emit("componentClick");
    }
  }
};
</script>
