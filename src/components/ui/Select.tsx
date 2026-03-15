"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, id, className = "", ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={className}>
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-text"
        >
          {label}
          {props.required && <span className="ml-0.5 text-status-untrained">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`h-11 w-full rounded-lg border bg-white px-3 text-text
            focus:ring-2 focus:outline-none appearance-none
            bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23605E5C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
            bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-10
            ${
              error
                ? "border-status-untrained focus:border-status-untrained focus:ring-status-untrained/20"
                : "border-border focus:border-fluent focus:ring-fluent-light"
            }`}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-status-untrained">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, type SelectOption };
