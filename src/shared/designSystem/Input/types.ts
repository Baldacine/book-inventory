import type { ChangeEvent } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    required?: boolean;
    type: string;
    value: string;
    error?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textarea?: boolean;
    placeholder?: string;
}
