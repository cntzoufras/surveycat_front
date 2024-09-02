import React from 'react';

const VerificationError = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Verification Failed</h1>
    <p>
      There was an error verifying your email. The link might be invalid or expired. 
      Please try again or request a new verification email.
    </p>
  </div>
);

export default VerificationError;
