<script setup lang="ts">

import ConfigCardBase from "@/components/ConfigCardBase.vue";
import {ConfigType} from "@/utils/types";
import {ref, watch} from "vue";
import {language, strictness, codeDescription, metrics, customConfig} from "@/utils/configStorage";

const props = defineProps({
  name: String,
  active: Boolean
})

const configType = ref<ConfigType>(props.name as ConfigType)

const emit = defineEmits(['toggleActive', 'changeLanguage'])

function toggleActive() {
  emit('toggleActive')
}

watch(language, (newVal) => {
  if (configType.value == ConfigType.LANGUAGE) {
    emit('changeLanguage', newVal)
  }
})

const emojiList = ['😄', '😐', '😇']
const num2Emoji = (num: number) => emojiList[Math.floor(num * 3)]

</script>

<template>
  <div>
    <ConfigCardBase
      v-if="configType == ConfigType.LANGUAGE"
      @toggle-active="toggleActive"
      name="Language"
      :is-row="true"
      :active="props.active"
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
      :active="props.active"
      info="Select the strictness level of the code review."
    >
      <v-slider
        v-model="strictness"
        :max="0.99"
        :min="0"
        step="0.11"
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
      :active="props.active"
      info="Add a description to the code you want to review."
    >
      <v-textarea
        variant="outlined"
        :disabled="!props.active"
        :auto-grow="true"
        rows="1"
        v-model="codeDescription"
        placeholder="Briefly describe function of the code."
      />
    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.METRICS"
      @toggle-active="toggleActive"
      name="Metrics"
      :is-row="false"
      :active="props.active"
      info="Select the metrics you want to include in the code review."
    >
      <div class="checkbox-wrapper">
        <v-checkbox
          v-model="metrics"
          label="📖Readability"
          value="readability"
          :disabled="!props.active"
          class="checkbox text-small"
        />
        <v-checkbox
          v-model="metrics"
          label="✔️Correctness"
          value="correctness"
          :disabled="!props.active"
          class="checkbox text-small"
        />
        <v-checkbox
          v-model="metrics"
          label="📈Efficiency"
          value="efficiency"
          :disabled="!props.active"
          class="checkbox text-small"
        />
        <v-checkbox
          v-model="metrics"
          label="🛠️Maintainability"
          value="maintainability"
          :disabled="!props.active"
          class="checkbox text-small"
        />
        <v-checkbox
          v-model="metrics"
          label="🛡️Security"
          value="security"
          :disabled="!props.active"
          class="checkbox text-small"
        />
      </div>
    </ConfigCardBase>
    <ConfigCardBase
      v-if="configType == ConfigType.CUSTOM_CONFIG"
      @toggle-active="toggleActive"
      name="Custom Config"
      :is-row="false"
      :active="props.active"
      info="Create a custom configuration for the code review."
    >
      <v-textarea
        variant="outlined"
        :disabled="!props.active"
        :auto-grow="true"
        rows="1"
        v-model="customConfig"
        placeholder="Enter custom configuration in natural language."
      />
    </ConfigCardBase>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.checkbox {
  width: 50%;
  height: 45px;
}
</style>
