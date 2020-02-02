import { PaginatedData } from '@shared/types';
import { Option } from '../components/Form/AriaSelect';

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
