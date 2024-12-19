import {ref, watch} from "vue";
import type {ConfigItem} from "@/utils/types";
import {ConfigType} from "@/utils/types";
import {tr} from "vuetify/locale";

export const code = ref<string>("");

export const preset = ref<string>("average");

export const language = ref("AutoDetect");

export const strictness = ref(0.5);

export const codeDescription = ref<string>("");

export const metrics = ref<string[]>([]);

export const customConfig = ref<string>("");

export const configList = ref<ConfigItem[]>([
  { ind: 0, type: ConfigType.LANGUAGE, selected: true },
  { ind: 1, type: ConfigType.STRICTNESS, selected: true },
  { ind: 2, type: ConfigType.CODE_DESCRIPTION, selected: true },
  { ind: 3, type: ConfigType.METRICS, selected: false},
  { ind: 4, type: ConfigType.CUSTOM_CONFIG, selected: false}
]);

let changedToPreset = false;

export function switchPresetBeginner () {
  preset.value = "beginner";
  language.value = "AutoDetect";
  strictness.value = 0.3;
  codeDescription.value = "";
  metrics.value = ["readability", "correctness"];
  customConfig.value = "";
  configList.value = [
    { ind: 0, type: ConfigType.LANGUAGE, selected: true },
    { ind: 1, type: ConfigType.STRICTNESS, selected: true },
    { ind: 2, type: ConfigType.METRICS, selected: true},
    { ind: 3, type: ConfigType.CODE_DESCRIPTION, selected: false },
    { ind: 4, type: ConfigType.CUSTOM_CONFIG, selected: false}
  ];
  changedToPreset = true;
}

export function switchPresetAverage () {
  preset.value = "average";
  language.value = "AutoDetect";
  strictness.value = 0.5;
  codeDescription.value = "";
  metrics.value = ["readability", "efficiency", "correctness"];
  customConfig.value = "";
  configList.value = [
    { ind: 0, type: ConfigType.LANGUAGE, selected: true },
    { ind: 1, type: ConfigType.STRICTNESS, selected: true },
    { ind: 2, type: ConfigType.CODE_DESCRIPTION, selected: true },
    { ind: 3, type: ConfigType.METRICS, selected: true},
    { ind: 4, type: ConfigType.CUSTOM_CONFIG, selected: false}
  ];
  changedToPreset = true;
}

export function switchPresetPro () {
  preset.value = "pro";
  language.value = "AutoDetect";
  strictness.value = 0.9;
  codeDescription.value = "";
  metrics.value = ["readability", "efficiency", "maintainability", "security"];
  customConfig.value = "";
  configList.value = [
    { ind: 0, type: ConfigType.LANGUAGE, selected: true },
    { ind: 1, type: ConfigType.STRICTNESS, selected: true },
    { ind: 2, type: ConfigType.CODE_DESCRIPTION, selected: true },
    { ind: 3, type: ConfigType.METRICS, selected: true},
    { ind: 4, type: ConfigType.CUSTOM_CONFIG, selected: true}
  ];
  changedToPreset = true;
}

function initConfig() {
  console.log("initConfig");
  if(sessionStorage.getItem("code")) code.value = sessionStorage.getItem("code") as string;
  else sessionStorage.setItem("code", code.value);

  if(sessionStorage.getItem("preset")) preset.value = sessionStorage.getItem("preset") as string;
  else sessionStorage.setItem("preset", preset.value);

  if(sessionStorage.getItem("language")) language.value = sessionStorage.getItem("language") as string;
  else sessionStorage.setItem("language", language.value);

  if(sessionStorage.getItem("strictness"))
    strictness.value = parseFloat(sessionStorage.getItem("strictness") as string);
  else sessionStorage.setItem("strictness", strictness.value.toString());

  if(sessionStorage.getItem("codeDescription"))
    codeDescription.value = sessionStorage.getItem("codeDescription") as string;
  else sessionStorage.setItem("codeDescription", codeDescription.value);

  if(sessionStorage.getItem("metrics"))
    metrics.value = JSON.parse(sessionStorage.getItem("metrics") as string);
  else sessionStorage.setItem("metrics", JSON.stringify(metrics.value));

  if(sessionStorage.getItem("customConfig"))
    customConfig.value = sessionStorage.getItem("customConfig") as string;
  else sessionStorage.setItem("customConfig", customConfig.value);

  if(sessionStorage.getItem("configList"))
    configList.value = JSON.parse(sessionStorage.getItem("configList") as string);
  else sessionStorage.setItem("configList", JSON.stringify(configList.value));
}

function watchConfig() {
  watch(code, (newVal) => {
    sessionStorage.setItem("code", newVal);
  })
  watch(preset, (newVal) => {
    sessionStorage.setItem("preset", newVal);
  })
  watch(language, (newVal) => {
    sessionStorage.setItem("language", newVal);
  })
  watch(strictness, (newVal) => {
    sessionStorage.setItem("strictness", newVal.toString());
  })
  watch(codeDescription, (newVal) => {
    sessionStorage.setItem("codeDescription", newVal);
  })
  watch(metrics, (newVal) => {
    sessionStorage.setItem("metrics", JSON.stringify(newVal));
  })
  watch(customConfig, (newVal) => {
    sessionStorage.setItem("customConfig", newVal);
  })
  watch(configList, (newVal) => {
    sessionStorage.setItem("configList", JSON.stringify(newVal));
    if(changedToPreset) changedToPreset = false;
    else preset.value = "custom";
  }, {deep: true})
}

initConfig();
watchConfig();
