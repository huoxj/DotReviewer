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

export enum Metrics {
  Readability = "readability",
  Efficiency = "efficiency",
  Maintainability = "maintainability",
  Correctness = "correctness",
  Security = "security",
}

export enum Strictness {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface ReviewArg {
  code: string;
  strictness?: Strictness;
  metrics?: Metrics[];
  codeDescription?: string;
  language?: string;
  customConfig?: string;
}

export interface ReviewReply {
  id: number;
  problemIcon?: string;
  problemTitle: string;
  problemDesc: string;
  lineBegin: number;
  lineEnd: number;
  language?: string;
  fixedCode: string;
  valid?: boolean;
}
