import styled from 'styled-components';

export const AutosuggestInputContainer = styled.div`
  &,
  .react-autosuggest__container,
  .input-field {
    width: 100%;
    height: 100%;
    outline: none;
    background: transparent;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .react-autosuggest__section-title {
    padding: 0.25rem 0.5rem;
}

  .react-autosuggest__suggestions-container--open {
    position: absolute;
    overflow: auto;
    top: 100%;
    width: 100%;
    background: white;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border: 1px solid #f0f0f0;
    padding: 0.25rem;
    z-index: 9999;
    box-sizing: border-box;
  }
`;

interface DefaultSuggestionItemProps {
  isHighlighted: boolean;
}

export const DefaultSuggestionItem = styled.div<DefaultSuggestionItemProps>`
  padding: 0.375rem 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  background: ${({ isHighlighted }) => (isHighlighted ? '#f0f0f0' : 'transparent')};
`;
