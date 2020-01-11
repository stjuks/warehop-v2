import { ModelCtor, Model } from 'sequelize-typescript';

export const createCompositeForeignKey = (opts: {
    table: ModelCtor<Model<any, any>>;
    cols: string[];
    ref: { table: ModelCtor<Model<any, any>>; cols: string[] };
    onDelete?: string;
    onUpdate?: string;
}) => {
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

export const createCheckConstraint = (opts: { table: ModelCtor<Model<any, any>>; query: string; name: string }) => {
    const { table, query, name } = opts;

    return `
        ALTER TABLE "${table.tableName}"
        ADD CONSTRAINT ${table.tableName}_${name} CHECK (
            ${query}
        );
    `;
};

export const toCursorHash = string => string ? Buffer.from(string.toString()).toString('base64') : null;
export const fromCursorHash = string => string ? Buffer.from(string.toString(), 'base64').toString('ascii') : null;
