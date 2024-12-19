<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import {computed, ref, watch} from "vue";
import {type ConfigItem, ConfigType} from "@/utils/types";
import ConfigCard from "@/components/ConfigCard.vue";
import {constructConfigJson} from "@/utils/configParser";
import {configList, preset, switchPresetAverage, switchPresetBeginner, switchPresetPro} from "@/utils/configStorage";
import router from "@/router";

const sortedConfigList = computed<ConfigItem[]>(() => {
  return configList.value.sort((a, b) => {
    if (a.selected && !b.selected) return -1;
    if (!a.selected && b.selected) return 1;
    return a.ind - b.ind;
  });
});

const toResult = () => {
  //console.log(constructConfigJson())
  router.push('/result')
};

</script>

<template>
  <div>
    <Editor class="editor"/>
    <v-container class="config-wrapper">
      <v-row>
        <div style="display: flex">
          <p class="h2 dark text-title">Overall Presets</p>
          <button class="info-button">
            <v-icon size="15px" icon="mdi-information-outline"/>
          </button>
        </div>
        <v-divider class="divider"/>
        <v-btn-toggle class="btn-group" v-model="preset" group color="var(--gray)">
          <v-btn value="beginner" size="large" @click="switchPresetBeginner()">Beginner</v-btn>
          <v-btn value="average" size="large" @click="switchPresetAverage()">Average</v-btn>
          <v-btn value="pro" size="large" @click="switchPresetPro()"> Pro</v-btn>
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
        <transition-group name="card" tag="div" move-class="card-move">
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
        <v-btn color="var(--dark)" size="large" @click="toResult">
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
  border-radius: 8px;
}
.btn-group .v-btn {
  border-radius: 8px;
}
.config-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 64%;
  overflow-y: scroll;

  margin-bottom: 20px;
}
.card {
  transition: transform 0.5s, opacity 0.5s;
}
.card-move {
  transition: transform 0.5s;
}
</style>
