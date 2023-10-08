import { useCallback, useContext, useState } from 'react';
import { IonButton, IonLoading } from '@ionic/react';
import { BarcodeContext, BarcodeContextType } from '../../provider/BarcodeProvider';

export const ScanPreview = (prop: ScanPreviewProps) => {
  const [videoElement, setVideoElement] = useState<HTMLDivElement | null>(null);

  const { scan } = useContext(BarcodeContext) as BarcodeContextType;

  const handleCodeScanned = (data: string): void => {
    console.info(data);
  };

  const setElement = useCallback((videoElement: HTMLDivElement) => {
    setVideoElement(videoElement);
  }, []);

  const handleEnablePreview = useCallback(() => {
    if (videoElement) {
      scan(handleCodeScanned, videoElement);
    }
  }, [videoElement]);

  return (
    <>
      <div>
        <div id={'qr-code-scanner'}
             ref={setElement}
        />
      </div>
      <IonButton onClick={handleEnablePreview}>Open Preview</IonButton>
    </>
  );
};

export interface ScanPreviewProps {
  width?: number | string;
  height?: number | string;
  onScanned?: (data: string) => void;
}
