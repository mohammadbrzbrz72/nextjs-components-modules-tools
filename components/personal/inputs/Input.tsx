import clsx from "clsx";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

interface IInput {
  label: string;
  placeholder: string;
  name: string;
  classes?: Partial<{
    root: string;
    label: string;
    input: string;
  }>;
}

const styles = {
  root: `
  `,
  label: `
  `,
  input: `
  `,
};

export function Input({ classes, label }: IInput) {
  const methods = useFormContext();
  console.log({ ...methods });

  return (
    <div className={clsx(styles.root, classes?.root)}>
      <label className={clsx(styles.label, classes?.label)}>{label}</label>
      <input className={clsx(styles.input, classes?.input)} {...methods} />
    </div>
  );
}
