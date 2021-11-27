import { Database } from '../interfaces';
import { DBOmit } from './common.enum';

/**
 * @description Used for removing undefined values in deep nested object
 * @param object Any object
 * @returns object clone with deep check for undefined values
 */
export const nullCheck = <T>(object: T): T => {
  const filtered = {} as T;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value =
        typeof object[key] === 'object' ? nullCheck(object[key]) : object[key];
      if (
        typeof value !== 'undefined' &&
        value !== null &&
        (value as unknown as string) !== ''
      ) {
        filtered[key] = value;
      }
    }
  }
  return filtered;
};

/**
 * @description Used for removing db related values in api object
 * @param object Any API object
 * @returns form value suitable for patch
 */
export const formify = <T>(
  object: T & Partial<Database>,
): Omit<T & Partial<Database>, DBOmit> => {
  const {
    _id,
    __v: version,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    ...rest
  } = object;
  return rest;
};
