import styled from 'styled-components';
import theme from '@ui/styles/theme';

import DateInput from '@ui/components/FormNew/DateInput';
import { styledInput } from './MenuSelect';

export default styled(DateInput)`
  ${styledInput.general()}
`;
