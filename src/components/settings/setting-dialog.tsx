'use client'

import {useActionState, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Edit2Icon, PlusIcon} from 'lucide-react'
import {Setting} from '@prisma/client'
import {createSettingAction, updateSettingAction} from '@/app/admin/settings/actions'
import {settingFormSchema, type SettingFormValues} from '@/form/setting'
import {Button} from '@/components/ui/button'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import AsyncForm from '@/components/async-form'
import {fillFormErrors} from '@/lib/form'

interface SettingDialogProps {
    setting?: Setting
}

export function SettingDialog({setting}: SettingDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isEditing = !!setting

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(settingFormSchema),
        defaultValues: {
            key: setting?.key || '',
            value: setting?.value || '',
            description: setting?.description || '',
        },
    })

    const serverAction = setting && setting.id
        ? updateSettingAction.bind(null, setting.id)
        : createSettingAction

    const [state, action, pending] = useActionState(
        serverAction,
        {success: false, message: '', errors: []}
    )

    useEffect(() => {
        form.clearErrors()
        if (state.success) {
            setIsOpen(false)
            form.reset()
        } else {
            fillFormErrors(form, state.errors)
        }
    }, [state, form])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                    <Button variant="ghost" size="icon">
                        <Edit2Icon className="h-4 w-4"/>
                    </Button>
                ) : (
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4"/>
                        Add Setting
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="scroll-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Setting' : 'Create Setting'}
                    </DialogTitle>
                </DialogHeader>
                <AsyncForm form={form} onAction={action} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="key"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="Key..." {...field} />
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
                                    <Input placeholder="Optional" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="value"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Value"
                                        className="resize-none max-h-[250px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={pending}>
                        {isEditing ? 'Update Setting' : 'Create Setting'}
                    </Button>
                </AsyncForm>
            </DialogContent>
        </Dialog>
    )
} 