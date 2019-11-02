import objectMapper from 'object-mapper';

export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};

export const mapSelectOption = (labelAttribute: string, obj: Object) => {
    const map = {
        [labelAttribute]: 'label'
    };

    let result: any = {};

    if (obj && obj !== {}) {
        result = objectMapper(obj, map) || {};
        result.value = obj;
    } else {
        result = undefined;
    }

    return result;
};

export const mapSelectOptions = (labelAttribute: string, values: Object[]) => {
    return values.map(value => mapSelectOption(labelAttribute, value));
};
