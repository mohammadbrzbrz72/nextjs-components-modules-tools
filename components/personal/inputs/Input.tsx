"use client";

import clsx from "clsx";
import type {
  UseFormReturn,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface IInput {
  type?: "text" | "number" | "email";
  label: string;
  placeholder: string;
  name: string;
  classes?: Partial<{
    root: string;
    label: string;
    input: string;
  }>;
  methods: UseFormReturn<FieldValues, any, undefined>;
  validation?: RegisterOptions<FieldValues, string>;
}

const styles = {
  root: `
    flex flex-col gap-1
  `,
  label: `
    text-xs font-normal leading-6
  `,
  input: `
    py-2 px-4
    rounded-lg border border-gray-200 shadow-sm
    focus:outline-0 focus:shadow-md
  `,
};

export function Input({
  type = "text",
  name,
  classes,
  label,
  methods,
  placeholder,
  validation,
}: IInput) {
  return (
    <div className={clsx(styles.root, classes?.root, " ")}>
      <label className={clsx(styles.label, classes?.label)}>{label}</label>
      <input
        type={type}
        className={clsx(styles.input, classes?.input)}
        {...methods.register(name, validation)}
        placeholder={placeholder}
      />
      <span className="text-[10px] text-red-600 min-h-[10px]">
        {(methods?.formState?.errors[name]?.message as string) ?? ""}
      </span>
    </div>
  );
}
