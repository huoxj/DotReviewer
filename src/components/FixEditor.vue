<script setup lang="ts">
import * as monaco from "monaco-editor";
import {ref, onMounted, toRaw, watch} from "vue";
import {tr} from "vuetify/locale";

const props = defineProps({
  code: String
});

const editorDiv = ref<HTMLDivElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();

onMounted(() => {
  if (editorDiv.value) {
    editor.value = monaco.editor.create(editorDiv.value, {
      value: props.code,
      fontSize: 24,
      theme: "myTheme",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      cursorSmoothCaretAnimation: true,
    });
  }
})

function setCode(newCode: string) {
  if (editor.value) {
    toRaw(editor.value).setValue(newCode);
  }
}

function setLanguage(language: string) {
  console.log(language);
  if (editor.value) {
    monaco.editor.setModelLanguage(toRaw(editor.value).getModel()!, language);
  }
}

function getCode(): string {
  if (editor.value) {
    return toRaw(editor.value).getValue();
  }
  return "";
}

defineExpose({
  setCode,
  getCode,
  setLanguage
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
