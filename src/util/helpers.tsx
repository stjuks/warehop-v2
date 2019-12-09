import objectMapper from 'object-mapper';

export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};

export const mapSelectOption = (args: { labelAttribute: string; obj: any; valueAttribute?: string }) => {
    const { labelAttribute, valueAttribute, obj } = args;

    const map = {
        [labelAttribute]: 'label'
    };

    if (valueAttribute) {
        map[valueAttribute] = 'value';
    }

    let result: any = {};

    if (obj && obj !== {}) {
        result = objectMapper(obj, map) || {};
        if (!valueAttribute) result.value = obj;
    } else {
        result = undefined;
    }

    return result;
};

export const mapSelectOptions = ({
    labelAttribute,
    valueAttribute,
    values
}: {
    labelAttribute: string;
    valueAttribute?: string;
    values: any[];
}) => {
    return values.map(obj => mapSelectOption({ labelAttribute, valueAttribute, obj }));
};

console.log(
    mapSelectOptions({
        labelAttribute: 'name',
        valueAttribute: 'type',
        values: [
            { type: 'SERVICE', name: 'Teenus' },
            { type: 'PRODUCT', name: 'Laokaup' },
            { type: 'EXPENSE', name: 'Kuluartikkel' }
        ]
    })
);
