export interface LogInFormProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface LogInFormValues {
  username: string;
  password: string;
  // confirmPassword: string;
  // agreeTerms: boolean;
}
