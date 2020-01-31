import { ApolloError } from 'apollo-server-express';
class UniqueError extends ApolloError {
    constructor(message, code, extensions) {
        super(message, code, extensions);
    }
}
export default UniqueError;
