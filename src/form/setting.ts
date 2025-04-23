import {z} from 'zod'

export const settingFormSchema = z.object({
    key: z.string().min(1, "Key is required"),
    value: z.string()
        .min(1, "Value is required")
        .max(10000),
    description: z.string().optional()
})

export type SettingFormValues = z.infer<typeof settingFormSchema> 