import {useFetcher, useLoaderData} from '@remix-run/react'
import {Moon, Sun} from 'lucide-react'

export const loader = () => {
  let themePreference: string = 'dark'
  return {themePreference}
}
export function ThemeToggle() {
  const cookieToggle = useFetcher()
  const data = useLoaderData<typeof loader>()

  const isDarkMode = data?.themePreference === `dark`

  return (
    <cookieToggle.Form method="post" action="/resource/toggle-theme">
      <button type="submit" disabled={cookieToggle.state === 'submitting'}>
        {isDarkMode ? (
          <Sun className="h-auto w-4" />
        ) : (
          <Moon className="h-auto w-4" />
        )}
        <div className="sr-only select-none">
          {isDarkMode ? `Light` : `Dark`} Mode
        </div>
      </button>
    </cookieToggle.Form>
  )
}
