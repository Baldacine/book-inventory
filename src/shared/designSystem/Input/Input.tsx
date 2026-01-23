import {
  InputWrapper,
  StyledInput,
  StyledTextarea,
  Label,
  ErrorMessage,
} from "./styles";
import type { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  label,
  error,
  textarea,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      {textarea ? <StyledTextarea {...props} /> : <StyledInput {...props} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};
