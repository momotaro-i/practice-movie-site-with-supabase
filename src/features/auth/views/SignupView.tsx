import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { SignupForm } from '@/features/auth/components/SignupForm';

export const SignupView = () => {
  return (
    <AuthPageLayout>
      <SignupForm />
    </AuthPageLayout>
  );
};
