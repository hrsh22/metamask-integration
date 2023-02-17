import "@/styles/globals.css";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { mainnet } from "wagmi/chains";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  );
}
