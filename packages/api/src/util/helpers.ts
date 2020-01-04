import { ModelCtor, Model } from 'sequelize-typescript';

export const createCompositeForeignKey = (config: {
    table: ModelCtor<Model<any, any>>;
    cols: string[];
    ref: { table: ModelCtor<Model<any, any>>; cols: string[] };
    onDelete?: string;
    onUpdate?: string;
}) => {
    const { table, cols, ref, onDelete, onUpdate } = config;

    return `
        ALTER TABLE "${table.tableName}" 
        ADD CONSTRAINT "${table.tableName}_${cols.join('_')}_fkey" 
        FOREIGN KEY ("${cols.join('","')}")
        REFERENCES "${ref.table.tableName}"("${ref.cols.join('","')}")
        ON DELETE ${onDelete || 'NO ACTION'}
        ON UPDATE ${onUpdate || 'NO ACTION'};
    `;
};
