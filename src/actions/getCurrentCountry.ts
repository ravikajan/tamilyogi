'use server';
export type GeolocationResult = {
  success: boolean;
  country?: string;
  error?: string;
};

export const getCurrentCountry = async (): Promise<GeolocationResult> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    if (data.country_name) {
      return {
        success: true,
        country: data.country_name
      };
    } else {
      return {
        success: false,
        error: 'Country information not available'
      };
    }
  } catch (error) {
    console.error('Error detecting location:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
