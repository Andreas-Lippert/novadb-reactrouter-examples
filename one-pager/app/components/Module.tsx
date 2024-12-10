import React from "react";
import { isImage } from "~/api/image";
import { PageReferences } from "~/api/page";
import { isWebText } from "~/api/webText";
import { Image } from "~/components/Image";
import { Content } from "./Content";
import { isTeaser } from "~/api/webTeaser";
import { Teaser } from "./Teaser";
import { isWebChart } from "~/api/webChart";
import { Charts } from "./Charts";

export const Modules = (pageReferences: PageReferences) => {
  if (pageReferences === undefined) {
    return <div>This page does not contain any modules</div>;
  }

  return (
    <main className="max-w-screen-xl m-auto pl-5 pr-5">
      {pageReferences.modules.map((module) => {
        return (
          <React.Fragment key={module.meta.id}>
            {isWebText(module) && <Content {...module.props} />}
            {isImage(module) && <Image {...module.props} />}
            {isTeaser(module) && <Teaser {...module.props} />}
            {isWebChart(module) && <Charts {...module} />}
          </React.Fragment>
        );
      })}
    </main>
  );
};
