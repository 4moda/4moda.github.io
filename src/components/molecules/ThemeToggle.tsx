import { ui } from '../../data/content'
import { useLang } from '../../lib/i18n'
import { useTheme } from '../../lib/theme'
import { IconButton } from '../atoms'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLang()
  return (
    <IconButton label={t(ui.themeToggle)} onClick={toggleTheme}>
      {theme === 'dark' ? '☀' : '☾'}
    </IconButton>
  )
}
