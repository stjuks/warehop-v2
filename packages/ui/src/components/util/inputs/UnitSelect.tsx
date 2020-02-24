import React, { useContext } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import CommonStoreContext from '@ui/stores/CommonStore';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';
import UIStoreContext from '@ui/stores/UIStore';
import UnitForm from '@ui/components/UnitForm';

interface UnitSelectProps {
  name: string;
  label: string;
}

const UnitSelect: React.FC<UnitSelectProps> = observer(({ name, label }) => {
  const commonStore = useContext(CommonStoreContext);
  const uiStore = useContext(UIStoreContext);

  return (
    <AriaSelect
      label={label}
      name={name}
      options={commonStore.units}
      optionMap={{ label: unit => `${unit.name} (${unit.abbreviation})` }}
      searchPlaceholder="Otsi ühikut"
      onSearch={query =>
        commonStore.units.filter(
          unit =>
            unit.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            unit.abbreviation.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      }
      action={{
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
