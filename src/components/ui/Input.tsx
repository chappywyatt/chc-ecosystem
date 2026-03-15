"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = "", ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={className}>
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-text"
        >
          {label}
          {props.required && <span className="ml-0.5 text-status-untrained">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-text
            placeholder:text-text-tertiary
            focus:ring-2 focus:outline-none
            ${
              error
                ? "border-status-untrained focus:border-status-untrained focus:ring-status-untrained/20"
                : "border-border focus:border-fluent focus:ring-fluent-light"
            }`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-status-untrained">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
