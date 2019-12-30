import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../common/routes';
import history from '../../common/history';
import { NewProductContainer, AddPurchaseItemBtn } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import sampleData from '../../common/sampleData';
import { Partner, InvoiceItem } from 'shared/types';
import Form from '../Form';
import FieldArray from '../Form/util/FieldArray';
import PurchaseItem from './PurchaseItem';
import { Route } from 'react-router';
import NewPurchaseItem from './NewPurchaseItem';
import AriaSelect from '../Form/AriaSelect';
import TextInput from '../Form/TextInput';
import { Row } from '../Layout/styles';
import FileInput from '../Form/FileInput';
import DateInput from '../Form/DateInput';
import { FormTitle } from '../Form/styles';
import { PurchaseStoreContext } from '../../stores/PurchaseStore';

interface NewPurchaseFormValues {
    partner: Partner | undefined;
    invoiceNr: string;
    invoiceFile?: File;
    creationDate: moment.Moment;
    dueDate: moment.Moment;
    description?: string;
    items: InvoiceItem[];
}

const NewPurchase = observer(() => {
    const purchaseStore = useContext(PurchaseStoreContext);

    const partners = sampleData.partners;
    const units = sampleData.units;
    const products = sampleData.products;

    const initialValues: NewPurchaseFormValues = {
        partner: undefined,
        invoiceNr: '',
        invoiceFile: undefined,
        creationDate: moment(),
        dueDate: moment(),
        description: '',
        items: []
    };

    const validationSchema = yup.object({
        partner: yup.object().required('Palun vali tarnija.'),
        invoiceNr: yup.string().required('Palun sisesta arve number.'),
        creationDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
        dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.')
    });

    const ProductList = ({ formikProps }) => (
        <FieldArray name="items">
            {arrayHelpers => (
                <>
                    <FormTitle>
                        Kaubad <AddPurchaseItemBtn to={routes.newPurchaseItem}>+ Lisa kaup</AddPurchaseItemBtn>
                    </FormTitle>
                    <Route
                        path={routes.newPurchaseItem}
                        render={() => (
                            <NewPurchaseItem arrayHelpers={arrayHelpers} />
                        )}
                    />
                    {formikProps.values.items.map((item, index) => (
                        <PurchaseItem
                            key={index}
                            item={item}
                            onDelete={() => arrayHelpers.remove(index)}
                            onEdit={() =>
                                history.push({
                                    pathname: routes.newPurchaseItem,
                                    state: {
                                        index,
                                        item
                                    }
                                })
                            }
                        />
                    ))}
                </>
            )}
        </FieldArray>
    );

    const handleSubmit = purchase => {
        purchaseStore.addPurchase(purchase);
        history.push(routes.purchases);
    }

    return (
        <>
            <Header title="Uus ostuarve" backTo={routes.purchases} />
            <NewProductContainer>
                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    id="new-purchase-form"
                >
                    {formikProps => (
                        <>
                            <FormTitle>Põhiandmed</FormTitle>
                            <AriaSelect
                                name="partner"
                                label="Tarnija"
                                options={partners}
                                optionMap={{ label: 'name' }}
                            />
                            <TextInput name="invoiceNr" label="Arve nr" />
                            <Row flex={[1, 1]}>
                                <DateInput name="creationDate" label="Ostukuupäev" />
                                <DateInput name="dueDate" label="Maksetähtaeg" />
                            </Row>
                            <FormTitle>Lisaandmed</FormTitle>
                            <FileInput name="invoiceFile" label="Arve fail (PDF)" />
                            <TextInput name="description" label="Märkused" isTextarea />
                            <ProductList formikProps={formikProps} />
                        </>
                    )}
                </Form>
            </NewProductContainer>
            <FooterContainer style={{ padding: '0.25rem 1rem' }}>
                <Button title="Loo arve" form="new-purchase-form" type="submit" />
            </FooterContainer>
        </>
    );
});

export default NewPurchase;