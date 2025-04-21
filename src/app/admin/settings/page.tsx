import { getSettings } from '@/models/setting'
import { SettingsList } from '@/components/settings/settings-list'
import { SettingDialog } from '@/components/settings/setting-dialog'
import { Separator } from '@/components/ui/separator'

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="container p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <SettingDialog />
      </div>
      <Separator />
      <SettingsList items={settings} />
    </div>
  )
} 