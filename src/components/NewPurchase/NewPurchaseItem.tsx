import React from 'react';
import { Formik } from 'formik';
import Modal from '../Modal';
import routes from '../../common/routes';
import { generateFormFromJSON } from '../Form';
import history from '../../common/history';

interface NewPurchaseItemProps {
    formikProps: any;
    onSubmit: () => any;
    index: number;
}

const NewPurchaseItem = ({ arrayHelpers, onSubmit, index }) => {
    const initialValues = {
        type: { type: 'SERVICE', name: 'Teenus' }
    };

    const itemTypes = [
        { type: 'PRODUCT', name: 'Laokaup' },
        { type: 'SERVICE', name: 'Teenus' },
        { type: 'EXPENSE', name: 'Kuluartikkel' }
    ];

    const itemTypeOptions = itemTypes.map(type => ({ label: type.name, value: type.type }));

    const itemForm = formikProps =>
        generateFormFromJSON({
            model: [
                {
                    type: 'radio',
                    options: itemTypeOptions,
                    name: 'type',
                    defaultValue: itemTypeOptions[0].value
                }
            ],
            formikProps
        });

    const formTypes = (formikProps, type) => {
        const forms = {
            SERVICE: [
                {
                    type: 'text',
                    label: 'Teenuse nimetus',
                    name: 'name'
                }
            ],
            EXPENSE: [
                {
                    type: 'text',
                    label: 'Kulu nimetus',
                    name: 'name'
                }
            ],
            PRODUCT: [
                {
                    type: 'text',
                    label: 'Kauba nimetus',
                    name: 'name'
                },
                {
                    type: 'text',
                    label: 'Kood',
                    name: 'code'
                }
            ]
        };

        return forms[type] ? generateFormFromJSON({ model: forms[type], formikProps }) : null;
    };

    const handleSubmit = values => {
        arrayHelpers.push(values);
        history.push(routes.newPurchase);
    };

    return (
        <Modal isOpen={true} title="Lisa kaup" backTo={routes.newPurchase}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {formikProps => (
                    <React.Fragment>
                        {itemForm(formikProps)}
                        {formTypes(formikProps, formikProps.values.type)}
                        <button onClick={() => formikProps.handleSubmit()}>Submit</button>
                    </React.Fragment>
                )}
            </Formik>
        </Modal>
    );
};

export default NewPurchaseItem;
