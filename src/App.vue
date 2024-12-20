<template>
  <v-app>
    <Header></Header>
    <v-main style="z-index: 1; height: 92vh; margin-top: 8vh">
      <router-view v-slot:="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </v-main>
  </v-app>
  <div class="background-wave" />

</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
