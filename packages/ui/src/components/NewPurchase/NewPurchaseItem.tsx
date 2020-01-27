import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Modal from '../Modal';
import routes from '../../util/routes';
import history from '../../util/history';
import Form from '../Form';
import * as yup from 'yup';

import AriaSelect from '../Form/AriaSelect';
import TextInput from '../Form/TextInput';
import { Row } from '../Layout/styles';
import AutosuggestInput from '../Form/AutosuggestInput';
import { ItemType } from 'shared/types';
import Header from '../Header';
import { ContentContainer } from '../App/styles';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { filterObjectProperties } from '../../util/helpers';
import { itemTypeTranslations } from '../../util/translations';
import CommonStoreContext from '../../stores/CommonStore';
import { RouteChildrenProps } from 'react-router';
import WarehouseStoreContext from '../../stores/WarehouseStore';

interface NewPurchaseItemProps {
    arrayHelpers: any;
}

const DEFAULT_ITEM_TYPE: ItemType = 'PRODUCT';

const serviceAndExpenseForm = {
    initialValues: {
        name: '',
        quantity: '',
        unit: undefined,
        purchasePrice: ''
    },
    fields: ['type', 'name', 'quantity', 'unit', 'price'],
    validationSchema: yup.object({
        name: yup.string().required('Palun sisesta artikli nimetus.'),
        quantity: yup.number('Kogus peab olema number.').required('Palun sisesta artikli kogus.'),
        price: yup.number('Hind peab olema number.').required('Palun sisesta kauba ostuhind.')
    })
};

const forms = {
    PRODUCT: {
        initialValues: {
            name: '',
            code: '',
            quantity: '',
            unit: undefined,
            warehouse: undefined,
            purchasePrice: '',
            retailPrice: ''
        },
        fields: ['type', 'name', 'code', 'quantity', 'unit', 'warehouse', 'price'],
        validationSchema: yup.object({
            name: yup.string().required('Palun sisesta kauba nimetus.'),
            code: yup.string().required('Palun sisesta kauba kood.'),
            quantity: yup.number('Kogus peab olema number.').required('Palun sisesta kauba kogus.'),
            unit: yup.object().required('Palun vali kauba ühik.'),
            warehouse: yup.object().required('Palun vali kauba sihtladu.'),
            price: yup.number().required('Palun sisesta kauba ostuhind.')
        })
    },
    SERVICE: serviceAndExpenseForm,
    EXPENSE: serviceAndExpenseForm
};

const ItemForm = ({ type }: { type: ItemType }) => {
    const commonStore = useContext(CommonStoreContext);
    const warehouseStore = useContext(WarehouseStoreContext);

    // autofill fields on select
    const handleAutosuggestSelect = ({ suggestion, formik }) => {
        const values = {};

        forms[type].fields.forEach(field => {
            if (suggestion.value[field]) values[field] = suggestion.value[field];
        });

        formik.setValues({ ...formik.values, ...values });
    };

    if (type === 'PRODUCT') {
        return (
            <>
                <AutosuggestInput
                    name="code"
                    label="Kood"
                    getSuggestions={query => []}
                    suggestionMap={{ label: item => item.code }}
                    onSelect={handleAutosuggestSelect}
                />
                <AutosuggestInput
                    name="name"
                    label="Nimetus"
                    getSuggestions={query => []}
                    suggestionMap={{ label: item => item.name }}
                    onSelect={handleAutosuggestSelect}
                />
                <Row flex={[1, 1]}>
                    <TextInput name="quantity" label="Kogus" type="number" />
                    <AriaSelect
                        name="unit"
                        label="Ühik"
                        options={commonStore.units}
                        optionMap={{ label: unit => unit.name }}
                    />
                </Row>
                <AriaSelect
                    name="warehouse"
                    label="Ladu"
                    options={warehouseStore.warehouses}
                    optionMap={{ label: warehouse => warehouse.name }}
                />
                <TextInput name="price" label="Ostuhind" indicator={'€'} />
            </>
        );
    }

    return (
        <>
            <TextInput name="name" label="Nimetus" />
            <Row flex={[1, 1]}>
                <TextInput name="quantity" label="Kogus" type="number" />
                <AriaSelect
                    name="unit"
                    label="Ühik"
                    options={commonStore.units}
                    optionMap={{ label: unit => unit.name }}
                />
            </Row>
            <TextInput name="price" label="Ostuhind" indicator={'€'} />
        </>
    );
};

const NewPurchaseItem: React.FC<NewPurchaseItemProps & RouteChildrenProps> = observer(props => {
    const commonStore = useContext(CommonStoreContext);

    const {
        location: { state },
        arrayHelpers
    }: { [key: string]: any } = props;

    const [activeItemType, setActiveItemType] = useState<ItemType>((state && state.item.type) || DEFAULT_ITEM_TYPE);

    const initialValues = (state && state.item) || {
        type: DEFAULT_ITEM_TYPE,
        ...forms[activeItemType].initialValues
    };

    const handleSubmit = values => {
        const filteredValues = filterObjectProperties(values, forms[values.type].fields);

        if (state && state.index !== undefined) {
            arrayHelpers.replace(state.index, filteredValues);
        } else {
            arrayHelpers.push(filteredValues);
        }

        history.push(routes.newPurchase);
    };

    const handleTypeSelect = ({ changedField, formik }) => {
        if (changedField.name === 'type') {
            formik.setErrors({});

            setActiveItemType(changedField.value);
        }
    };

    const validationSchema = forms[activeItemType].validationSchema;
    const headerTitle = state && state.index !== undefined ? 'Muuda arvekaupa' : 'Lisa arvekaup';
    const submitBtnTitle = state && state.index !== undefined ? 'Muuda kaupa' : 'Lisa kaup';

    return (
        <Modal isOpen={true} title="Lisa kaup" backTo={routes.newPurchase}>
            <Header title={headerTitle} backTo={routes.newPurchase} />
            <ContentContainer>
                <Form
                    id="new-purchase-item-form"
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    onChange={handleTypeSelect}
                >
                    <>
                        <AriaSelect
                            name="type"
                            label="Kauba tüüp"
                            options={commonStore.itemTypes}
                            optionMap={{ label: type => itemTypeTranslations[type] }}
                        />
                        <ItemForm type={activeItemType} />
                    </>
                </Form>
            </ContentContainer>
            <FooterContainer style={{ padding: '0.25rem 1rem' }}>
                <Button title={submitBtnTitle} form="new-purchase-item-form" type="submit" />
            </FooterContainer>
        </Modal>
    );
});

export default withRouter(NewPurchaseItem);
