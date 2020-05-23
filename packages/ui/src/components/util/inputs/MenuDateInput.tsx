import styled from '@ui/util/styled';
import DateInput from '@ui/components/FormNew/DateInput';
import { styledInput } from './MenuSelect';

export default styled(DateInput)`
  ${({ theme }) => `
    ${styledInput.general(theme)}
  `}
`;
