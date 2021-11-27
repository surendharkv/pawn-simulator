export type KeyValue = { [key: string]: string | number };

export type Value = string | number | boolean;

export type HTMLTags = keyof HTMLElementTagNameMap;

export type HTMLTypes = { [key in HTMLTags]?: string };

export enum LibError {
  noControl = 'No Form Control detected',
  default = 'Unknown Error',
}
