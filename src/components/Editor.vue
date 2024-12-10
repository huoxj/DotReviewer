<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted } from "vue";

const editorDiv = ref<HTMLDivElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null);
const code = ref<string>("// Type or paste your code here\n");

monaco.editor.defineTheme("myTheme", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ffffff30",
    "editor.selectionBackground": "#d4d4d4",
    "editor.lineHighlightBackground": "#f5f5f5",
    "editorWidget.border": "#f5f5f5",
  }
})

onMounted(() => {
  if (editorDiv.value) {
    editor.value = monaco.editor.create(editorDiv.value, {
      value: code.value,
      fontSize: 24,
      theme: "myTheme",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      cursorSmoothCaretAnimation: "on",
    });

  }
})

</script>

<template>
  <div ref="editorDiv" class="editor"/>
</template>

<style scoped>
.editor {
  border-radius: 30px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);

  overflow: hidden;
}

</style>
