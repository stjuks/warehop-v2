import React, { useContext, useState } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import CommonStoreContext from '@ui/stores/CommonStore';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';
import UIStoreContext from '@ui/stores/UIStore';
import UnitForm from '@ui/components/UnitForm';
import { FETCH_UNITS } from '@ui/api/common';
import { useGraphQLQuery } from '@ui/util/hooks';

interface UnitSelectProps {
  name: string;
  label: string;
}

const UnitSelect: React.FC<UnitSelectProps> = observer(({ name, label }) => {
  const uiStore = useContext(UIStoreContext);
  const [searchQuery, setSearchQuery] = useState('');

  const [units] = useGraphQLQuery(FETCH_UNITS, { loadOnMount: true });

  const filteredUnits =
    units?.filter(
      (unit) =>
        unit.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        unit.abbreviation.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    ) || [];

  return (
    <AriaSelect
      label={label}
      name={name}
      options={filteredUnits}
      optionMap={{ label: (unit) => `${unit.name} (${unit.abbreviation})` }}
      searchPlaceholder="Otsi ühikut"
      onSearch={(query) => setSearchQuery(query)}
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa ühik
          </>
        ),
        onClick: () => uiStore.openModal(<UnitForm />),
      }}
    />
  );
});

export default UnitSelect;
