import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("/image/:md5/:name", "./routes/image.tsx"),
] satisfies RouteConfig;
