import { ApolloError } from 'apollo-server-express';
export declare class UniqueError extends ApolloError {
    constructor(message: string, code?: string, extensions?: any);
}
