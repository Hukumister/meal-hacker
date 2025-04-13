import {FieldValues, UseFormReturn} from "react-hook-form";
import {ZodIssue} from "zod";

export function fillFormErrors<T extends FieldValues>(
    form: UseFormReturn<T>,
    errors: ZodIssue[]
) {
    errors.forEach((error) => {
        const path = error.path.join(".")
        form.setError(`root.${path}`, error);
    })
}