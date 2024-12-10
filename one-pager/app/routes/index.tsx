import type { MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { loadWebPage } from "~/api/page";
import { Modules } from "~/components/Module";
import { Route } from "../+types/root";
import { LanguageKey } from "~/api/api.types";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.page.props.webTitle }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const preferredLangauge = acceptedBrowserLanguague(request);
  const page = await loadWebPage(preferredLangauge);
  return { preferredLangauge, page };
};

export default function Index() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="py-8 px-14 border-b border-solid border-gray dark:border-white/20">
        <h1 className="leading-8 max-w-4xl m-auto text-center text-2xl text-gray-800 dark:text-gray-100 font-mono font-light">
          {page.props?.webTitle}
        </h1>
      </header>
      <Modules modules={page?.references?.modules ?? []} />
      <footer className="bg-[#9cc544] dark:bg-[#1e1a3c] p-5 pb-8 clear-both text-center">
        <span className="text-white dark:text-white/40 hover:underline after:border-r after:ml-3 after:border-white/40 dark:after:border-white/20">
          Created with ❤ in Würzburg
        </span>
        <Link
          to={`https://www.noxum.com`}
          target="_blank"
          rel="noopener noreferrer"
          title="noxum"
          className="text-white dark:text-white/40 hover:underline mx-2"
        >
          www.noxum.com
        </Link>

        <svg
          version="1.1"
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 128 128"
          className="w-8 float-right dark:opacity-40"
          fill="#fff"
        >
          <g>
            <path
              d="M109.3,9.4c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3s-9.3-4.2-9.3-9.3C100.1,13.6,104.2,9.4,109.3,9.4
                M109.3,0C99,0,90.7,8.4,90.7,18.7s8.4,18.7,18.7,18.7c10.3,0,18.7-8.4,18.7-18.7S119.6,0,109.3,0L109.3,0z"
            />
            <path
              d="M109.3,54.7c5.1,0,9.3,4.2,9.3,9.3s-4.2,9.3-9.3,9.3s-9.3-4.2-9.3-9.3S104.2,54.7,109.3,54.7 M109.3,45.3
                C99,45.3,90.7,53.7,90.7,64s8.4,18.7,18.7,18.7c10.3,0,18.7-8.4,18.7-18.7S119.6,45.3,109.3,45.3L109.3,45.3z"
            />
            <path
              d="M109.3,100.1c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3s-9.3-4.2-9.3-9.3
                C100.1,104.2,104.2,100.1,109.3,100.1 M109.3,90.7c-10.3,0-18.7,8.4-18.7,18.7S99,128,109.3,128c10.3,0,18.7-8.4,18.7-18.7
                S119.6,90.7,109.3,90.7L109.3,90.7z"
            />
            <rect x="104.6" y="30.7" width="9.4" height="21.3" />
            <rect x="104.6" y="75.8" width="9.4" height="21.3" />
          </g>
          <g>
            <path
              d="M18.7,9.4c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3C9.4,13.6,13.6,9.4,18.7,9.4
                M18.7,0C8.4,0,0,8.4,0,18.7s8.4,18.7,18.7,18.7S37.3,29,37.3,18.7S29,0,18.7,0L18.7,0z"
            />
            <path
              d="M18.7,54.7c5.1,0,9.3,4.2,9.3,9.3s-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3S13.6,54.7,18.7,54.7 M18.7,45.3
                C8.4,45.3,0,53.7,0,64s8.4,18.7,18.7,18.7S37.3,74.3,37.3,64S29,45.3,18.7,45.3L18.7,45.3z"
            />
            <path
              d="M18.7,100.1c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3
                C9.4,104.2,13.6,100.1,18.7,100.1 M18.7,90.7C8.4,90.7,0,99,0,109.3S8.4,128,18.7,128s18.7-8.4,18.7-18.7S29,90.7,18.7,90.7
                L18.7,90.7z"
            />
            <path
              d="M64,9.4c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3C54.7,13.6,58.9,9.4,64,9.4 M64,0
                C53.7,0,45.3,8.4,45.3,18.7S53.7,37.3,64,37.3c10.3,0,18.7-8.4,18.7-18.7S74.3,0,64,0L64,0z"
            />
            <path
              d="M64,54.7c5.1,0,9.3,4.2,9.3,9.3s-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3S58.9,54.7,64,54.7 M64,45.3
                c-10.3,0-18.7,8.4-18.7,18.7S53.7,82.7,64,82.7c10.3,0,18.7-8.4,18.7-18.7S74.3,45.3,64,45.3L64,45.3z"
            />
            <path
              d="M64,100.1c5.1,0,9.3,4.2,9.3,9.3c0,5.1-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3
                C54.7,104.2,58.9,100.1,64,100.1 M64,90.7c-10.3,0-18.7,8.4-18.7,18.7S53.7,128,64,128c10.3,0,18.7-8.4,18.7-18.7
                S74.3,90.7,64,90.7L64,90.7z"
            />
            <rect x="14" y="30.7" width="9.4" height="21.3" />
            <rect x="14" y="77.3" width="9.4" height="21.3" />
            <rect x="59.3" y="30.7" width="9.4" height="21.3" />
            <rect
              x="22.5"
              y="82"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -49.1764 54.6113)"
              width="37.7"
              height="9.4"
            />
          </g>
        </svg>
      </footer>
    </>
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
