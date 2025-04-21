'use server'

import {revalidatePath} from 'next/cache'
import {z} from 'zod'
import {settingFormSchema} from '@/form/setting'
import {createSetting, deleteSetting, updateSetting} from '@/models/setting'
import {ActionResponse, FormResponse} from '@/types/response'

export async function createSettingAction(
    prevState: any,
    formData: z.infer<typeof settingFormSchema>
): Promise<FormResponse<boolean>> {
    try {
        const result = settingFormSchema.safeParse(formData)
        if (!result.success) {
            return {
                success: false,
                errors: result.error.issues
            }
        }

        await createSetting(result.data)
        revalidatePath('/admin/settings')

        return {
            success: true,
            data: true
        }

    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to create setting",
            errors: []
        }
    }
}

export async function updateSettingAction(
    id: string,
    prevState: any,
    formData: z.infer<typeof settingFormSchema>
): Promise<FormResponse<boolean>> {
    try {
        const result = settingFormSchema.safeParse(formData)
        if (!result.success) {
            return {
                success: false,
                errors: result.error.issues
            }
        }

        await updateSetting(id, result.data)
        revalidatePath('/admin/settings')

        return {
            success: true,
            data: true
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to update setting",
            errors: []
        }
    }
}

export async function deleteSettingAction(
    id: string
): Promise<ActionResponse<boolean>> {
    try {

        await deleteSetting(id)
        revalidatePath('/admin/settings')

        return {
            success: true,
            data: true
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to delete setting"
        }
    }
} 