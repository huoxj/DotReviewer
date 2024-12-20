<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {ref} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import type {ReviewReply} from "@/utils/types";

const editor_view = ref();
const editor_fix = ref();

function test_insert() {
  editor_fix.value.test()
}

const reviewResult = ref<ReviewReply[]>([
  {
    problemIcon: "mdi-repeat-off",
    problemTitle: "Inefficient Recursive Approach",
    problemDesc: "The current implementation of the Fibonacci function uses a recursive approach, which is not efficient for large inputs due to the repeated computation of the same sub-problems. This can be improved using dynamic programming techniques.",
    lineBegin: 1,
    lineEnd: 4,
    fixedCode: "int fib(int n) {\n  int dp[n+1];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}"
  },
  {
    problemIcon: "mdi-head-check-outline",
    problemTitle: "Lack of Input Validation",
    problemDesc: "The function does not validate its input. It assumes that the input will always be a non-negative integer. However, it does not handle cases where the input is a negative integer or a non-integer value. This could lead to incorrect results or crashes.",
    lineBegin: 1,
    lineEnd: 1,
    fixedCode: "int fib(int n) {\n  if (n < 0) {\n    // Handle negative input, e.g., throw an exception\n    throw std::invalid_argument(\"Input must be a non-negative integer.\");\n  }\n  // ... rest of the function\n}"
  },
  {
    problemIcon: "mdi-stack-overflow",
    problemTitle: "Potential Integer Overflow",
    problemDesc: "For large inputs, the function may cause an integer overflow when calculating the Fibonacci number. This could result in incorrect results.",
    lineBegin: 1,
    lineEnd: 4,
    fixedCode: "long long fib(int n) {\n  // Use a larger data type to reduce the chance of overflow\n  long long dp[n+1];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    if (dp[i-1] > LLONG_MAX - dp[i-2]) {\n      // Handle potential overflow\n      throw std::overflow_error(\"Fibonacci number exceeds the maximum limit.\");\n    }\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}"
  }
])

const currentProblem = ref<ReviewReply[]>([reviewResult.value[0]])

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
          :key="item.problemTitle"
          :value="item"
          height="60px"
          rounded="xl"
          lines="two"
        >
          <template v-slot:prepend>
            <v-icon size="30px">{{item.problemIcon}}</v-icon>
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
        <Editor style="height: 100%" ref="editor-fix"/>
      </div>
    </div>

    <div class="preview-wrapper">
      <p class="h3 dark" style="height: 4vh">Preview✨</p>
      <CodeBlock style="height: 84vh" class="editor-view" ref="editor-view"/>
    </div>

    <v-btn class="continue-wrapper" @click="test_insert">
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
.problem-item {
  height: 70px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
