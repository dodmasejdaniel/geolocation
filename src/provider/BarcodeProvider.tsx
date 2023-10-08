import { createContext, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from 'html5-qrcode';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { isWeb } from '../utils/device';

export const BarcodeContext = createContext<BarcodeContextType | null>(null);

export type BarcodeProviderProps = {
  children: JSX.Element;
}

const BarcodeProvider = (props: BarcodeProviderProps) => {
  const { children } = props;
  const scannerConfig: Html5QrcodeCameraScanConfig = { fps: 20, qrbox: 250, disableFlip: false };
  const scan = useCallback(async (codeScanned: (data: string) => void, scanElement?: HTMLDivElement) => {
    try {
      if (await isWeb()) {
        if (scanElement) {
          const html5QrCodeScanner = new Html5Qrcode(scanElement.id);
          html5QrCodeScanner.start({ facingMode: 'environment' }, scannerConfig, codeScanned, () => {
            //
          });
        }
      } else {
        document.querySelector('body')?.classList.add('barcode-scanner-active');
        const listener = await BarcodeScanner.addListener(
          'barcodeScanned',
          async result => {
            console.log(result.barcode);
          },
        );

        // Start the barcode scanner
        await BarcodeScanner.startScan();
      }
    } catch (error) {
      console.error(error);
    }
  }, [scannerConfig]);

  return (
    <BarcodeContext.Provider value={{ scan }}>
      {children}
    </BarcodeContext.Provider>);
};

export default BarcodeProvider;

export type BarcodeContextType = {
  scan: (codeScanned: (data: string) => void, scanElement?: HTMLDivElement) => void;
}
