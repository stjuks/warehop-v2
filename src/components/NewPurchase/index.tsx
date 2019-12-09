import React from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as yup from 'yup';

import routes from '../../common/routes';
import { NewProductContainer, AddPurchaseItemBtn } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Button from '../Button';
import sampleData from '../../common/sampleData';
import { Partner, InvoiceItem } from '../../common/types';
import Form, { FormModel, generateFormFromJSON } from '../Form';
import PurchaseItem from './PurchaseItem';
import { Route } from 'react-router';
import NewPurchaseItem from './NewPurchaseItem';

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
    const partners = sampleData.partners;
    const units = sampleData.units;

    const initialValues: NewPurchaseFormValues = {
        partner: undefined,
        invoiceNr: '',
        invoiceFile: undefined,
        creationDate: moment(),
        dueDate: moment(),
        description: '',
        items: [
            {
                type: 'PRODUCT',
                name: 'Luugi käepide Electrolux',
                quantity: 5,
                purchasePrice: 25,
                code: 'AD-123001232',
                unit: {
                    id: 1,
                    name: 'Tükk',
                    abbreviation: 'tk'
                },
                warehouse: {
                    id: 1,
                    name: 'Ladu 1'
                }
            },
            {
                type: 'SERVICE',
                name: 'Kuller',
                quantity: 1,
                purchasePrice: 5
            }
        ]
    };

    const validationSchema = yup.object({});

    const formModel: FormModel = [
        {
            type: 'subtitle',
            text: 'Arve põhiandmed'
        },
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
            type: 'fieldArray',
            name: 'items',
            render: ({ formikProps, arrayHelpers }) =>
                generateFormFromJSON({
                    model: [
                        {
                            type: 'inputRow',
                            flex: [1, 0],
                            fields: [
                                {
                                    type: 'subtitle',
                                    text: 'Kaubad'
                                },
                                {
                                    type: 'customField',
                                    component: () => (
                                        <React.Fragment>
                                            <AddPurchaseItemBtn to={routes.newPurchaseItem}>
                                                + Lisa kaup
                                            </AddPurchaseItemBtn>
                                            <Route
                                                path={routes.newPurchaseItem}
                                                render={() => (
                                                    <NewPurchaseItem
                                                        arrayHelpers={arrayHelpers}
                                                        onSubmit={() => alert('item added')}
                                                        index={formikProps.values.items.length}
                                                    />
                                                )}
                                            />
                                        </React.Fragment>
                                    )
                                }
                            ]
                        },
                        {
                            type: 'customField',
                            component: () =>
                                formikProps.values.items.map((item, index) => (
                                    <PurchaseItem
                                        key={index}
                                        item={item}
                                        onDelete={() => arrayHelpers.remove(index)}
                                        onEdit={() => alert('Muuda')}
                                    />
                                ))
                        }
                    ],
                    formikProps
                })
        }
    ];

    return (
        <>
            <Header title="Uus ostuarve" backTo={routes.purchases} />
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
