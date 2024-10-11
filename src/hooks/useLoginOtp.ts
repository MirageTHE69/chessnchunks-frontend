import { useContext } from 'react';
import { LoginOTPContext } from '@/context/login-otp-context';

const useLoginOtp = () => {
  const context = useContext(LoginOTPContext);
  if (context === undefined) {
    throw new Error("useLoginOtp must be used within a LoginOTPProvider");
  }
  return context;
};

export default useLoginOtp;
