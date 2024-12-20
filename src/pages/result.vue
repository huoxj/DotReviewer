<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import type {ReviewReply} from "@/utils/types";
import {PH_code, PH_reply} from "@/utils/placeholders";
import FixEditor from "@/components/FixEditor.vue";

const editor_view = ref();
const editor_fix = ref();

const reviewResult = ref<ReviewReply[]>([])
const currentProblem = ref<ReviewReply[]>([])
const codeRaw = sessionStorage.getItem("code") || PH_code;

reviewResult.value = sessionStorage.getItem("result") ? JSON.parse(sessionStorage.getItem("result")!) : PH_reply;
currentProblem.value = [reviewResult.value[0]]

function initEditorCode() {
  editor_view.value.setCode(codeRaw);
  editor_view.value.setLanguage(currentProblem.value[0].language);
  editor_fix.value.setCode(currentProblem.value[0].fixedCode);
  editor_fix.value.setLanguage(currentProblem.value[0].language);
}

onMounted(() => {
  console.log(reviewResult.value)
  initEditorCode();
  watch(currentProblem, () => {
    if (editor_view.value) {
      editor_view.value.setCode(codeRaw);
      editor_view.value.setLanguage(currentProblem.value[0].language);
    }
    if (editor_fix.value) {
      editor_fix.value.setCode(currentProblem.value[0].fixedCode);
      editor_fix.value.setLanguage(currentProblem.value[0].language);
    }
  })
})

</script>

<template>
  <div>
    <v-navigation-drawer
      expand-on-hover
      rail
      color="#f1f1f166"
      class="problem-drawer"
    >
      <v-list
        v-model:selected="currentProblem"
      >
        <v-list-item
          v-for="item in reviewResult"
          :key="item.id"
          :value="item"
          height="60px"
          rounded="xl"
          lines="two"
        >
          <template v-slot:prepend>
            <v-icon size="28px">{{item.problemIcon}}</v-icon>
          </template>
          <template v-slot:title>
            {{item.problemTitle}}
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="left-wrapper">
      <div class="info-wrapper">
        <p class="h2 dark" style="height: 20%">
          {{currentProblem[0].problemTitle}}
        </p>
        <v-divider></v-divider>
        <div style="overflow-y: scroll; height: 70%">
          <p class="h4">📃Details</p>
          <p class="text-large dark">
            {{currentProblem[0].problemDesc}}
          </p>
          <p class="h4">🛠️Fix</p>
          <p class="text-large dark">
            {{currentProblem[0].fixedCode}}
          </p>
        </div>
        <div style="position: sticky; bottom: 0; height: 10%">
          <div class="toggle-btns">
            <v-fab variant="text" size="24px">
              <v-icon size="24px">mdi-replay</v-icon>
              <v-tooltip activator="parent" location="bottom">Reset to Original</v-tooltip>
            </v-fab>
            <v-fab variant="text" size="24px">
              <v-icon size="24px">mdi-auto-fix</v-icon>
              <v-tooltip activator="parent" location="bottom">Reset to Autofix</v-tooltip>
            </v-fab>
          </div>
          <div class="fix-btn">
            <v-btn variant="text" style="border-radius: 12px; background-color: #9baec8;">Push fix</v-btn>
          </div>
        </div>
      </div>
      <v-divider thickness="5px" />

      <div class="editor-fix">
        <FixEditor style="height: 100%" ref="editor_fix"/>
      </div>
    </div>

    <div class="preview-wrapper">
      <p class="h3 dark" style="height: 4vh">Preview✨</p>
      <CodeBlock style="height: 84vh" class="editor-view" ref="editor_view"/>
    </div>

    <v-btn class="continue-wrapper" @click="">
      <p>Continue Review</p>
      <v-icon size="24px" icon="mdi-chevron-right"/>
    </v-btn>
  </div>
</template>

<style scoped>
.preview-wrapper {
  position: absolute;
  top: 10vh;
  left: auto;
  right: 2vw;
  width: 45%;
  height: 88vh;
}
.editor-view {
  border-radius: 30px;
  backdrop-filter: blur(20px);

  overflow: hidden;

  border-style: solid;
  border-width: 1px;
  border-color: var(--gray);
}
.problem-drawer {
  position: absolute;
  top: 50vh;

  margin-left: 1vw;
  margin-top: 9vh;

  height: auto;
  max-height: 90vh;
  min-width: 3vw;

  border-radius: 15px;
  backdrop-filter: blur(10px);
}
.left-wrapper {
  position: absolute;
  top: 10vh;
  left: 5vw;
  width: 46%;
  height: 88vh;
}
.editor-fix {
  width: auto;
  height: 47vh;
}
.info-wrapper {
  position: relative;
  width: auto;
  height: 40vh;
  padding: 10px;
}

.toggle-btns {
  position: absolute;
  left: 1vw;

  width: 100px;
  height: 35px;

  background-color: #f1f1f1;
  border-radius: 12px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-left: 20px;
}

.fix-btn {
  position: absolute;
  right: 2vw;
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
