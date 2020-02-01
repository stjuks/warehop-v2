import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../util/routes';
import history from '../../util/history';
import { NewProductContainer, AddPurchaseItemBtn } from './styles';
import PartnerStoreContext from '../../stores/PartnerStore';
import InvoiceStoreContext from '../../stores/InvoiceStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import { Partner, InvoiceItem, InvoiceType } from '@shared/types';
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
import { mapSelectOptions } from '../../util/helpers';
import FormError from '../Form/FormError';
import { ApolloError } from 'apollo-boost';
import { GraphQLError } from 'graphql';

interface NewPurchaseFormValues {
    type: InvoiceType;
    partner: Partner | undefined;
    number: string;
    invoiceFile?: File;
    issueDate: Date;
    dueDate: Date;
    description?: string;
    items: InvoiceItem[];
}

const NewPurchase = observer(() => {
    const partnerStore = useContext(PartnerStoreContext);
    const invoiceStore = useContext(InvoiceStoreContext);

    const initialValues: NewPurchaseFormValues = {
        type: 'PURCHASE',
        partner: undefined,
        number: '',
        invoiceFile: undefined,
        issueDate: moment().toDate(),
        dueDate: moment().toDate(),
        description: '',
        items: []
    };

    const validationSchema = yup.object({
        partner: yup.object().required('Palun vali tarnija.'),
        number: yup.string().required('Palun sisesta arve number.'),
        issueDate: yup.mixed().required('Palun sisesta ostukuupäev.'),
        dueDate: yup.mixed().required('Palun sisesta maksetähtaeg.'),
        items: yup.array().required('Palun lisa arvele kaubad.')
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
                        render={() => <NewPurchaseItem arrayHelpers={arrayHelpers} />}
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

    const handleSubmit = async purchase => {
        try {
            await invoiceStore.addInvoice(purchase);
            history.push(routes.purchases);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        partnerStore.fetchPartners();
    }, [partnerStore]);

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
                            <FormError
                                messages={{
                                    EntityAlreadyExistsError: { number: 'Sellise numbriga arve juba eksisteerib.' }
                                }}
                                fields={['items']}
                            />
                            <FormTitle>Põhiandmed</FormTitle>
                            <AriaSelect
                                name="partner"
                                label="Tarnija"
                                onSearch={async query => {
                                    const partners = await partnerStore.searchPartners('VENDOR', query);
                                    return mapSelectOptions(partners, { label: partner => partner.name });
                                }}
                                searchPlaceholder="Otsi tarnijat"
                                options={partnerStore.partners}
                                optionMap={{ label: partner => partner.name }}
                            />
                            <TextInput name="number" label="Arve nr" />
                            <Row flex={[1, 1]}>
                                <DateInput name="issueDate" label="Ostukuupäev" />
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
