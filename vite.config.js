import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //Change starts here /
 server:
  {watch:
    {usePolling:
      true}
    }, //Change ends here//
  plugins: [react()],
})