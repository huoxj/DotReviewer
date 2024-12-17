<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {ref} from "vue";
import ResultItem from "@/components/ResultItem.vue";

const editor = ref();

function test_insert() {
  editor.value.test()
}

</script>

<template>
  <div>
    <Editor class="editor editor-result" ref="editor"/>
    <v-container class="info-wrapper">
      <v-row>
        <p class="h2 dark text-title">Results</p>
        <v-divider class="divider"/>
      </v-row>
      <v-row class="result-wrapper" align-content="start">
        <ResultItem v-for="item in [1, 2, 3, 4, 5]" key="item"/>
      </v-row>
    </v-container>
    <v-btn class="continue-wrapper">
      <p>Continue Review</p>
      <v-icon size="24px" icon="mdi-chevron-right"/>
    </v-btn>
  </div>
</template>

<style scoped>
.editor-result {
  width: 50vw;
}
.info-wrapper {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -46%);
  width: 40%;
  height: 88vh;
  padding: 20px;
}
.result-wrapper {
  margin-top: 30px;
  height: 60vh;
  overflow-y: scroll;
}
.continue-wrapper {
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  width: 240px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: var(--light);
  border-radius: 30px;
  opacity: 60%;
}
</style>
