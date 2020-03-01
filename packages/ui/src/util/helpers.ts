import { PaginatedData, ErrorCode } from '@shared/types';
import { Option } from '../components/Form/AriaSelect';
import { GraphQLError } from 'graphql';

export const stall = async (delay: number) => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export interface MapSelectOptionAttributes {
  label?: (value: any) => string;
  value?: (value: any) => any;
}

export const mapSelectOptions = (values: any[], optionMap?: MapSelectOptionAttributes) => {
  const result: Option[] = values.map(value => mapSelectOption(value, optionMap));
  return result;
};

export const filterObjectProperties = (obj: Object, keys: string[]) => {
  const result = {};

  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) result[key] = obj[key];
    else result[key] = undefined;
  });

  return result;
};

export const paginatedData = <T>() => {
  const result: PaginatedData<T> = {
    pageInfo: {
      hasNextPage: false,
      cursor: undefined
    },
    data: [],
    isLoaded: false
  };

  return result;
};

export const mapSelectOption = (value: any, optionMap?: MapSelectOptionAttributes) => {
  let label = value;

  if (optionMap) {
    label = optionMap.label ? optionMap.label(value) : value;
    value = optionMap.value ? optionMap.value(value) : value;
  }

  const result: Option = { label, value };

  return result;
};

export const getObjectProperty = <T>(obj: object, s: string) => {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot

  let propertyArr = s.split('.');

  for (let i = 0; i <= propertyArr.length; i++) {
    const property = propertyArr[i];

    if (obj instanceof Object && property in obj) {
      obj = obj[property];
    } else {
      if (i !== propertyArr.length) {
        return undefined;
      }
    }
  }

  return obj;
};

export const omitDeep = (value, key) => {
  if (Array.isArray(value)) {
    return value.map(i => omitDeep(i, key));
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((newObject, k) => {
      if (k == key) return newObject;
      return Object.assign({ [k]: omitDeep(value[k], key) }, newObject);
    }, {});
  }
  return value;
};
