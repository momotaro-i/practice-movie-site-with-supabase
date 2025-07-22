import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { SignInForm } from '@/features/auth/components/SignInForm';

export const SigninView = () => {
  return (
    <AuthPageLayout>
      <SignInForm />
    </AuthPageLayout>
  );
};
