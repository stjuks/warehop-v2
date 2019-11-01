import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Persist } from 'formik-persist';
import * as yup from 'yup';

import routes from '../../common/routes';
import { NewProductContainer, FormRowContainer } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Input from '../Input';
import Button from '../Button';
import { FormSelect } from '../Select';

const NewProduct = observer(() => {
    const partners = [
        { label: 'CIRCLE K', value: 'CIRCLE K' },
        { label: 'Sevi kodukaubad OÜ', value: 'Sevi kodukaubad OÜ' },
        { label: 'Alexela', value: 'Alexela' }
    ];

    const units = [
        { label: 'Tükk', value: { name: 'Tükk', abbr: 'tk' } },
        { label: 'Kilogramm', value: { name: 'Kilogramm', abbr: 'kg' } },
        { label: 'Gramm', value: { name: 'Gramm', abbr: 'g' } }
    ];

    const initialValues = {
        code: '',
        name: '',
        partner: null,
        unit: null,
        purchasePrice: '',
        retailPrice: '',
        description: ''
    };

    const validationSchema = yup.object({
        code: yup.string().required('Palun sisesta kauba kood.'),
        name: yup.string().required('Palun sisesta kauba nimetus.'),
        purchasePrice: yup.number(),
        retailPrice: yup.number(),
        description: yup.string()
    });

    return (
        <>
            <Header title="Uus kaup" backTo={routes.products} />
            <NewProductContainer padded>
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => alert(JSON.stringify(values))}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                >
                    {({
                        values,
                        errors,
                        handleSubmit,
                        handleChange,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit} id="new-product-form">
                            <Input
                                label="Kood"
                                name="code"
                                setFieldValue={setFieldValue}
                                value={values.code}
                                onChange={handleChange}
                                error={errors.code}
                            />
                            <Input
                                label="Nimetus"
                                name="name"
                                setFieldValue={setFieldValue}
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <FormSelect
                                label="Tarnija"
                                placeholder="Vali tarnija"
                                value={values.partner}
                                name="partner"
                                isSearchable={true}
                                options={partners}
                                withAddOption={{
                                    title: '+ Lisa partner',
                                    onClick: () => alert('Lisa ühik')
                                }}
                            />
                            <FormSelect
                                isRequired={true}
                                label="Ühik"
                                placeholder="Vali ühik"
                                value={values.unit}
                                name="unit"
                                isSearchable={true}
                                options={units}
                                withAddOption={{
                                    title: '+ Lisa ühik',
                                    onClick: () => alert('Lisa ühik')
                                }}
                            />
                            <FormRowContainer>
                                <Input
                                    label="Ostuhind"
                                    type="number"
                                    name="purchasePrice"
                                    setFieldValue={setFieldValue}
                                    value={values.purchasePrice}
                                    onChange={handleChange}
                                    error={errors.purchasePrice}
                                    icon={'€'}
                                />
                                <Input
                                    label="Müügihind"
                                    name="retailPrice"
                                    type="number"
                                    setFieldValue={setFieldValue}
                                    value={values.retailPrice}
                                    onChange={handleChange}
                                    error={errors.retailPrice}
                                    icon={'€'}
                                />
                            </FormRowContainer>
                            <Input
                                label="Märkused"
                                name="description"
                                setFieldValue={setFieldValue}
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description}
                            />
                        </form>
                    )}
                </Formik>
            </NewProductContainer>
            <FooterContainer style={{ padding: '0.5rem 0.5rem' }}>
                <Button title="Lisa kaup" form="new-product-form" />
            </FooterContainer>
        </>
    );
});

export default NewProduct;
