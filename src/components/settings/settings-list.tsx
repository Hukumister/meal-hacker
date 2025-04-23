'use client'

import { Setting } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { TrashIcon } from 'lucide-react'
import { deleteSettingAction } from '@/app/admin/settings/actions'
import { Button } from '@/components/ui/button'
import {
  Card, CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SettingDialog } from './setting-dialog'

interface SettingsListProps {
  items: Setting[]
}

export function SettingsList({ items }: SettingsListProps) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const result = await deleteSettingAction(id)
    if (result.success) {
      router.refresh()
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {items.map((setting) => (
        <Card key={setting.id}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{setting.key}</CardTitle>
            {setting.description && (
              <CardDescription>{setting.description}</CardDescription>
            )}
            <CardAction>
              <SettingDialog setting={setting} />
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(setting.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="break-all truncate">
              Value: {JSON.stringify(setting.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
 