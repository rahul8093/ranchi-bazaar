import { Suspense } from 'react';
import VerifyEmailClient from '../../components/VerifyEmailClient';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
