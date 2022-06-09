import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
// const localEnabled: boolean =
//   (process.env.USE_MOCK as unknown as boolean) || false;
// const prodEnabled: boolean =
//   (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  base:"/TrelloLike/"
});
