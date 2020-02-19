import React, { useContext, useState, useEffect } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import PartnerStoreContext from '@ui/stores/PartnerStore';
import history from '@ui/util/history';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';
import { PartnerType, Partner } from '@shared/types';
import { useAsyncFn } from 'react-use';
import UIStoreContext from '@ui/stores/UIStore';
import routes from '@ui/util/routes';

interface PartnerSelectProps {
  name: string;
  label: string;
  partnerType: PartnerType;
}

const PartnerSelect: React.FC<PartnerSelectProps> = observer(({ name, label, partnerType }) => {
  const partnerStore = useContext(PartnerStoreContext);
  const uiStore = useContext(UIStoreContext);

  const [options, setOptions] = useState<Partner[]>([]);
  const [loadOptions, setLoadOptions] = useState<boolean>(false);

  useEffect(() => {
    const fetchPartners = async () => {
      const partners = await partnerStore.fetchPartners(
        { type: partnerType },
        { keepStoreValue: true }
      );
      setOptions(partners);
    };

    if (loadOptions) fetchPartners();
  }, [loadOptions]);

  return (
    <AriaSelect
      name={name}
      label={label}
      optionMap={{ label: partner => partner.name }}
      options={options}
      onSearch={query =>
        partnerStore.fetchPartners(
          { type: partnerType, generalQuery: query },
          { keepStoreValue: true }
        )
      }
      searchPlaceholder="Otsi partnerit"
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa partner
          </>
        ),
        onClick: () => history.push(routes.partnerForm)
      }}
      onMenuOpen={() => setLoadOptions(true)}
    />
  );
});

export default PartnerSelect;
