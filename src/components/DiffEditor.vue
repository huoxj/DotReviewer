<script setup lang="ts">

import {onMounted, ref, toRaw} from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  originalCode: String,
  fixedCode: String,
  language: String
})

const diffEditorDiv = ref<HTMLDivElement | null>(null);
const diffEditor = ref<monaco.editor.IDiffEditor>();

onMounted(() => {
  if (diffEditorDiv.value) {
    diffEditor.value = monaco.editor.createDiffEditor(diffEditorDiv.value, {
      fontSize: 18,
      theme: "myTheme",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      readOnly: true,
      enableSplitViewResizing: false,
      renderSideBySide: false
    });
    let originalModel = monaco.editor.createModel(<string>props.originalCode, props.language),
        fixedModel = monaco.editor.createModel(<string>props.fixedCode, props.language);
    toRaw(diffEditor.value)?.setModel({
      original: originalModel,
      modified: fixedModel
    });
  }
})

function setCode(originalCode: string, fixedCode: string) {
  if (diffEditor.value) {
    let originalModel = monaco.editor.createModel(originalCode, props.language),
        fixedModel = monaco.editor.createModel(fixedCode, props.language);
    toRaw(diffEditor.value)?.setModel({
      original: originalModel,
      modified: fixedModel
    });
  }
}

defineExpose({
  setCode
})

</script>

<template>
  <div ref="diffEditorDiv" class="diff-editor"/>
</template>

<style scoped>

</style>
