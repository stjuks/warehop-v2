import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';

import routes from '../../common/routes';
import { NewProductContainer } from './styles';

import Header from '../Header';
import Footer from '../Footer';
import Input from '../Input';
import { FormSelect } from '../Select';

const NewProduct = observer(() => {
    const initialValues = {
        code: '',
        name: '',
        partner: '',
        purchasePrice: '',
        retailPrice: '',
        description: ''
    };

    return (
        <>
            <Header title="Uus kaup" backTo={routes.products} />
            <NewProductContainer padded>
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => alert(JSON.stringify(values))}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Kood"
                                name="code"
                                setFieldValue={setFieldValue}
                                value={values.code}
                                onChange={handleChange}
                            />
                            <Input
                                label="Nimetus"
                                name="name"
                                setFieldValue={setFieldValue}
                                value={values.name}
                                onChange={handleChange}
                            />
                            <FormSelect
                                label="Tarnija"
                                name="partner"
                                isSearchable={true}
                                options={[{ label: 'Label', value: 'Value' }]}
                            />
                            <Input
                                label="Ostuhind"
                                type="number"
                                name="purchasePrice"
                                setFieldValue={setFieldValue}
                                value={values.purchasePrice}
                                onChange={handleChange}
                            />
                            <Input
                                label="Müügihind"
                                name="retailPrice"
                                type="number"
                                setFieldValue={setFieldValue}
                                value={values.retailPrice}
                                onChange={handleChange}
                            />
                            <Input
                                label="Märkused"
                                name="description"
                                setFieldValue={setFieldValue}
                                value={values.description}
                                onChange={handleChange}
                            />
                            <button>Submit</button>
                        </form>
                    )}
                </Formik>
            </NewProductContainer>
            <Footer />
        </>
    );
});

export default NewProduct;
