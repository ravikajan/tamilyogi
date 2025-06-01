export const checkDisposableEmail = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split('@')[1];
    const response = await fetch(`https://disposable.debounce.io/?email=${domain}`);
    const data = await response.json();
    return data.disposable === 'true';
  } catch (error) {
    console.error('Error checking disposable email:', error);
    return false; // Allow if service fails
  }
};

export const validateEmail = async (email: string) => {
  const isDisposable = await checkDisposableEmail(email);
  if (isDisposable) {
    return {
      isValid: false,
      error: 'Temporary email addresses are not permitted. Please use a permanent email.'
    };
  }
  return { isValid: true };
};
