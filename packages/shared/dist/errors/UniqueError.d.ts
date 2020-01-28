import { ApolloError } from 'apollo-server-express';
declare class UniqueError extends ApolloError {
    constructor(message: string, code?: string, extensions?: any);
}
export default UniqueError;
