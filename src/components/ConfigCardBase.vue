<script setup lang="ts">

import {computed, ref} from "vue";

const emit = defineEmits(['toggleActive'])

const props = defineProps({
  name: String || undefined,
  isRow: Boolean,
  info: String,
  active: Boolean
})

const configName = ref(props.name)
const info = ref(props.info)
const hasInfo = ref(props.info !== undefined)
const isRow = ref(props.isRow)
const active = ref(props.active)

const getInActive = computed(() => active.value ? 'card-active' : 'card-inactive')

function toggleActive() {
  active.value = !active.value
  emit('toggleActive')
}

</script>

<template>
  <!--单行的配置卡片-->
  <v-card :class="'card ' + getInActive" variant="outlined">
    <v-container v-if="isRow" class="content">
      <v-row>
        <v-col md="3" align-self="center">
          <v-row>
            <p class="text-large dark">{{ configName }}</p>
            <v-tooltip v-if="hasInfo" :text="info">
              <template #activator="{ props }">
                <button v-if="hasInfo" v-bind="props">
                  <v-icon size="15px" icon="mdi-information-outline"/>
                </button>
              </template>
            </v-tooltip>
          </v-row>
        </v-col>
        <v-col style="display: flex; justify-content: center; ">
          <slot></slot>
        </v-col>
        <v-col md="1" align-self="center">
          <button @click="toggleActive">
            <v-icon v-if="active"> mdi-close </v-icon>
            <v-icon v-if="!active"> mdi-plus </v-icon>
          </button>
        </v-col>

      </v-row>
    </v-container>

    <!--多行的配置卡片-->
    <v-container v-if="!isRow" class="content">
      <v-row>
        <v-col md="11">
          <v-row>
            <p class="text-large dark">{{ configName }}</p>
            <v-tooltip v-if="hasInfo" :text="info">
              <template #activator="{ props }">
                <button v-if="hasInfo" v-bind="props">
                  <v-icon size="15px" icon="mdi-information-outline"/>
                </button>
              </template>
            </v-tooltip>
          </v-row>
          <v-row style="display: flex; justify-content: center; ">
            <slot></slot>
          </v-row>
        </v-col>
        <v-col md="1" align-self="center">
          <button  @click="toggleActive">
            <v-icon v-if="active"> mdi-close </v-icon>
            <v-icon v-if="!active"> mdi-plus </v-icon>
          </button>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.card {
  width: 100%;
  height: auto;

  margin-bottom: 20px;

  overflow: hidden;

  background-color: #ffffff;
  backdrop-filter: blur(5px);

  border-color: #282c3755;
  border-radius: 10px;
}
.card-active {
  opacity: 100%;
}
.card-inactive {
  opacity: 30%;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;

  padding-left: 35px;
}
</style>
