<script lang="ts" setup>
import {ref} from "vue";




</script>

<template>
  <div class="background-wave"></div>

</template>

<style>
.background-wave {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: url(@/assets/wave.svg) repeat-x;
  z-index: 0;
}
</style>
