<script setup lang="ts">
import * as monaco from "monaco-editor";
import {ref, onMounted, toRaw} from "vue";

const editorDiv = ref<HTMLDivElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();
const code = ref<string>("// Type or paste your code here\n");

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

const test = () => {
  const range = new monaco.Range(1, 1, 2, 1);
  toRaw(editor.value)?.getModel()?.deltaDecorations([], [
    {
      range: range,
      options: {
        isWholeLine: true,
        className: "myInlineDecoration"
      }
    }
  ]);
}

editor.value?.onDidChangeModel(() => {
  code.value = toRaw(editor.value)?.getValue() || "";
})

defineExpose({
  test
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
.myInlineDecoration {
  background: lightgreen;
}

</style>
