import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { stall } from '../../util/helpers';

interface IEditProductFormValues {
    id: number;
    code: string;
    name: string;
    partner: {
        label: string;
        value: string;
    } | null;
    unit: {
        name: string;
        abbr: string;
    };
    purchasePrice: string;
    retailPrice: string;
    description: string;
    warehouses: {
        id: number;
        name: string;
        quantity: number;
    }[];
}

function EditProduct(props) {
    useEffect(() => {
        const { id } = props.match.params;
        stall(500);
    });

    return (<div></div>);
};

export default EditProduct;
