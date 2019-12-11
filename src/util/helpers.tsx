import objectMapper from 'object-mapper';

export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};

export interface MapSelectOptionArgs {
    labelAttribute: string;
    valueAttribute?: string;
    value: any;
}

export const mapSelectOption = (args: MapSelectOptionArgs) => {
    const { labelAttribute, valueAttribute, value } = args;

    let result: any = {};

    if (typeof value === 'object') {
        if (value.value && value.label) return value;

        const map = {
            [labelAttribute]: 'label'
        };

        if (valueAttribute) {
            map[valueAttribute] = 'value';
        }

        if (value && value !== {}) {
            result = objectMapper(value, map) || {};
            if (!valueAttribute) result.value = value;
        } else {
            return undefined;
        }
    } else {
        return { value, label: value };
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
    return values.map(value => mapSelectOption({ labelAttribute, valueAttribute, value }));
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
