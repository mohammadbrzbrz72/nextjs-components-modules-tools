"use client";

import React from "react";
import { Input } from "@/components/personal";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface IFormInput {
  full_name: string;
  fathers_name: string;
}

const styles = {
  submitButton: `
    min-w-[160px] h-10
    mt-5
    bg-slate-200 cursor-pointer
    rounded-md
    text-sm font-bold
  `,
};

export default function InputsPage() {
  const methods = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  // console.log(methods.formState.isDirty); // make sure formState is read before render to enable the Proxy

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Inputs />
        <input type="submit" className={styles.submitButton} />
      </form>
    </FormProvider>
  );
}

function Inputs() {
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Full Name"
        methods={methods}
        placeholder="Jack Martin"
        name="full_name"
      />
      <Input
        label="Father's Name"
        methods={methods}
        placeholder="Father's Name"
        name="fathers_name"
        validation={{
          required: {
            value: true,
            message: "Please fill father's name",
          },
        }}
      />
    </div>
  );
}
