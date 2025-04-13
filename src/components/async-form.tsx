import {Form as FormRoot} from "@/components/ui/form";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {ReactNode, startTransition} from "react";

export default function AsyncForm<T extends FieldValues>(
    {
        form,
        className,
        onAction,
        children
    }: {
        form: UseFormReturn<T>,
        className?: string,
        onAction: (values: T) => void,
        children: ReactNode
    }
) {

    function onSubmit(values: T) {
        startTransition(() => {
            onAction(values)
        })
    }

    return (
        <FormRoot {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </FormRoot>
    )
}
