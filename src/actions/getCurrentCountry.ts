'use server';
export type GeolocationResult = {
  success: boolean;
  country?: string;
  error?: string;
};

export const getCurrentCountry = async (): Promise<GeolocationResult> => {
  try {
    // First get IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    
    // Then get location
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    
    if (data.country) {
      return {
        success: true,
        country: data.country
      };
    } else {
      return {
        success: false,
        error: 'Country information not available'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
