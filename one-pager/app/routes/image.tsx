import { createReadableStreamFromReadable } from "@react-router/node";
import { getFileStream } from "~/api/novaDb.server";
import { Route } from "./+types/image";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const stream = getFileStream(params.name, params.md5);
  return new Response(createReadableStreamFromReadable(stream));
};
