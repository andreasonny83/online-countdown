import { useCallback } from 'react';
import { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './SearchBar.css';

interface State {
  address: string;
  errorMessage: string;
  isGeocoding: boolean;
  latitude?: number;
  longitude?: number;
}

const initialState: State = {
  address: '',
  errorMessage: '',
  isGeocoding: false,
  latitude: undefined,
  longitude: undefined,
};

export const SearchBar = () => {
  const [state, setState] = useState<State>(initialState);

  const handleChange = useCallback(
    (address: string) => {
      setState({
        ...state,
        address,
        errorMessage: '',
        latitude: undefined,
        longitude: undefined,
      });
    },
    [state]
  );

  const handleSelect = useCallback(
    async (selected: string) => {
      setState({ ...state, isGeocoding: true, address: selected });

      try {
        const res = await geocodeByAddress(selected);
        const { lat, lng } = await getLatLng(res[0]);

        setState({
          ...state,
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      } catch (error: any) {
        setState({ ...state, isGeocoding: false });
        console.log('error', error);
      }
    },
    [state]
  );

  const handleCloseClick = useCallback(() => {
    setState({
      ...state,
      address: '',
      latitude: undefined,
      longitude: undefined,
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
            {suggestions.length > 0 && (
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
      {state.errorMessage.length > 0 && <div className="error-message">{state.errorMessage}</div>}

      {((state.latitude && state.longitude) || state.isGeocoding) && (
        <div>
          <h3 className="geocode-result-header">Geocode result</h3>
          {state.isGeocoding ? (
            <div>
              LOADING
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw spinner" />
            </div>
          ) : (
            <div>
              <div className="geocode-result-item--lat">
                <label>Latitude:</label>
                <span>{state.latitude}</span>
              </div>
              <div className="geocode-result-item--lng">
                <label>Longitude:</label>
                <span>{state.longitude}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
