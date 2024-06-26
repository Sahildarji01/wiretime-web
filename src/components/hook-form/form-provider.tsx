// import { UseFormReturn, FormProvider as Form } from 'react-hook-form';
import { UseFormReturn, FormProvider as RHFFormProvider } from 'react-hook-form';
// ----------------------------------------------------------------------

// type Props = {
//   children: React.ReactNode;
//   methods: UseFormReturn<any>;
//   onSubmit?: VoidFunction;
// };
type FormProviderProps = {
  methods: UseFormReturn<any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children: React.ReactNode;
};

// export default function FormProvider({ children, onSubmit, methods }: Props) {
//   return (
//     <Form {...methods}>
//       <form onSubmit={onSubmit}>{children}</form>
//     </Form>
//   );
// }
export default function FormProvider({ methods, onSubmit, children }: FormProviderProps) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFFormProvider>
  );
}
