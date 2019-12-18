import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import Modal from '../Modal';
import routes from '../../common/routes';
import history from '../../common/history';
import sampleData from '../../common/sampleData';
import Form from '../Form';
import * as yup from 'yup';

import AriaSelect from '../Form/AriaSelect';
import TextInput from '../Form/TextInput';
import { Row } from '../Layout/styles';
import AutosuggestInput from '../Form/AutosuggestInput';
import api from '../../api';
import { ArticleType } from '../../common/types';

interface NewPurchaseItemProps {
    formikProps: any;
    onSubmit: () => any;
    index: number;
}

const itemTypes = sampleData.itemTypes;
const units = sampleData.units;
const warehouses = sampleData.warehouses;

const DEFAULT_ITEM_TYPE = itemTypes[0];

const serviceAndExpenseForm = {
    initialValues: {
        name: '',
        quantity: '',
        unit: undefined,
        purchasePrice: ''
    },
    fields: ['type', 'name', 'quantity', 'unit', 'purchasePrice'],
    validationSchema: yup.object({
        name: yup.string().required('Palun sisesta artikli nimetus.'),
        quantity: yup.number('Kogus peab olema number.').required('Palun sisesta artikli kogus.'),
        purchasePrice: yup.number('Hind peab olema number.').required('Palun sisesta kauba ostuhind.')
    })
};

const forms = {
    PRODUCT: {
        initialValues: {
            name: '',
            code: '',
            quantity: '',
            unit: units[0],
            warehouse: warehouses[0],
            purchasePrice: '',
            retailPrice: ''
        },
        fields: ['type', 'name', 'code', 'quantity', 'unit', 'warehouse', 'purchasePrice', 'retailPrice'],
        validationSchema: yup.object({
            name: yup.string().required('Palun sisesta kauba nimetus.'),
            code: yup.string().required('Palun sisesta kauba kood.'),
            quantity: yup.number('Kogus peab olema number.').required('Palun sisesta kauba kogus.'),
            unit: yup.object().required('Palun vali kauba ühik.'),
            warehouse: yup.object().required('Palun vali kauba sihtladu.'),
            retailPrice: yup.number('Hind peab olema number.')
        })
    },
    SERVICE: serviceAndExpenseForm,
    EXPENSE: serviceAndExpenseForm
};

const ItemForm = ({ type }: { type: ArticleType }) => {

    // autofill fields on select
    const handleAutosuggestSelect = ({ suggestion, formik }) => {
        const values = {};

        forms[type.id].fields.forEach(field => {
            if (suggestion.value[field]) values[field] = suggestion.value[field];
        });

        formik.setValues({ ...formik.values, ...values });
    };

    if (type.id === 'PRODUCT') {
        return (
            <>
                <AutosuggestInput
                    name="code"
                    label="Kood"
                    getSuggestions={query => api.getProducts({ limit: 10, offset: 10 })}
                    suggestionMap={{ label: 'code' }}
                    onSelect={handleAutosuggestSelect}
                />
                <AutosuggestInput
                    name="name"
                    label="Nimetus"
                    getSuggestions={query => api.getProducts({ limit: 10, offset: 10 })}
                    suggestionMap={{ label: 'name' }}
                    onSelect={handleAutosuggestSelect}
                />
                <Row flex={[1, 1]}>
                    <TextInput name="quantity" label="Kogus" type="number" />
                    <AriaSelect name="unit" label="Ühik" options={units} optionMap={{ label: 'name' }} />
                </Row>
                <AriaSelect name="warehouse" label="Ladu" options={warehouses} optionMap={{ label: 'name' }} />
                <TextInput name="purchasePrice" label="Ostuhind" type="number" indicator={'€'} />
                <TextInput name="retailPrice" label="Müügihind" type="number" indicator={'€'} />
            </>
        );
    }

    return (
        <>
            <TextInput name="name" label="Nimetus" />
            <Row flex={[1, 1]}>
                <TextInput name="quantity" label="Kogus" type="number" />
                <AriaSelect name="unit" label="Ühik" options={units} optionMap={{ label: 'name' }} />
            </Row>
            <TextInput name="purchasePrice" label="Ostuhind" type="number" indicator={'€'} />
        </>
    );
};

const NewPurchaseItem = ({ arrayHelpers, onSubmit, index }) => {
    const [activeItemType, setActiveItemType] = useState<ArticleType>(DEFAULT_ITEM_TYPE);

    const initialValues = {
        type: DEFAULT_ITEM_TYPE,
        ...forms[activeItemType.id].initialValues
    };

    const handleSubmit = values => {
        console.log(values);
        arrayHelpers.push(values);
        history.push(routes.newPurchase);
    };

    const handleTypeSelect = ({ changedField, formik }) => {
        if (changedField.name === 'type') {
            const itemTypeId = changedField.value.id;
            const newValues = forms[itemTypeId].initialValues;

            forms[itemTypeId].fields.forEach(field => {
                if (formik.values[field]) newValues[field] = formik.values[field];
            });

            formik.setValues(newValues);
            formik.setErrors({});

            setActiveItemType(changedField.value);
        }
    };

    const validationSchema = forms[activeItemType.id].validationSchema;

    return (
        <Modal isOpen={true} title="Lisa kaup" backTo={routes.newPurchase}>
            <Form
                id="new-purchase-item-form"
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onChange={handleTypeSelect}
            >
                <>
                    <AriaSelect name="type" label="Kauba tüüp" options={itemTypes} optionMap={{ label: 'name' }} />
                    <ItemForm type={activeItemType} />
                    <button>Submit</button>
                </>
            </Form>
        </Modal>
    );
};

export default NewPurchaseItem;
