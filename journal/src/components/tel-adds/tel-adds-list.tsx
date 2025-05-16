import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { Box, Tabs, Tab } from '@mui/material';
import { alphabet } from '../../utils';

const TelAddsList = () => {
  const [value, setValue] = useState(0);
  const [telAdds, setTelAdds] = useState([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    fetchTelAdds(alphabet[newValue]);
  };

  const fetchTelAdds = useCallback(async (char: string) => {
    const res = await axios
      .get(`http://localhost:4000/teladds/${char}`)
      .catch((err) => console.log(err.message));
    const telAddsData = res && res.data ? res.data : [];
    setTelAdds(telAddsData);
  }, []);

  useEffect(() => {
    fetchTelAdds(alphabet[value]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTelAdds]);

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 590, md: 776, lg: 1000, xl: 1200, xxl: 1400 },
        typography: 'body1',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="alphabet tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {alphabet.map((e, i) => (
          <Tab key={`${e}${i}`} label={e} value={i} />
        ))}
      </Tabs>
      <p>
        List all names in the tel/add list that start with letter{' '}
        {alphabet[value]}. {telAdds.length} record(s) found.
      </p>
    </Box>
  );
};

export default TelAddsList;
