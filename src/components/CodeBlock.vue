<script setup lang="ts">

import * as monaco from "monaco-editor";
import {onMounted, ref} from "vue";

const props = defineProps({
  code: String,
  language: String,
})

const editorDiv = ref<HTMLDivElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor>();
const code = ref<string>("");

onMounted(() => {
  if(props.code) {
    code.value = props.code;
  }
  if (editorDiv.value) {
    editor.value = monaco.editor.create(editorDiv.value, {
      value: code.value,
      fontSize: 18,
      theme: "myTheme",
      language: props.language,
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      readOnly: true,
      scrollbar: {
        handleMouseWheel: false
      }
    });
  }
})

</script>

<template>
  <div ref="editorDiv" class="code-block"/>
</template>

<style scoped>
.code-block {
  width: 100%;
  height: 100%;
}
</style>
