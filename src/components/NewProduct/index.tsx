import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

import routes from '../../common/routes';
import WarehouseStoreContext from '../../stores/WarehouseStore';
import { NewProductContainer, FormRowContainer, AddWarehouseButton, TrashButtonContainer } from './styles';

import Header from '../Header';
import { FooterContainer } from '../Footer/styles';
import Input from '../Input';
import Button from '../Button';
import Persist from '../Persist';
import { FormSelect } from '../Select';
import Textarea from '../Textarea';
import { mapSelectOptions } from '../../util/helpers';
import sampleData from '../../common/sampleData';
import { Warehouse, ProductQuantityByWarehouse, Unit, Partner } from '../../common/types';
import Form from '../Form';
import { FormTitle } from '../Form/styles';
import TextInput from '../Form/TextInput';
import AriaSelect from '../Form/AriaSelect';
import { Row } from '../Layout/styles';
import FieldArray from '../Form/util/FieldArray';

interface INewProductFormValues {
    code: string;
    name: string;
    partner: Partner | null;
    unit: Unit;
    purchasePrice: string;
    retailPrice: string;
    description: string;
    warehouses: ProductQuantityByWarehouse[];
}

const NewProduct = observer(() => {
    const warehouseStore = useContext(WarehouseStoreContext);

    const partners = sampleData.partners;
    const units = sampleData.units;

    const [warehouseRows, setWarehouseRows] = useState<ProductQuantityByWarehouse[]>([]);

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

    const filterChosenWarehouseOptions = (formValues: ProductQuantityByWarehouse[], warehouses: Warehouse[]) => {
        return warehouses.filter(wh => formValues.map(whVal => whVal.id).indexOf(wh.id) === -1);
    };

    const findFirstNonChosenWarehouse = (formValues: ProductQuantityByWarehouse[], warehouses: Warehouse[]) => {
        return warehouses.find(wh => formValues.map(whVal => whVal.id).indexOf(wh.id) === -1);
    };

    return (
        <>
            <Header title="Uus kaup" backTo={routes.products} />
            <NewProductContainer>
                <Form id="new-product-form" initialValues={initialValues} onSubmit={values => console.log(values)}>
                    {formikProps => (
                        <>
                            <FormTitle>Põhiandmed</FormTitle>
                            <TextInput name="code" label="Kood" />
                            <TextInput name="name" label="Nimetus" />
                            <AriaSelect name="unit" label="Ühik" optionMap={{ label: 'name' }} options={units} />
                            <FormTitle>Lisainfo</FormTitle>
                            <AriaSelect
                                name="partner"
                                label="Tarnija"
                                optionMap={{ label: 'name' }}
                                options={partners}
                            />
                            <Row flex={[1, 1]}>
                                <TextInput name="purchasePrice" label="Ostuhind" indicator={'€'} />
                                <TextInput name="retailPrice" label="Müügihind" indicator={'€'} />
                            </Row>
                            <TextInput name="description" label="Märkused" isTextarea />
                            <FormTitle>Laoseis</FormTitle>
                            <FieldArray name="warehouses">
                                {arrayHelpers => (
                                    <>
                                        {formikProps.values.warehouses.map((wh, i) => (
                                            <Row key={i} flex={[1, 0, 0]}>
                                                <AriaSelect
                                                    name={`warehouses[${i}]`}
                                                    label={i === 0 ? 'Ladu' : undefined}
                                                    options={filterChosenWarehouseOptions(
                                                        formikProps.values.warehouses,
                                                        warehouseStore.warehouses
                                                    )}
                                                    optionMap={{ label: 'name' }}
                                                />
                                                <TextInput
                                                    name={`warehouses[${i}].quantity`}
                                                    label={i === 0 ? 'Kogus' : undefined}
                                                />
                                                <TrashButtonContainer>
                                                    <button type="button" onClick={() => arrayHelpers.remove(i)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </TrashButtonContainer>
                                            </Row>
                                        ))}
                                        {formikProps.values.warehouses.length < warehouseStore.warehouses.length && (
                                            <AddWarehouseButton
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push(
                                                        findFirstNonChosenWarehouse(
                                                            formikProps.values.warehouses,
                                                            warehouseStore.warehouses
                                                        )
                                                    )
                                                }
                                            >
                                                <FiPlusCircle />
                                                &nbsp;Lisa ladu
                                            </AddWarehouseButton>
                                        )}
                                    </>
                                )}
                            </FieldArray>
                        </>
                    )}
                </Form>
            </NewProductContainer>
            <FooterContainer style={{ padding: '0.5rem 1rem' }}>
                <Button title="Lisa kaup" form="new-product-form" />
            </FooterContainer>
        </>
    );
});

export default NewProduct;
