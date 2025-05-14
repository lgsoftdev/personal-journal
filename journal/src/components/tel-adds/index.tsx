import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import TelAddsForm from './tel-adds-form';
import TelAddsList from './tel-adds-list';

const TelAdds = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm]);

  return (
    <Box sx={{ margin: '20px' }}>
      {showForm ? (
        <TelAddsForm />
      ) : (
        <Stack>
          <Stack direction="row" className={styles.contentSpaceBetween}>
            <Typography variant="h6" color="inherit" component="div">
              Telephone and Address List
            </Typography>
            <Tooltip title="Add" placement="top">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <TelAddsList />
        </Stack>
      )}
    </Box>
  );
};

export default TelAdds;
