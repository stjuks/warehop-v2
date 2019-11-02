import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import { FiTrash2 } from 'react-icons/fi';

import routes from '../../common/routes';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import { NewProductContainer, FormRowContainer, AddWarehouseButton } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Input from '../Input';
import Button from '../Button';
import Persist from '../Persist';
import { FormSelect } from '../Select';
import Textarea from '../Textarea';
import { mapSelectOptions } from '../../util/helpers';
import sampleData from '../../common/sampleData';

interface INewProductFormValues {
    code: string;
    name: string;
    partner: {
        label: string;
        value: string;
    } | null;
    unit: {
        name: string;
        abbr: string;
    };
    purchasePrice: string;
    retailPrice: string;
    description: string;
    warehouses: {
        name: string;
        quantity: number;
    }[];
}

const NewProduct = observer(() => {
    const warehouseStore = useContext(WarehouseStoreContext);

    const partners = sampleData.partners;
    const units = sampleData.units;

    /* const warehouseOptions = mapSelectOptions({ labelAttr: 'name' }, warehouseStore.warehouses);
    const unitOptions = mapSelectOptions({ labelAttr: 'name' }, units);
    const partnerOptions = mapSelectOptions({ labelAttr: 'name' }, partners); */

    const initialValues: INewProductFormValues = {
        code: '',
        name: '',
        partner: null,
        unit: units[0],
        purchasePrice: '',
        retailPrice: '',
        description: '',
        warehouses: []
    };

    const validationSchema = yup.object({
        code: yup.string().required('Palun sisesta kauba kood.'),
        name: yup.string().required('Palun sisesta kauba nimetus.'),
        purchasePrice: yup.number(),
        retailPrice: yup.number(),
        description: yup.string()
        /* warehouses: yup.array().of(
            yup
                .object({
                    id: yup.number().required(),
                    name: yup.string().required('Sisesta lao nimi.'),
                    quantity: yup.number().required('Sisesta kogus.')
                })
                .required('Sisesta ladu') 
        )*/
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
                    {({ values, errors, handleSubmit, handleChange, setFieldValue, setValues }) => (
                        <form onSubmit={handleSubmit} id="new-product-form">
                            <Persist name="new-product-form" setValues={setValues} values={values} />
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
                                labelAttribute="name"
                                options={partners}
                                withAddOption={{
                                    title: '+ Lisa partner',
                                    onClick: () => alert('Lisa partner')
                                }}
                            />
                            <FormSelect
                                isRequired={true}
                                label="Ühik"
                                placeholder="Vali ühik"
                                value={values.unit}
                                name="unit"
                                isSearchable={true}
                                labelAttribute="name"
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
                            <Textarea
                                label="Märkused"
                                name="description"
                                setFieldValue={setFieldValue}
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description}
                            />
                            <div className="form-subtitle">Laoseis</div>
                            <FieldArray
                                name="warehouses"
                                render={arrayHelpers => (
                                    <>
                                        {values.warehouses
                                            ? values.warehouses.map((wh, i) => (
                                                  <FormRowContainer key={i} flex={[3, 1]}>
                                                      <FormSelect
                                                          isRequired={true}
                                                          label={i === 0 ? 'Ladu' : null}
                                                          placeholder="Vali ladu"
                                                          value={values.warehouses[i]}
                                                          name={`warehouses[${i}]`}
                                                          labelAttribute="name"
                                                          isSearchable={true}
                                                          options={warehouseStore.warehouses}
                                                          withAddOption={{
                                                              title: '+ Uus ladu',
                                                              onClick: () => alert('Uus ladu')
                                                          }}
                                                      />
                                                      <Input
                                                          label={i === 0 ? 'Kogus' : null}
                                                          name={`warehouses[${i}].quantity`}
                                                          setFieldValue={setFieldValue}
                                                          value={values.warehouses[i].quantity}
                                                          onChange={handleChange}
                                                      />
                                                      <button type="button" onClick={() => arrayHelpers.remove(i)}>
                                                          <FiTrash2 />
                                                      </button>
                                                  </FormRowContainer>
                                              ))
                                            : null}
                                        <AddWarehouseButton type="button" onClick={() => arrayHelpers.push({})}>
                                            + Lisa ladu
                                        </AddWarehouseButton>
                                    </>
                                )}
                            />
                        </form>
                    )}
                </Formik>
            </NewProductContainer>
            <FooterContainer style={{ padding: '0.5rem 1rem' }}>
                <Button title="Lisa kaup" form="new-product-form" />
            </FooterContainer>
        </>
    );
});

export default NewProduct;
