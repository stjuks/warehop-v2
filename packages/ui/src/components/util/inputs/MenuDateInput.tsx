import styled from '@ui/util/styled';
import DateInput from '../../Form/DateInput';
import { styledInput } from './MenuSelect';

export default styled(DateInput)`
  ${({ theme }) => `
    ${styledInput.general(theme)}

    .input-field {
      ${styledInput.button.general(theme)}
    }

    .input-field:hover {
      ${styledInput.button.hover(theme)}
    }
  `}
`;
