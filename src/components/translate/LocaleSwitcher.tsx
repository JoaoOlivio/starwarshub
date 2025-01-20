import { useLocale, useTranslations } from "next-intl"
import LocaleSwitcherSelect from "./LocaleSwitcherSelect"

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale()

  const items = [
    { value: "en", label: "EN" },
    { value: "pt", label: "PT" },
  ]

  return <LocaleSwitcherSelect defaultValue={locale} items={items} label={t("label")} />
}

