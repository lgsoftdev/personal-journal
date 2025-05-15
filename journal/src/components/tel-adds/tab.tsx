import { Button, Divider, Stack } from '@mui/material';
import { useMemo } from 'react';

interface TabProps {
  labelValue: string;
  selectedValue: string;
}

const Tab = ({ labelValue, selectedValue }: TabProps) => {
  const colorStyle = useMemo(
    () => (labelValue === selectedValue ? 'blue' : 'lightgrey'),
    [labelValue, selectedValue]
  );

  return (
    <Stack>
      <Button>{labelValue}</Button>
      <Divider sx={{ color: `${colorStyle}` }} />
    </Stack>
  );
};

export default Tab;
