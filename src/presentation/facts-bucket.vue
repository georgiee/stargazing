<template>
  <div class="base">
    im your fact bucket
  </div>
</template>

<script>

export default {
  name: "App",
  onClick () {
    window.alert(this.message)
  }
};
</script>

<style>
.base {
  border: 1px solid red;
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  color: red;
}
</style>
