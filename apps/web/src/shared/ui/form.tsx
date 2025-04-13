"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type Mode,
	type SubmitHandler,
	type UseFormProps,
	type UseFormReturn,
	useForm,
	useFormContext,
	useFormState,
} from "react-hook-form";
import type { ZodType } from "zod";

import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/utils/cn";

// const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-xs", className)}
			{...props}
		>
			{body}
		</p>
	);
}

type FormProps<
	TFormValues extends FieldValues,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Schema extends ZodType<TFormValues, any, TFormValues>,
> = {
	schema: Schema;
	onSubmit: SubmitHandler<TFormValues>;
	children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
	className?: string;
	options?: UseFormProps<TFormValues>;
	id?: string;
	mode?: Mode;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "children">;

const Form = <
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Schema extends ZodType<TFormValues, any, TFormValues>,
	TFormValues extends FieldValues,
>({
	schema,
	onSubmit,
	children,
	className,
	options,
	id,
	mode = "onChange",
	...formProps
}: FormProps<TFormValues, Schema>) => {
	const form = useForm({ ...options, resolver: zodResolver(schema), mode });

	return (
		<FormProvider {...form}>
			<form
				className={cn("space-y-6", className)}
				onSubmit={form.handleSubmit(onSubmit)}
				id={id}
				{...formProps}
			>
				{children(form)}
			</form>
		</FormProvider>
	);
};

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
