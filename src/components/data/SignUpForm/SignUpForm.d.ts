export interface SignUpFormProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
  // agreeTerms: boolean;
}
