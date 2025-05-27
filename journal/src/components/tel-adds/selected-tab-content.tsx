import { Stack, Typography } from '@mui/material';
import MapView from '../map-view';
import styles from './styles.module.css';
import { Coordinate, TelAddsItem } from '../../types';
import TelAddsDetails from './tel-adds-details';
import { useCallback, useState } from 'react';

interface ItemsListProps {
  telAddsItems: TelAddsItem[];
}

const SelectedTabContent = ({ telAddsItems }: ItemsListProps) => {
  const [selectedCoordinate, setSelectedCoordinate] = useState<
    Coordinate | undefined
  >(undefined);
  const [selectedName, setSelectedName] = useState<string | undefined>(
    undefined
  );
  const handleAddressClick = useCallback((latLng: Coordinate, name: string) => {
    setSelectedCoordinate({ ...latLng });
    setSelectedName(name);
  }, []);
  return (
    <Stack className={styles.contentSpaceBetween} direction="row" spacing={2}>
      {telAddsItems.length > 0 ? (
        <Stack spacing={2}>
          {telAddsItems.map((item, i) => (
            <TelAddsDetails
              key={i}
              itemDetails={item}
              onAddressClick={handleAddressClick}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body1" color="warning">
          No records found.
        </Typography>
      )}

      <MapView
        lat={selectedCoordinate?.lat}
        lng={selectedCoordinate?.lng}
        tooltipText={selectedName}
      />
    </Stack>
  );
};

export default SelectedTabContent;
