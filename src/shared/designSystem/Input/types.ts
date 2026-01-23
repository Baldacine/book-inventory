import type { ChangeEvent } from "react";

export interface InputProps {
    label?: string;
    type: string;
    value: string;
    error?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textarea?: boolean;
    placeholder?: string;
}
