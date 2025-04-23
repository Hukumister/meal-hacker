'use client';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useActionState, useEffect} from "react";
import {type CreateRecipeFormValues, createRecipeSchema} from "@/form/recipe";
import {createRecipeAction} from "@/app/recipes/actions";
import {fillFormErrors} from "@/lib/form";
import AsyncForm from "@/components/async-form";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export function CreateRecipeDialog() {
    const form = useForm<CreateRecipeFormValues>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const [state, action, pending] = useActionState(createRecipeAction, {
        success: false,
        message: "",
        errors: [],
    });

    useEffect(() => {
        form.clearErrors();
        if (state.success) {
            form.reset();
        } else {
            fillFormErrors(form, state.errors);
        }
    }, [state, form]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Recipe</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Recipe</DialogTitle>
                </DialogHeader>
                <AsyncForm
                    form={form}
                    onAction={action}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter recipe title" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none max-h-[250px]"
                                        placeholder="Enter recipe description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {!state.success && state.message && <FormMessage>{state.message}</FormMessage>}
                    <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={pending}>
                            {pending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </AsyncForm>
            </DialogContent>
        </Dialog>
    );
} 