import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import Modal from '../Modal';
import routes from '../../common/routes';
import history from '../../common/history';
import sampleData from '../../common/sampleData';
import Form from '../Form';

import AriaSelect from '../Form/AriaSelect';
import TextInput from '../Form/TextInput';

interface NewPurchaseItemProps {
    formikProps: any;
    onSubmit: () => any;
    index: number;
}

const DEFAULT_ITEM_TYPE = { id: 'PRODUCT', name: 'Laokaup' };

const units = sampleData.units;
const warehouses = sampleData.warehouses;

const serviceAndExpenseForm = {
    initialValues: {
        name: '',
        quantity: '',
        unit: undefined,
        purchasePrice: ''
    },
    render: (
        <>
            <TextInput name="name" label="Nimetus" />
            <TextInput name="quantity" label="Kogus" type="number" />
            <AriaSelect name="unit" label="Ühik" options={units} optionMap={{ label: 'name' }} />
            <TextInput name="purchasePrice" label="Ostuhind" type="number" />
        </>
    ),
    fields: ['itemType', 'name', 'quantity', 'unit', 'purchasePrice']
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
        render: (
            <>
                <TextInput name="name" label="Nimetus" />
                <TextInput name="code" label="Kood" />
                <TextInput name="quantity" label="Kogus" type="number" />
                <AriaSelect name="unit" label="Ühik" options={units} optionMap={{ label: 'name' }} />
                <AriaSelect name="warehouse" label="Ladu" options={warehouses} optionMap={{ label: 'name' }} />
                <TextInput name="purchasePrice" label="Ostuhind" type="number" />
                <TextInput name="retailPrice" label="Müügihind" type="number" />
            </>
        ),
        fields: ['itemType', 'name', 'code', 'quantity', 'unit', 'warehouse', 'purchasePrice', 'retailPrice']
    },
    SERVICE: serviceAndExpenseForm,
    EXPENSE: serviceAndExpenseForm
};

const NewPurchaseItem = ({ arrayHelpers, onSubmit, index }) => {
    const [activeItemType, setActiveItemType] = useState(DEFAULT_ITEM_TYPE.id);

    const initialValues = {
        itemType: DEFAULT_ITEM_TYPE,
        ...forms[activeItemType].initialValues
    };

    const itemTypes = [
        { id: 'PRODUCT', name: 'Laokaup' },
        { id: 'SERVICE', name: 'Teenus' },
        { id: 'EXPENSE', name: 'Kuluartikkel' }
    ];

    const handleSubmit = values => {
        console.log(values);
        // arrayHelpers.push(values);
        // history.push(routes.newPurchase);
    };

    const handleTypeSelect = ({ changedField, formik }) => {
        if (changedField.name === 'itemType') {
            const itemTypeId = changedField.value.id;
            const newValues = forms[itemTypeId].initialValues;

            forms[itemTypeId].fields.forEach(field => (newValues[field] = formik.values[field]));
            formik.setValues(newValues);

            setActiveItemType(itemTypeId);
        }
    };

    return (
        <Modal isOpen={true} title="Lisa kaup" backTo={routes.newPurchase}>
            <Form
                id="new-purchase-item-form"
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onChange={handleTypeSelect}
            >
                <>
                    <AriaSelect name="itemType" label="Kauba tüüp" options={itemTypes} optionMap={{ label: 'name' }} />
                    {forms[activeItemType].render}
                    <button>Submit</button>
                </>
            </Form>
        </Modal>
    );
};

export default NewPurchaseItem;
