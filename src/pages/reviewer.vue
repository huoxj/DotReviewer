<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {ref} from "vue";

const preset = ref<string>("Beginner");

</script>

<template>
  <div class="background-wave" />
  <Editor class="editor"/>

  <v-container class="config-wrapper">
    <v-row>
      <div style="display: flex">
        <p class="h2 dark text-title">Reviewer Preset</p>
        <button class="info-button">
          <v-icon size="15px" icon="mdi-information-outline"/>
        </button>
      </div>
      <v-divider class="divider"/>
      <v-btn-toggle v-model="preset" group>
        <v-btn>Beginner</v-btn>
        <v-btn>Average</v-btn>
        <v-btn>Pro</v-btn>
        <v-btn>Custom</v-btn>
      </v-btn-toggle>
    </v-row>
  </v-container>
</template>

<style scoped>
.editor {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translate(0, -46%);
  width: 58%;
  height: 88vh;
}
.config-wrapper {
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translate(0, -46%);
  width: 35%;
  height: 88vh;
  padding: 20px;
}
.text-title {
  font-size: 30px;
}
.info-button {
  align-self: start;
}
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
