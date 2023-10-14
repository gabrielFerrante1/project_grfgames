import MainLayout from '@/components/Layouts/Main'
import { store } from '@/redux/store';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-dark-teal/theme.css";
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <MainLayout >
          <Component {...pageProps} />
        </MainLayout>
      </PrimeReactProvider>
    </Provider>
  )
}
