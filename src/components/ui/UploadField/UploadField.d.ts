export interface UploadFieldProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  helperText?: string;
  label?: string;
  fieldName: string;
  fieldInfo?: string;
}
