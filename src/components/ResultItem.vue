<script setup lang="ts">

import {ref} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";

const title = ref<string>("Code Duplication Leading to Redundancy");
const details = ref<string>("The four for-loop structures are highly repetitive, with identical logic except for the variables, which reduces code maintainability.");
const fix = ref<string>("Encapsulate the repetitive logic into a function.");
const fix_code = ref<string>("void find_max(int arr[3][3], int rows, int cols, int *m, int *x, int *y, int exclude_x, int exclude_y) {\n    *m = INT_MIN;\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++) {\n            if ((arr[i][j] > *m) && (i - exclude_x + j - exclude_y != 0)) {\n                *m = arr[i][j];\n                *x = i;\n                *y = j;\n            }\n        }\n    }\n}");

</script>

<template>
  <v-expansion-panels class="wrapper">
    <v-expansion-panel color="var(--light)">
      <v-expansion-panel-title>
        <div class="title">
          <p class="h4">{{ title }}</p>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p class="h4">📃Details</p>
        <p class="text-medium">{{ details }}</p>
        <p class="h4">🛠️Fix</p>
        <p class="text-medium">{{fix}}</p>
        <div class="code-wrapper">
          <CodeBlock :code="fix_code" language="c"/>
        </div>
        <div class="options-wrapper">
          <v-btn style="margin-right: auto">Auto fix</v-btn>
          <div class="feedback-wrapper">
            <v-fab variant="text" size="24px" icon="mdi-thumb-up-outline"/>
            <v-fab variant="text" size="24px" icon="mdi-thumb-down-outline"/>
            <v-fab variant="text" size="24px" icon="mdi-comment-text-outline"/>
            <v-fab variant="text" size="24px" icon="mdi-reload"/>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.wrapper{
  width: 100%;
  padding-bottom: 30px;
}
.code-wrapper{
  width: 100%;
  height: 200px;
}
.options-wrapper{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
}
.feedback-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  width: 200px;

  background: #f1f1f1;

  border-radius: 15px;
}
</style>
