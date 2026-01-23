import type { ChangeEvent } from "react";

export interface InputProps {
    label?: string;
    required?: boolean;
    type: string;
    value: string;
    error?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textarea?: boolean;
    placeholder?: string;
}
