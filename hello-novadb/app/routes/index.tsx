import { useLoaderData } from "react-router";
import { LanguageKey } from "~/api/api.types";
import { loadWebPage } from "~/api/page";
import { Route } from "./+types/index";

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data.page?.props?.webTitle }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const preferredLangauge = acceptedBrowserLanguague(request);
  const page = await loadWebPage(preferredLangauge);
  return { preferredLangauge, page };
};

export default function Index() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            {page.props?.webTitle}
            <span className="sr-only">React Router with NovaDB</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/rr_lockup_light.png"
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src="/rr_lockup_dark.png"
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
      </div>
    </div>
  );
}

function acceptedBrowserLanguague(request: Request): LanguageKey {
  const acceptedLanugageHeader = request.headers.get("Accept-Language");
  if (acceptedLanugageHeader == null) return "en-US";

  const acceptedLanguages = acceptedLanugageHeader.split(",");
  if (acceptedLanguages.length === 0) return "en-US";

  const langKey = acceptedLanguages[0].split(";")[0].split("-")[0];
  switch (langKey) {
    case "de":
      return "de-DE";
    default:
      return "en-US";
  }
}
