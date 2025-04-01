import {
	type FieldValues,
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";

/**
 * Wrapper around useForm that sets the mode to "onChange"
 *
 * @param props - The props to pass to useForm
 * @returns The form instance
 */
export function useFormWithOnChange<
	TFieldValues extends FieldValues = FieldValues,
	TContext extends Record<string, unknown> = Record<string, unknown>,
>(
	props?: Omit<UseFormProps<TFieldValues, TContext>, "mode">,
): UseFormReturn<TFieldValues, TContext> {
	return useForm<TFieldValues, TContext>({
		mode: "onChange",
		...props,
	});
}
