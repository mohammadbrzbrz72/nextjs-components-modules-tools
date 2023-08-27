"use client";

import clsx from "clsx";
import type { UseFormReturn, FieldValues } from "react-hook-form";
interface IInput {
  label: string;
  placeholder: string;
  name: string;
  classes?: Partial<{
    root: string;
    label: string;
    input: string;
  }>;
  methods: UseFormReturn<FieldValues, any, undefined>;
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

export function Input({ name, classes, label, methods, placeholder }: IInput) {
  return (
    <div className={clsx(styles.root, classes?.root, " ")}>
      <label className={clsx(styles.label, classes?.label)}>{label}</label>
      <input
        className={clsx(styles.input, classes?.input)}
        {...methods.register(name)}
        placeholder={placeholder}
      />
    </div>
  );
}
