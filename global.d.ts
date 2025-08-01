export {};
declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => void;
  }

  interface CredentialResponse {
    clientId?: string;
    credential: string;
    select_by: string;
  }
}
