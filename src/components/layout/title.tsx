import { useTranslations } from "next-intl";

export default async function Title() {
  const t = useTranslations();

  return (
    <div className="text-center space-y-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-2">
        {t("app.title")}
      </h1>
      <p className="text-muted-foreground text-lg">
      {t("app.description")}
      </p>
    </div>
  );
}
