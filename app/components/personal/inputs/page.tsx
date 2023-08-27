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

const defaultValues: IFormInput = {
  full_name: "Jack",
  fathers_name: "",
};

export default function InputsPage() {
  const methods = useForm<IFormInput>({
    defaultValues,
  });
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
    <div className="flex flex-col gap-3">
      <Input
        label="Full Name"
        name="full_name"
        methods={methods}
        placeholder="Jack Martin"
        validation={{
          minLength: {
            value: 6,
            message: "Insert 6 characters at least",
          },
        }}
      />
      <Input
        label="Father's Name"
        name="fathers_name"
        methods={methods}
        placeholder="Father's Name"
        validation={{
          required: {
            value: true,
            message: "Please fill the father's name",
          },
        }}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        methods={methods}
        placeholder="something@gmail.com"
        validation={{
          required: {
            value: true,
            message: "Please fill the email",
          },
        }}
      />
      <Input
        type="number"
        label="Age"
        name="age"
        methods={methods}
        placeholder="30"
        validation={{
          required: {
            value: true,
            message: "Please fill the age input",
          },
          min: {
            value: 16,
            message: "At least 16 years old",
          },
        }}
      />
    </div>
  );
}
