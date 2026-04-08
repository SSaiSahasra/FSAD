import { useEffect, useRef } from 'react';

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

const GoogleAuthButton = ({ onCredential, onError, buttonText = 'continue_with' }) => {
  const buttonRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const initError = clientId ? '' : 'Google Sign-In is not configured. Add VITE_GOOGLE_CLIENT_ID.';

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const initializeButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) {
        return;
      }

      buttonRef.current.innerHTML = '';

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response?.credential) {
            onCredential(response.credential);
          } else {
            onError?.('Google Sign-In failed. Try again.');
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        text: buttonText,
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      initializeButton();
      return;
    }

    const existingScript = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', initializeButton);
      return () => existingScript.removeEventListener('load', initializeButton);
    }

    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = initializeButton;
    script.onerror = () => onError?.('Unable to load Google Sign-In.');
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [buttonText, onCredential, onError, clientId]);

  if (initError) {
    return <p className="text-xs text-red-600 text-center">{initError}</p>;
  }

  return (
    <div className="space-y-2">
      <div ref={buttonRef} className="flex justify-center" />
    </div>
  );
};

export default GoogleAuthButton;
