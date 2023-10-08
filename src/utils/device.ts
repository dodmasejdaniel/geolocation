import { Device } from '@capacitor/device';

export const isWeb = async () => (await Device.getInfo()).platform === 'web';
