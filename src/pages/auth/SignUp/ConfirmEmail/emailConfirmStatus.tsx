import { useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import React from 'react';

const EmailConfirmationStatus: React.FC = () => {
  const { registrationStatus, registeredEmail, error } = useAppSelector(
    (state: RootState) => state.auth,
  );

  if (registrationStatus === 'pending_confirmation') {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-4">
          Email Verification Required
        </h2>
        <p>
          We've sent a confirmation email to <strong>{registeredEmail}</strong>.
          Please check your inbox and click the verification link to complete
          your registration.
        </p>
      </div>
    );
  }

  if (registrationStatus === 'confirming') {
    return (
      <div className="text-center p-4">
        <p>Verifying your email...</p>
      </div>
    );
  }

  if (registrationStatus === 'confirmed') {
    return (
      <div className="text-center p-4 text-green-600">
        <p>Email verified successfully! You are now registered.</p>
      </div>
    );
  }

  if (registrationStatus === 'failed') {
    return (
      <div className="text-center p-4 text-red-600">
        <p>Verification failed: {error}</p>
        <p>Please try registering again.</p>
      </div>
    );
  }

  return null;
};

export default EmailConfirmationStatus;
