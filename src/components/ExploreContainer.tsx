import './ExploreContainer.css';
import { GeoLocation } from '../features/geoLocation/GeoLocation';
import { ScanPreview } from './barcode/ScanPreview';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">
      <GeoLocation/>
      <ScanPreview/>
    </div>
  );
};

export default ExploreContainer;
