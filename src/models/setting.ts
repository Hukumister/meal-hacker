import {cache} from 'react'
import {prisma} from '@/lib/prisma'
import {Prisma} from '@prisma/client'

export const getSettings = cache(async () => {
    return prisma.setting.findMany({
        orderBy: {key: 'asc'}
    })
})

export const getSetting = cache(async (key: string) => {
    return prisma.setting.findUniqueOrThrow({
        where: {key}
    })
})

export const createSetting = async (data: Prisma.SettingCreateInput) => {
    return prisma.setting.create({data})
}

export const updateSetting = async (id: string, data: Prisma.SettingUpdateInput) => {
    return prisma.setting.update({
        where: {id},
        data
    })
}

export const deleteSetting = async (id: string) => {
    return prisma.setting.delete({
        where: {id}
    })
}