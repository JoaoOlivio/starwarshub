import { Copyright } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="mt-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t py-4">
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground flex items-center">
          <Copyright className="h-4 w-4 mr-2" />
          {new Date().getFullYear()} {t("footer.copyright")} João Olívio
        </p>
      </div>
    </footer>
  )
}

