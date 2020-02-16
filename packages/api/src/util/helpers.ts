import { ModelCtor, Model } from 'sequelize-typescript';
import util from 'util';
import { ApolloError } from 'apollo-server-express';
import { ErrorCode } from '@shared/types';
import { GraphQLError } from 'graphql';
import { ValidationError as SequelizeValidationError, ValidationErrorItem } from 'sequelize';

interface ForeignKeyOpts {
  table: ModelCtor<Model<any, any>>;
  cols: string[];
  ref: { table: ModelCtor<Model<any, any>>; cols: string[] };
  onDelete?: string;
  onUpdate?: string;
}

export const createCompositeForeignKeys = (optsArray: ForeignKeyOpts[]) => {
  const createQuery = (opts: ForeignKeyOpts) => {
    const { table, cols, ref, onDelete, onUpdate } = opts;

    return `
            ALTER TABLE "${table.tableName}" 
            ADD CONSTRAINT "${table.tableName}_${cols.join('_')}_fkey" 
            FOREIGN KEY ("${cols.join('","')}")
            REFERENCES "${ref.table.tableName}"("${ref.cols.join('","')}")
            ON DELETE ${onDelete || 'NO ACTION'}
            ON UPDATE ${onUpdate || 'NO ACTION'};
        `;
  };

  return `
        START TRANSACTION;
        ${optsArray.map(createQuery).join('')}
        COMMIT;
    `;
};

export const createCheckConstraint = (opts: {
  table: ModelCtor<Model<any, any>>;
  query: string;
  name: string;
}) => {
  const { table, query, name } = opts;

  return `
        ALTER TABLE "${table.tableName}"
        ADD CONSTRAINT ${table.tableName}_${name} CHECK (
            ${query}
        );
    `;
};

export const toCursorHash = string =>
  string ? Buffer.from(string.toString()).toString('base64') : null;
export const fromCursorHash = string =>
  string ? Buffer.from(string.toString(), 'base64').toString('ascii') : null;

export const createError = (message: string, code: ErrorCode, extensions?: any) => {
  return new ApolloError(message, code, extensions);
};

export const formatError = (err: GraphQLError) => {
  const exception = err.extensions.exception;

  console.error(err);

  if (exception && exception.name) {
    if (exception.name === 'SequelizeUniqueConstraintError') {
      const validationError: SequelizeValidationError = exception;

      return createError('Entity with these fields already exists.', 'EntityAlreadyExistsError', {
        fields: validationError.errors.map((error: ValidationErrorItem) => error.path)
      });
    }
  }

  return createError('Error executing request.', 'GeneralError');
};
