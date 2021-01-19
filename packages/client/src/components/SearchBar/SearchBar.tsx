import { useCallback } from 'react';
import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './SearchBar.css';

interface State {
  address: string;
  errorMessage: string;
}

const initialState: State = {
  address: '',
  errorMessage: '',
};

export const SearchBar = () => {
  const [state, setState] = useState<State>(initialState);

  const handleChange = useCallback(
    (address: string) => {
      setState({
        ...state,
        address,
        errorMessage: '',
      });
    },
    [state]
  );

  const handleSelect = useCallback(
    async (selected: string) => {
      setState({ ...state, address: selected });
    },
    [state]
  );

  const handleCloseClick = useCallback(() => {
    setState({
      ...state,
      address: '',
    });
  }, [state]);

  const handleError = useCallback(
    (status: string, clearSuggestions: any) => {
      console.log('Error from Google Maps API', status);
      setState({ ...state, errorMessage: status });
      clearSuggestions();
    },
    [state]
  );

  return (
    <div>
      <PlacesAutocomplete
        onChange={handleChange}
        value={state.address}
        onSelect={handleSelect}
        onError={handleError}
        shouldFetchSuggestions={state.address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }: any) => (
          <div className="search-bar-container">
            <div className="search-input-container">
              <input
                {...getInputProps({
                  placeholder: 'Search Places...',
                  className: 'search-input',
                })}
              />
              {state.address.length > 0 && (
                <button className="clear-button" onClick={handleCloseClick}>
                  x
                </button>
              )}
            </div>
            {Boolean(suggestions.length) && (
              <div className="autocomplete-container">
                {suggestions.map((suggestion: any) => (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className: suggestion.active ? 'suggestion-item suggestion-item--active' : 'suggestion-item',
                    })}
                  >
                    <strong>{suggestion.formattedSuggestion.mainText}</strong>{' '}
                    <small>{suggestion.formattedSuggestion.secondaryText}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
      {Boolean(state.errorMessage.length) && <div className="error-message">No Results</div>}
    </div>
  );
};
