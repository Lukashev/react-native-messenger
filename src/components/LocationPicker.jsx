import React, { useEffect } from 'react'
import { PLACES_API_KEY } from 'react-native-dotenv'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../theme';

const LocationPicker = (props) => {
  const { onPress, placeholder = 'Search' } = props
  return (
    <GooglePlacesAutocomplete
      minLength={2}
      query={{
        key: PLACES_API_KEY,
        language: 'en'
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
      styles={{
        textInputContainer: {
          width: '100%',
          borderWidth: 2,
          height: 40,
          borderColor: colors['primary'],
          borderRadius: 10,
          borderTopWidth: 2,
          borderTopColor: colors['primary'],
          borderBottomWidth: 2,
          borderBottomColor: colors['primary'],
          backgroundColor: colors['secondary']
        },
        textInput: {
          paddingTop: 0,
          paddingBottom: 4.5
        },
        description: {
          color: colors['primary']
        }
      }}
      onPress={onPress}
      placeholder={placeholder}
      enablePoweredByContainer={false}
      debounce={200}
      fetchDetails
    />
  )
}

export default LocationPicker
