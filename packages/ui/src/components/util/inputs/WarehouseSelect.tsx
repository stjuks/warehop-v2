import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useGraphQLQuery } from '@ui/util/hooks';
import { FETCH_WAREHOUSES } from '@ui/api/warehouse';
import AriaSelect from '@ui/components/Form/AriaSelect';
import { FiPlusCircle } from 'react-icons/fi';
import UIStoreContext from '@ui/stores/UIStore';
import WarehouseForm from '@ui/components/WarehouseForm';

interface WarehouseSelectProps {
  name: string;
  label: string;
}

const WarehouseSelect: React.FC<WarehouseSelectProps> = observer(({ name, label }) => {
  const uiStore = useContext(UIStoreContext);

  const [warehouses] = useGraphQLQuery(FETCH_WAREHOUSES, { loadOnMount: true });

  return (
    <AriaSelect
      name={name}
      label={label}
      optionMap={{ label: (warehouse) => warehouse.name }}
      options={warehouses || []}
      searchPlaceholder="Otsi ladu"
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa ladu
          </>
        ),
        onClick: () => uiStore.openModal(<WarehouseForm />)
      }}
    />
  );
});

export default WarehouseSelect;