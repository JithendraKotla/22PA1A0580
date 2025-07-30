import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      include: ["**/*.js", "**/*.jsx"],
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "automatic",
            },
          ],
        ],
      },
    }),
  ],
  esbuild: {
    jsx: "automatic", // Enable JSX transform
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
});
