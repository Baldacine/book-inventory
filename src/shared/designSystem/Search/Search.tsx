import { SearchWrapper, Input, ClearButton } from "./styles";
import type { SearchProps } from "./types";

export function Search({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
}: SearchProps) {
  return (
    <SearchWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <ClearButton
          onClick={() => {
            onClear?.();
          }}
        >
          Clear
        </ClearButton>
      )}
    </SearchWrapper>
  );
}
