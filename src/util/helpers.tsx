import { IOption } from '../components/Select';

export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};

interface MapSelectAttributes {
    labelAttr: string;
    valueAttr?: string | null;
}

export const mapSelectOptions = ({ labelAttr, valueAttr = null }: MapSelectAttributes, values: Object[]) => {
    const result: any[] = [];

    values.forEach((value: Object) => result.push(mapSelectOption({ labelAttr, valueAttr }, value)));

    return result;
};

export const mapSelectOption = ({ labelAttr, valueAttr }: MapSelectAttributes, value: Object) => {
    const option: IOption = {
        label: value[labelAttr],
        value: valueAttr ? value[valueAttr] : value
    };

    return option;
};
