import React, { useContext } from 'react';
import { PartnerType, AddInvoiceInput } from '@shared/types';
import { InvoicePartnerFieldContainer } from './styles';
import UIStoreContext from '@ui/stores/UIStore';
import InvoicePartnerForm from './InvoicePartnerForm';
import { useFormikContext } from 'formik';

interface InvoicePartnerFieldProps {
  partnerType: PartnerType;
}

const DetailField = ({ name, value, label = '' }) =>
  value && value.trim() ? (
    <div className={`field ${name} `}>
      {label} {value}
    </div>
  ) : null;

const InvoicePartnerField: React.FC<InvoicePartnerFieldProps> = ({ partnerType }) => {
  const uiStore = useContext(UIStoreContext);
  const formik = useFormikContext<AddInvoiceInput>();

  const {
    values: { partner },
  } = formik;

  return (
    <InvoicePartnerFieldContainer>
      <div className="label">{partnerType === 'CLIENT' ? 'Klient' : 'Tarnija'}</div>
      <button
        className="add-btn"
        type="button"
        onClick={() =>
          uiStore.openModal(<InvoicePartnerForm partnerType={partnerType} formik={formik} />)
        }
      >
        {partner ? (
          <div className="partner-info">
            <DetailField name="name" value={partner.name} />
            <DetailField name="address" value={partner.address} />
            <div className="row">
              <DetailField name="postalCode" value={partner.postalCode} />
              <DetailField name="county" value={partner.county} />
            </div>
            <DetailField name="email" value={partner.email} label="Email:" />
            <DetailField name="phoneNr" value={partner.phoneNr} label="Tel:" />
            <DetailField name="regNr" value={partner.regNr} label="Reg nr:" />
          </div>
        ) : partnerType === 'CLIENT' ? (
          'Määra klient'
        ) : (
          'Määra tarnija'
        )}
      </button>
    </InvoicePartnerFieldContainer>
  );
};

export default InvoicePartnerField;
