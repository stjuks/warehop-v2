import React, { useContext, useEffect } from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../util/routes';
import history from '../../util/history';
import { NewProductContainer, AddPurchaseItemBtn } from './styles';
import PartnerStoreContext from '../../stores/PartnerStore';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
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
import { mapSelectOptions } from '../../util/helpers';

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
    const partnerStore = useContext(PartnerStoreContext);

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

    console.log(partnerStore.partners);

    const handleSubmit = purchase => {
        // purchaseStore.addPurchase(purchase);
        history.push(routes.purchases);
    };

    useEffect(() => {
        partnerStore.fetchPartners();
    }, []);

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
                                onSearch={async query => {
                                    const partners = await partnerStore.searchPartners('VENDOR', query);
                                    return mapSelectOptions({ values: partners, attrs: { label: 'name' } });
                                }}
                                searchPlaceholder="Otsi tarnijat"
                                options={partnerStore.partners}
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
