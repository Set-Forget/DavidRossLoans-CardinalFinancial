import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     define: {
//       'process.env': env,
//     },
//     plugins: [react()],
//     base: "/DavidRossLoans-CardinalFinancial/"
//   }
// })

export default defineConfig({
  plugins: [react()],
  base: "/DavidRossLoans-CardinalFinancial/",
  server: {
    host: '0.0.0.0',
  },
})
