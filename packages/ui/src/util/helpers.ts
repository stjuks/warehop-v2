import { PaginatedData, ErrorCode } from '@shared/types';
import { Option } from '../components/Form/AriaSelect';
import { GraphQLError } from 'graphql';

export const stall = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export interface MapSelectOptionAttributes {
  label?: (value: any) => string;
  value?: (value: any) => any;
}

export const mapSelectOptions = (values: any[], optionMap?: MapSelectOptionAttributes) => {
  const result: Option[] = values.map((value) => mapSelectOption(value, optionMap));
  return result;
};

export const filterObjectProperties = (obj: Object, keys: string[]) => {
  const result = {};

  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) result[key] = obj[key];
    else result[key] = undefined;
  });

  return result;
};

export const paginatedData = <T>() => {
  const result: PaginatedData<T> = {
    pageInfo: {
      hasNextPage: false,
      cursor: undefined,
    },
    data: [],
    isLoaded: false,
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
    return value.map((i) => omitDeep(i, key));
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((newObject, k) => {
      if (k == key) return newObject;
      return Object.assign({ [k]: omitDeep(value[k], key) }, newObject);
    }, {});
  }
  return value;
};

export const isEqual = (obj1: any, obj2: any) => {
  if (obj1 instanceof Object && obj2 instanceof Object) {
    const aProps = Object.getOwnPropertyNames(obj1);
    const bProps = Object.getOwnPropertyNames(obj2);

    if (aProps.length !== bProps.length) return false;

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      if (obj1[propName] !== obj2[propName]) {
        return false;
      }
    }

    return true;
  }

  return obj1 === obj2;
};

export const editObjectProperty = (obj: any, path: string, editValue: any) => {
  if (typeof obj !== 'object') return editValue;

  const properties = path.split('.');

  properties.reduce((prev, curr, index) => {
    if (prev && typeof prev === 'object') {
      if (prev[curr] === undefined) {
        prev[curr] = {};
      }

      if (index + 1 === properties.length && editValue !== undefined) {
        prev[curr] = editValue;
      }

      return prev[curr];
    }

    return undefined;
  }, obj);

  return obj;
};

export const loadFromLocalStorage = (key: string) => {
  const keys = key.split('.');

  const root = keys.shift();

  if (root) {
    const rootItem = localStorage.getItem(root);

    if (rootItem) {
      try {
        const _rootItem = JSON.parse(rootItem);

        return getObjectProperty(_rootItem, keys.join('.'));
      } catch (err) {
        return rootItem;
      }
    }
  }

  return undefined;
};

export const saveToLocalStorage = (key: string, value: any) => {
  const keys = key.split('.');

  const root = keys.shift();

  if (root) {
    if (keys.length === 0) {
      localStorage.setItem(root, JSON.stringify(value));
      return true;
    }

    const rootItem = localStorage.getItem(root);

    if (rootItem) {
      try {
        const _rootItem = JSON.parse(rootItem);

        editObjectProperty(_rootItem, keys.join('.'), value);

        localStorage.setItem(root, JSON.stringify(_rootItem));
      } catch (err) {
        return false;
      }
    } else {
      const item = editObjectProperty({}, keys.join('.'), value);

      localStorage.setItem(root, JSON.stringify(item));
    }
  }

  return true;
};
