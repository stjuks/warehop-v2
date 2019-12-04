import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

import routes from '../../common/routes';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import { NewProductContainer, FormRowContainer, AddWarehouseButton, TrashButtonContainer } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Input from '../Input';
import Button from '../Button';
import Persist from '../Persist';
import { FormSelect } from '../Select';
import Textarea from '../Textarea';
import { mapSelectOptions } from '../../util/helpers';
import sampleData from '../../common/sampleData';
import { Warehouse, ProductQuantityByWarehouse, Unit, Partner } from '../../common/types';
import FileInput from '../FileInput';
import Form, { FormModel } from '../Form';

interface NewPurchaseFormValues {
    partner: Partner | null;
}

const NewPurchase = observer(() => {
    const partners = sampleData.partners;
    const units = sampleData.units;

    const initialValues = {
        partner: null,
        invoiceNr: '',
        invoiceFile: null,
        creationDate: moment(),
        dueDate: moment(),
        description: ''
    };

    const validationSchema = yup.object({});

    const formModel: FormModel = [
        {
            type: 'select',
            options: partners,
            labelAttribute: 'name',
            label: 'Tarnija',
            name: 'partner',
            placeholder: 'Vali tarnija',
            isSearchable: true,
            isRequired: true,
            withAddOption: {
                title: 'Lisa partner',
                onClick: () => alert('Lisa partner')
            }
        },
        {
            type: 'inputRow',
            flex: [1, 1],
            fields: [
                {
                    type: 'text',
                    name: 'invoiceNr',
                    label: 'Arve nr'
                },
                {
                    type: 'file',
                    name: 'invoiceFile',
                    label: 'Fail'
                }
            ]
        },
        {
            type: 'inputRow',
            flex: [1, 1],
            fields: [
                {
                    type: 'date',
                    name: 'creationDate',
                    label: 'Ostukuupäev'
                },
                {
                    type: 'date',
                    name: 'dueDate',
                    label: 'Maksetähtaeg'
                }
            ]
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Märkused'
        },
        {
            type: 'customField',
            component: props => <div onClick={() => console.log(props)}>lol</div>
        }
    ];

    return (
        <>
            <Header title="Uus ostuarve" backTo={routes.products} />
            <NewProductContainer padded>
                <Form
                    id="new-purchase-form"
                    model={formModel}
                    initialValues={initialValues}
                    onSubmit={values => console.log(values)}
                />
            </NewProductContainer>
            <FooterContainer style={{ padding: '0.5rem 1rem' }}>
                <Button title="Loo arve" form="new-purchase-form" />
            </FooterContainer>
        </>
    );
});

export default NewPurchase;
