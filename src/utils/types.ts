export enum ConfigType {
  LANGUAGE = 'language',
  STRICTNESS = 'strictness',
  CODE_DESCRIPTION = 'codeDescription',
  METRICS = 'metrics',
  CUSTOM_CONFIG = 'customConfig',
}

export type ConfigItem = {
  ind: number;
  type: ConfigType;
  selected: boolean;
}
