import React, { useContext, useState, useEffect } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import PartnerStoreContext from '@ui/stores/PartnerStore';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';
import { PartnerType, Partner } from '@shared/types';
import { useAsyncFn } from 'react-use';

interface PartnerSelectProps {
  name: string;
  label: string;
  partnerType: PartnerType;
}

const PartnerSelect: React.FC<PartnerSelectProps> = observer(({ name, label, partnerType }) => {
  const partnerStore = useContext(PartnerStoreContext);
  const [options, setOptions] = useState<Partner[]>([]);
  const [loadOptions, setLoadOptions] = useState<boolean>(false);

  useEffect(() => {
    const fetchPartners = async () => {
      const partners = await partnerStore.fetchPartners({ type: partnerType }, true);
      setOptions(partners);
    };

    fetchPartners();
  }, [loadOptions]);

  return (
    <AriaSelect
      name={name}
      label={label}
      optionMap={{ label: partner => partner.name }}
      options={options}
      onSearch={query =>
        partnerStore.fetchPartners({ type: partnerType, generalQuery: query }, true)
      }
      searchPlaceholder="Otsi partnerit"
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa partner
          </>
        ),
        onClick: () => console.log('Lisa partner')
      }}
      onMenuOpen={() => setLoadOptions(true)}
    />
  );
});

export default PartnerSelect;
