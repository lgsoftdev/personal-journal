import { Coordinate, TelAddsItem } from '../../types';
import { Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import styles from './styles.module.css';

interface ItemDetailsProps {
  itemDetails: TelAddsItem;
  onAddressClick: (latLng: Coordinate, name: string) => void;
}

const TelAddsDetails = ({ itemDetails, onAddressClick }: ItemDetailsProps) => {
  const { name, address, lat, lng, phone, mobile, email, website } =
    itemDetails;
  const handleAddressClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (lat && lng) {
        onAddressClick({ lat, lng }, name);
      }
    },
    [name, lat, lng, onAddressClick]
  );
  const getLabelValue = useCallback(
    (label: string, value?: string, lat?: number, lng?: number) => (
      <Stack direction="row" spacing={2}>
        <Typography>{label}:</Typography>
        {lat && lng ? (
          <a href="" className={styles.linkStyle} onClick={handleAddressClick}>
            <Typography>{value}</Typography>
          </a>
        ) : (
          <Typography>{value}</Typography>
        )}
      </Stack>
    ),
    [handleAddressClick]
  );

  const primaryText = useMemo(
    () => <Typography fontWeight={600}>{name}</Typography>,
    [name]
  );

  const secondaryText = useMemo(() => {
    const addressHtml = getLabelValue('Address', address, lat, lng);
    const latHtml = getLabelValue('Lat', lat?.toString());
    const lngHtml = getLabelValue('Lng', lng?.toString());
    const phoneHtml = getLabelValue('Phone', phone);
    const mobileHtml = getLabelValue('Mobile', mobile);
    const emailHtml = getLabelValue('Email', email);
    const websiteHtml = getLabelValue('Website', website);

    return (
      <Stack>
        {addressHtml}
        <Stack direction="row" spacing={2}>
          {latHtml}
          {lngHtml}
        </Stack>
        <Stack direction="row" spacing={2}>
          {phoneHtml}
          {mobileHtml}
        </Stack>

        {emailHtml}
        {websiteHtml}
      </Stack>
    );
  }, [address, email, getLabelValue, lat, lng, mobile, phone, website]);

  return (
    <Stack>
      {primaryText}
      {secondaryText}
    </Stack>
  );
};

export default TelAddsDetails;
