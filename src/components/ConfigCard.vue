<script setup lang="ts">

import ConfigCardBase from "@/components/ConfigCardBase.vue";
import {ConfigType} from "@/utils/types";
import {ref} from "vue";

const props = defineProps({
  name: String,
  active: Boolean
})

const configType = ref<ConfigType>(props.name as ConfigType)
const active = ref<boolean>(props.active)

const emit = defineEmits(['toggleActive'])

function toggleActive() {
  emit('toggleActive')
}

// Language
const language = ref<string>("Auto Detect")

// Strictness
const strictness = ref<number>(0.5)
const strictnessEmojis = ref<string[]>(["🥱", "😃", "🤨", "🤯", "😇"])
const num2Emoji = (num: number) =>
  strictnessEmojis.value[Math.min(
      Math.floor(num * strictnessEmojis.value.length),
      strictnessEmojis.value.length - 1
    )]

</script>

<template>
  <div>
    <ConfigCardBase
      v-if="configType == ConfigType.LANGUAGE"
      @toggle-active="toggleActive"
      name="Language"
      :is-row="true"
      :active="active"
      info="Select the language of the code you want to review."
    >
      <v-select
        v-model="language"
        :items="['Auto Detect', 'C', 'C++', 'Java', 'Python']"
        variant="underlined"
        style="height: 40px; width: 250px; margin-top: -18px"
      />
    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.STRICTNESS"
      @toggle-active="toggleActive"
      name="Strictness"
      :is-row="true"
      :active="active"
      info="Select the strictness level of the code review."
    >
      <v-slider
        v-model="strictness"
        :max="1"
        :min="0"
        step="0.1"
        style="height: 40px;margin-bottom: -5px"
      >
        <template #append>
          <div style="margin-left: 10px; font-size: 25px">{{ num2Emoji(strictness) }}</div>
        </template>
      </v-slider>
    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.CODE_DESCRIPTION"
      @toggle-active="toggleActive"
      name="Code Description"
      :is-row="false"
      :active="active"
      info="Add a description to the code you want to review."
    >

    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.METRICS"
      @toggle-active="toggleActive"
      name="Metrics"
      :is-row="false"
      :active="active"
      info="Select the metrics you want to include in the code review."
    >

    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.CUSTOM_CONFIG"
      @toggle-active="toggleActive"
      name="Custom Config"
      :is-row="false"
      :active="active"
      info="Create a custom configuration for the code review."
    >

    </ConfigCardBase>
  </div>
</template>

<style scoped>

</style>
