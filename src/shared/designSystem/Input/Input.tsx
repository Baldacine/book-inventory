import {
  InputWrapper,
  StyledInput,
  StyledTextarea,
  Label,
  Required,
  ErrorMessage,
} from "./styles";
import type { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  label,
  required,
  error,
  textarea,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && (
        <Label>
          {label}
          {required ? <Required>*</Required> : ""}
        </Label>
      )}
      {textarea ? (
        <StyledTextarea {...props} hasError={!!error} />
      ) : (
        <StyledInput {...props} hasError={!!error} />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};
