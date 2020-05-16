import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useGraphQLQuery } from '@ui/util/hooks';
import { FETCH_WAREHOUSES } from '@ui/api/warehouse';
import { SelectInput } from '@ui/components/FormNew';
// import AriaSelect from '@ui/components/Form/AriaSelect';
import { FiPlusCircle } from 'react-icons/fi';
import UIStoreContext from '@ui/stores/UIStore';
import WarehouseForm from '@ui/components/WarehouseForm';
import { Warehouse } from '@shared/types';
import Warehouses from '@ui/components/Warehouses';

interface WarehouseSelectProps {
  name: string;
  label?: string;
  className?: string;
  options?: Warehouse[];
}

const WarehouseSelect: React.FC<WarehouseSelectProps> = observer(
  ({ name, label, className, options }) => {
    const uiStore = useContext(UIStoreContext);

    const [warehouses] = useGraphQLQuery(FETCH_WAREHOUSES, { loadOnMount: true });

    return (
      <SelectInput
        name={name}
        label={label}
        className={className}
        optionLabel={warehouse => warehouse.name}
        // optionMap={{ label: (warehouse) => warehouse.name }}
        options={options || warehouses || []}
        searchProps={{
          placeholder: 'Otsi ladu',
          debounce: 0,
          onSearch: query =>
            warehouses?.filter(wh => wh.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        }}
        menuAction={{
          label: (
            <>
              <FiPlusCircle style={{ marginRight: '0.25rem' }} />
              Lisa ladu
            </>
          ),
          onClick: () => uiStore.openModal(<Warehouses />)
        }}
      />
    );
  }
);

export default WarehouseSelect;
