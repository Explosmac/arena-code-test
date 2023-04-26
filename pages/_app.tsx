import { CssBaseline } from "@mui/material"
import type { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default App
