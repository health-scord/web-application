export interface SignUpFormProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  initialValues?: any;
}

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  agreeTerms: boolean;
}
