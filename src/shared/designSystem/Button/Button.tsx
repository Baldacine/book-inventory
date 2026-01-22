import { StyledButton } from "./styles";
import type { ButtonProps } from "./types";

export function Button({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
}
