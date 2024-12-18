<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {computed, ref} from "vue";
import {type ConfigItem, ConfigType} from "@/utils/types";
import ConfigCard from "@/components/ConfigCard.vue";
import * as ai from "@/utils/AIReview";
import type { ReviewReply, ReviewArg } from "@/utils/AIReview";

const preset = ref<string>("beginner");

const configList = ref<ConfigItem[]>([
  { ind: 0, type: ConfigType.LANGUAGE, selected: true },
  { ind: 1, type: ConfigType.STRICTNESS, selected: true },
  { ind: 2, type: ConfigType.CODE_DESCRIPTION, selected: true },
  { ind: 3, type: ConfigType.METRICS, selected: false},
  { ind: 4, type: ConfigType.CUSTOM_CONFIG, selected: false}
]);

const sortedConfigList = computed<ConfigItem[]>(() => {
  return configList.value.sort((a, b) => {
    if (a.selected && !b.selected) return -1;
    if (!a.selected && b.selected) return 1;
    return a.ind - b.ind;
  });
});

const metricsArray: ai.Metrics[] = [ai.Metrics.Correctness, ai.Metrics.Efficiency, ai.Metrics.Readability];
const STRICT_LOW = ai.Strictness.Low;
const STRICT_MEDIUM = ai.Strictness.Medium;
const STRICT_HIGH = ai.Strictness.High;
const exampleCode = `function a(n) {
  if (n == 0) return n;
  if (n == 1) return n;
  return a(n - 1) + a(n - 2);
}`;
const exampleDescription = `This function calculates the nth Fibonacci number using recursion.`;

const startAiReview = async () => {
  console.log("AI Review started");
  let reviewReplies: ReviewReply[];
  reviewReplies = await ai.reviewCode({
    code: exampleCode,
    metrics: metricsArray,
    strictness: STRICT_MEDIUM,
    codeDescription: exampleDescription,
  });
};

</script>

<template>
  <div>
    <Editor class="editor"/>
    <v-container class="config-wrapper">
      <v-row>
        <div style="display: flex">
          <p class="h2 dark text-title">Reviewer Preset</p>
          <button class="info-button">
            <v-icon size="15px" icon="mdi-information-outline"/>
          </button>
        </div>
        <v-divider class="divider"/>
        <v-btn-toggle class="btn-group" v-model="preset" group color="var(--gray)">
          <v-btn value="beginner" size="large">Beginner</v-btn>
          <v-btn value="average" size="large">Average</v-btn>
          <v-btn value="pro" size="large"> Pro</v-btn>
          <v-btn value="custom" size="large">Custom</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row style="margin-top: 30px">
        <div style="display: flex">
          <p class="h2 dark text-title">Config</p>
          <button class="info-button">
            <v-icon size="15px" icon="mdi-information-outline"/>
          </button>
        </div>
        <v-divider class="divider"/>
      </v-row>
      <v-row class="config-list">
        <transition-group style="margin-top: -60px" name="card" tag="div" move-class="card-move">
          <ConfigCard
            v-for="config in sortedConfigList"
            :key="config.type"
            :name="config.type"
            :active="config.selected"
            @toggle-active="config.selected = !config.selected"
          />
        </transition-group>
      </v-row>
      <v-row justify="center">
        <v-btn color="var(--dark)" size="large" @click="startAiReview">
          <p class="h5 light">
            <v-icon>mdi-creation-outline</v-icon>
            Start AI Review
          </p>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.editor {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translate(0, -46%);
  width: 58%;
  height: 88vh;
}
.config-wrapper {
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translate(0, -46%);
  width: 35%;
  height: 88vh;
  padding: 20px;
}
.text-title {
  font-size: 30px;
}
.info-button {
  align-self: start;
}
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-group {
  width: 100%;
}
.config-list {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 500px;
  overflow-y: scroll;
}
.card {
  transition: transform 0.5s, opacity 0.5s;
}
.card-move {
  transition: transform 0.5s;
}
</style>
