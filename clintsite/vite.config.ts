// import path from "path"
// import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
    
//   },
//   server: {
//     historyApiFallback: true, // fallback all routes to index.html
//   },
// })


import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    // 🔑 React Router এর জন্য SPA fallback
    fs: {
      allow: ["."],
    },
  },
  appType: "spa", // 👈 এটা যোগ করুন
})
