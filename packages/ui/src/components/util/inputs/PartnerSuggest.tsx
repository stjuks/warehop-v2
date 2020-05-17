import React from 'react';
import { useGraphQLQuery } from '@ui/util/hooks';
import { FETCH_CREDITINFO_PARTNERS, FETCH_PARTNERS } from '@ui/api/partner';
import { AutosuggestInput } from '@ui/components/FormNew';

interface PartnerSuggestProps {
  name: string;
  label: string;
}

const PartnerSuggest: React.FC<PartnerSuggestProps> = ({ name, label }) => {
  const [creditInfoPartners, { fetch: fetchCreditInfoPartners }] = useGraphQLQuery(
    FETCH_CREDITINFO_PARTNERS
  );

  const [partners, { fetch: fetchPartners }] = useGraphQLQuery(FETCH_PARTNERS);

  const handleAutosuggestSelect = ({ homepage, ...restValue }, { setValues, values }) => {
    setValues({
      ...values,
      ...restValue,
    });
  };
  
  return (
    <AutosuggestInput
      name={name}
      label={label}
      multiSection={true}
      suggestions={[
        { title: 'E-krediidiinfo', suggestions: creditInfoPartners || [] },
        { title: 'Partnerid', suggestions: partners?.data || [] },
      ]}
      suggestionLabel={(suggestion) => suggestion.name}
      fetchSuggestions={(value) => {
        fetchCreditInfoPartners({ query: value });
        fetchPartners({ name: value });
      }}
      onSelect={handleAutosuggestSelect}
    />
  );
};

export default PartnerSuggest;
