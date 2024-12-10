import { WebTextProps } from "~/api/webText";

export const Content = (content: WebTextProps) => {
  const innerHtml = content.webContent.XML.replace(
    /^<div[^>]*>(.*)<\/div>$/,
    "$1"
  );
  return <div className="max-w-full p-5 text-lg leading-7 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: innerHtml }} />;
};
