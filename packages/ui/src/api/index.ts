import apollo from '../util/apollo';
import { QueryBaseOptions, MutationOptions } from 'apollo-boost';

import commonApi from './common';
import partnerApi from './partner';
import warehouseApi from './warehouse';
import itemApi from './item';

export const query = async <T>(opts: QueryBaseOptions) => {
    const { data } = await apollo.query(opts);

    const result: T = getResult(data, opts);

    return result;
};

export const mutate = async <T>(opts: MutationOptions) => {
    const { data } = await apollo.mutate(opts);

    const result: T = getResult(data, opts);

    return result;
};

const getResult = (data, opts) => {
    let queryName = '';

    const queryDefinition: any = opts.query ? opts.query.definitions[0] : opts.mutation.definitions[0];
    if (queryDefinition && queryDefinition.name) queryName = queryDefinition.name.value;

    const result = queryName ? data[queryName] : data;
    console.log(queryName, result);

    return result;
};

export default {
    ...commonApi,
    ...partnerApi,
    ...warehouseApi,
    ...itemApi
};
