<template>
  <div id="app">
    <contents></contents>
  </div>
</template>

<script>
import axios from "axios";
import Contents from "./components/Contents";

export default {
  name: "app",
  components: {
    Contents
  }
};
</script>

<style lang="less">
</style>
