<script setup lang="ts">
import * as monaco from "monaco-editor";
import {ref, onMounted, toRaw, watch} from "vue";
import {tr} from "vuetify/locale";

const editorDiv = ref<HTMLDivElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();
const code = ref<string>(sessionStorage.getItem("code") || "// Write your code here");

onMounted(() => {
  if(!sessionStorage.getItem("code")) sessionStorage.setItem("code", code.value);
  if (editorDiv.value) {
    editor.value = monaco.editor.create(editorDiv.value, {
      value: code.value,
      fontSize: 24,
      theme: "myTheme",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      cursorSmoothCaretAnimation: true,
    });
    editor.value.onDidChangeModelContent(() => {
      code.value = toRaw(editor.value)?.getValue() || "";
      sessionStorage.setItem("code", code.value);
    });
  }
})

defineExpose({

})

</script>

<template>
  <div ref="editorDiv" class="editor-style-big"/>
</template>

<style scoped>
.myInlineDecoration {
  background: lightgreen;
}

</style>
