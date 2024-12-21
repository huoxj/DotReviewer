<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import type {ReviewReply} from "@/utils/types";
import {PH_code, PH_reply} from "@/utils/placeholders";
import Editor from "@/components/Editor.vue";
import DiffEditor from "@/components/DiffEditor.vue";
import {sleep} from "openai/core";
import router from "@/router";
import {Tour, type TourStep} from "vue3-quick-tour";

const editor_view = ref();
const editor_fix = ref();
const editor_diff = ref();

const reviewResult = ref<ReviewReply[]>([])
const currentProblem = ref<ReviewReply[]>([])
const codeRaw = sessionStorage.getItem("code") || PH_code;
const codeRawSplit = codeRaw.split("\n");

reviewResult.value = sessionStorage.getItem("result") ? JSON.parse(sessionStorage.getItem("result")!) : PH_reply;
currentProblem.value = [reviewResult.value[0]]

function initEditorCode() {
  editor_view.value.setCode(currentProblem.value[0].fixedCode);
  editor_view.value.setLanguage(currentProblem.value[0].language);
  editor_fix.value.setCode(codeRaw);
  editor_fix.value.setLanguage(currentProblem.value[0].language);
}

const viewMode = ref(1);

onMounted(() => {
  initEditorCode();
  watch(currentProblem, () => {
    if (viewMode.value != 2 && editor_view.value) {
      editor_view.value.setCode(currentProblem.value[0].fixedCode);
    }
    if (viewMode.value == 2 && editor_diff.value) {
      editor_diff.value.setCode(getOriginalCode(), currentProblem.value[0].fixedCode);
    }
  })
  handleOpenTour();
})

function getOriginalCode() {
  return codeRawSplit.slice(currentProblem.value[0].lineBegin - 1, currentProblem.value[0].lineEnd).join("\n");
}

async function switchToOriginal() {
  viewMode.value = 0;
  await sleep(100);
  editor_view.value.setCode(getOriginalCode());
}

async function switchToAutofix() {
  viewMode.value = 1;
  await sleep(100);
  editor_view.value.setCode(currentProblem.value[0].fixedCode);
}

async function switchToDiff() {
  viewMode.value = 2;
  await sleep(100);
  editor_diff.value.setCode(getOriginalCode(), currentProblem.value[0].fixedCode);
}

const tourSteps: TourStep[] = [
  {
    el: () => document.getElementById("problem-drawer") as HTMLElement,
    title: "Problem List",
    message: "Here is a list of problems that AI has found in your code. Click on one to see more details.",
    placement: "right"
  },
  {
    el: () => document.getElementById("view-mode-toggle") as HTMLElement,
    title: "View Mode",
    message: "You can switch between the original code, AI fixed code, and a diff view.",
    placement: "right"
  },
  {
    el: () => document.getElementById("editor-view") as HTMLElement,
    title: "Code View",
    message: "You can see the code here and switch between different views.",
    placement: "right"
  },
  {
    el: () => document.getElementById("editor-fix") as HTMLElement,
    title: "Editor",
    message: "You can edit your code here and see the changes in real-time.",
    placement: "left"
  },
  {
    el: () => document.getElementById("continue-btn") as HTMLElement,
    title: "Continue",
    message: "Click here to continue reviewing your code.",
    placement: "top"
  }
]
const buttonText = {
  finish: {
    text: "Got it!"
  },
  prev: {
    text: "Prev"
  },
  next: {
    text: "Next"
  }
}
const showTour = ref(false);
const currentStep = ref(0);

function handleOpenTour() {
  let show = sessionStorage.getItem("showTour");
  if (!show) {
    showTour.value = true;
    sessionStorage.setItem("showTour", "true");
  }
}

</script>

<template>
  <div>
    <Tour
      :steps="tourSteps"
      mask
      arrow
      v-model:show="showTour"
      v-model:currentStep="currentStep"
      :button-props="buttonText"
    />
    <v-navigation-drawer
      id="problem-drawer"
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
<!--          <p class="h4">🛠️Fix</p>-->
<!--          <p class="text-large dark">-->
<!--            {{currentProblem[0].fixedCode}}-->
<!--          </p>-->
        </div>
        <div style="position: sticky; bottom: 0; height: 10%">
          <v-btn-toggle v-model="viewMode" class="toggle-btns" density="comfortable" id="view-mode-toggle">
            <v-btn variant="text" size="30px" value="0" @click="switchToOriginal">
              <v-icon size="24px">mdi-replay</v-icon>
              <v-tooltip activator="parent" location="top">Original</v-tooltip>
            </v-btn>
            <v-btn variant="text" size="30px" value="1" @click="switchToAutofix">
              <v-icon size="24px">mdi-auto-fix</v-icon>
              <v-tooltip activator="parent" location="top">AI Fix</v-tooltip>
            </v-btn>
            <v-btn variant="text" size="30px" value="2" @click="switchToDiff">
              <v-icon size="24px">mdi-code-tags</v-icon>
              <v-tooltip activator="parent" location="top">Diff View</v-tooltip>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="editor-view" id="editor-view">
        <CodeBlock
          v-if="viewMode != 2"
          style="height: 100%"
          :language="currentProblem[0].language"
          ref="editor_view"
          />
        <DiffEditor
          v-else
          style="height: 100%"
          :original-code="getOriginalCode()"
          :fixed-code="currentProblem[0].fixedCode"
          :language="currentProblem[0].language"
          ref="editor_diff"
        />
      </div>
    </div>

    <div class="preview-wrapper" id="editor-fix">
      <p class="h3 dark" style="height: 4vh">✨Editor</p>
      <Editor style="height: 84vh" class="editor-fix" ref="editor_fix"/>
    </div>

    <v-btn class="continue-wrapper" @click="router.push('/reviewer')" id="continue-btn">
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

  width: auto;
  height: 48vh;

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

  width: 150px;
  height: 55px;

  background-color: #f1f1f1;
  border-radius: 12px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
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
