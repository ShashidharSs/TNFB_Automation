import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    // host: "release.com",
    // host: true, // Remove or replace with a valid hostname or IP address
    hmr: {
      overlay: false
    }
  },
});

// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     port: 3001,
// //     host: true,
// //   },
// // });
// vite.config.js
// import { defineConfig } from "vite";

// export default defineConfig({
//   server: {
//     port: 3000,
//     // host: "192.168.31.117",
//   },
// });
