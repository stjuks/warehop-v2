import React, { useContext, useState } from 'react';
import { SelectInput } from '@ui/components/FormNew';
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

  const handleSearch = query =>
    units?.filter(
      unit =>
        unit.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        unit.abbreviation.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) || [];

  return (
    <SelectInput
      label={label}
      name={name}
      options={units}
      optionLabel={unit => `${unit.name} (${unit.abbreviation})`}
      searchProps={{
        placeholder: 'Otsi ühikut',
        onSearch: handleSearch
      }}
      menuAction={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa ühik
          </>
        ),
        onClick: () => uiStore.openModal(<UnitForm />)
      }}
    />
  );
});

export default UnitSelect;
