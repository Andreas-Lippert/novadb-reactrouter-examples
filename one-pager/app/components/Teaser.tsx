import { TeaserProps } from "~/api/webTeaser";
import { Image } from "~/components/Image";
import { Content } from "./Content";

export const Teaser = (teaser: TeaserProps) => {
  const classNames = `relative rounded-lg my-12 bg-slate-50 border border-gray dark:border-none dark:bg-slate-900 overflow-hidden shadow-md dark:shadow-none ${
    teaser.teaserAlignment === "Text|Image" ? "lg:flex-row-reverse" : "lg:flex-row "
  } ${
    teaser.teaserAlignment === "Stacked" ? "flex-none" : "lg:flex lg:gap-1 flex-none"
  }
  `;
  return (
    <div className="relative">
      <div className="absolute -inset-0 dark:bg-gradient-to-r dark:from-blue-600 dark:to-red-700 rounded-lg dark:blur-sm dark:opacity-100"></div>
      <div className={classNames}>
        <div>
          <Image
            externalBinaryMD5={teaser.externalBinaryMD5}
            externalBinaryFileName={teaser.externalBinaryFileName}
          />
        </div>
        <div>
          <Content webContent={teaser.webContent} />
        </div>
      </div>
    </div>
  );
};
