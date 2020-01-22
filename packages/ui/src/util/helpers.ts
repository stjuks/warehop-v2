import objectMapper from 'object-mapper';
import { PaginatedData } from 'shared/types';
import { Option } from '../components/Form/AriaSelect';

export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};

export interface MapSelectOptionAttributes {
    label: string;
    value?: string;
}

export const mapSelectOption = (args: { attrs?: MapSelectOptionAttributes; value: any }) => {
    const { attrs, value } = args;

    if (typeof value === 'object') {
        if (value.value && value.label) return value;

        if (attrs) {
            let result = { value };

            const map = {
                [attrs.label]: 'label'
            };

            if (attrs.value) map[attrs.value] = 'value';

            return { ...result, ...objectMapper(value, map) };
        }
    }

    return { value, label: value };
};

export const mapSelectOptions = (args: { attrs?: MapSelectOptionAttributes; values: any[] }) => {
    const { values, attrs } = args;
    const result: Option[] = values.map(value => mapSelectOption({ attrs, value }));
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
        data: []
    };

    return result;
};
