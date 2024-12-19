import type {ReviewArg} from "@/utils/AIReview";
import {Metrics, Strictness} from "@/utils/AIReview";
import type {ConfigItem} from "@/utils/types";
import {ConfigType} from "@/utils/types";

const strictNess = [Strictness.Low, Strictness.Medium, Strictness.High];

export function constructConfigJson(): ReviewArg {
  // code
  let code = sessionStorage.getItem("code");
  // language
  let language = sessionStorage.getItem("language");
  // strictness
  let strictness = sessionStorage.getItem("strictness") as Strictness;
  if (strictness) {
    strictness = strictNess[Math.floor((parseFloat(strictness) * strictNess.length))];
  }
  // metrics
  let metrics_json = sessionStorage.getItem("metrics");
  let metrics_str: String[] = [];
  let metrics: Metrics[] = [];
  if(metrics_json) {
    metrics_str = JSON.parse(metrics_json);
    for (let i = 0;i < metrics_str.length; i++) {
      metrics[i] = metrics_str[i] as Metrics;
    }
  }
  // codeDescription
  let codeDescription = sessionStorage.getItem("codeDescription");
  // customConfig
  let customConfig = sessionStorage.getItem("customConfig");

  if(!code) {
    throw new Error("Code is not provided");
  }

  // active
  let configList_json = sessionStorage.getItem("configList");
  let languageActive = false,
    strictnessActive = false,
    metricsActive = false,
    codeDescriptionActive = false,
    customConfigActive = false;
  if(!configList_json) {
    throw new Error("Config List is not provided");
  }
  let ConfigList = JSON.parse(configList_json) as ConfigItem[];
  for (let i = 0; i < ConfigList.length; i++) {
    let item = ConfigList[i];
    if(item.selected) {
      if(item.type == ConfigType.LANGUAGE) {
        languageActive = true;
      } else if(item.type == ConfigType.STRICTNESS) {
        strictnessActive = true;
      } else if(item.type == ConfigType.METRICS) {
        metricsActive = true;
      } else if(item.type == ConfigType.CODE_DESCRIPTION) {
        codeDescriptionActive = true;
      } else if(item.type == ConfigType.CUSTOM_CONFIG) {
        customConfigActive = true;
      }
    }
  }

  let config: ReviewArg = {
    code: code
  }
  if(language && languageActive) {
    config.language = language;
  }
  if(strictness && strictnessActive) {
    config.strictness = strictness;
  }
  if(metrics && metrics.length > 0 && metricsActive) {
    config.metrics = metrics;
  }
  if(codeDescription && codeDescriptionActive) {
    config.codeDescription = codeDescription;
  }
  if(customConfig && customConfigActive) {
    config.customConfig = customConfig;
  }
  return config;
}
