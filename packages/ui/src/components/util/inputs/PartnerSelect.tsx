import React, { useContext, useState, useEffect } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import PartnerStoreContext from '@ui/stores/PartnerStore';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';
import { PartnerType, Partner } from '@shared/types';
import UIStoreContext from '@ui/stores/UIStore';
import routes from '@ui/util/routes';
import { FETCH_PARTNERS } from '@ui/api/partner';
import { useGraphQLQuery } from '@ui/util/hooks';

interface PartnerSelectProps {
  name: string;
  label: string;
  partnerType: PartnerType;
}

const PartnerSelect: React.FC<PartnerSelectProps> = observer(({ name, label, partnerType }) => {
  const uiStore = useContext(UIStoreContext);

  const [searchQuery, setSearchQuery] = useState('');

  const [partners] = useGraphQLQuery(FETCH_PARTNERS, {
    variables: { type: partnerType, generalQuery: searchQuery },
    loadOnMount: true,
  });

  return (
    <AriaSelect
      name={name}
      label={label}
      optionMap={{ label: (partner) => partner.name }}
      options={partners ? partners.data : []}
      searchPlaceholder="Otsi partnerit"
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa partner
          </>
        ),
        onClick: () => uiStore.goTo(routes.partnerForm),
      }}
      onSearch={query => setSearchQuery(query)}
    />
  );
});

export default PartnerSelect;
