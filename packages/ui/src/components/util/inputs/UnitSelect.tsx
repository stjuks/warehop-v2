import React, { useContext } from 'react';
import AriaSelect from '@ui/components/Form/AriaSelect';
import CommonStoreContext from '@ui/stores/CommonStore';
import { observer } from 'mobx-react-lite';
import { FiPlusCircle } from 'react-icons/fi';

interface UnitSelectProps {
  name: string;
  label: string;
}

const UnitSelect: React.FC<UnitSelectProps> = observer(({ name, label }) => {
  const commonStore = useContext(CommonStoreContext);

  return (
    <AriaSelect
      label={label}
      name={name}
      options={commonStore.units}
      optionMap={{ label: unit => unit.name }}
      action={{
        label: (
          <>
            <FiPlusCircle style={{ marginRight: '0.25rem' }} />
            Lisa ühik
          </>
        ),
        onClick: () => console.log('Lisa ühik')
      }}
    />
  );
});

export default UnitSelect;
