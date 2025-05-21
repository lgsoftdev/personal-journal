import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import styles from './styles.module.css';
import { useCallback, useState, type FormEvent } from 'react';
import axios from 'axios';

interface TelAddsFormProps {
  onListClick: () => void;
}

const TelAddsForm = ({ onListClick }: TelAddsFormProps) => {
  const [info, setInfo] = useState('');
  const insertNewRecord = useCallback(
    async (
      name: string,
      address?: string,
      lat?: number,
      lng?: number,
      phone?: string,
      mobile?: string,
      email?: string,
      website?: string
    ) => {
      await axios
        .post(`http://localhost:4000/teladds`, {
          name,
          address,
          lat,
          lng,
          phone,
          mobile,
          email,
          website,
        })
        .then((data) => setInfo(data.statusText))
        .catch((err) => console.log(err.message));
    },
    []
  );

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputElements = formElement.getElementsByTagName('input');
    const elementsArray = Array.from(inputElements);
    const name =
      elementsArray.find((element) => element.getAttribute('id') === 'name')
        ?.value || '';
    const address =
      elementsArray.find((element) => element.getAttribute('id') === 'address')
        ?.value || undefined;
    const lat =
      elementsArray.find((element) => element.getAttribute('id') === 'lat')
        ?.value || undefined;
    const lng =
      elementsArray.find((element) => element.getAttribute('id') === 'lng')
        ?.value || undefined;
    const phone =
      elementsArray.find((element) => element.getAttribute('id') === 'phone')
        ?.value || undefined;
    const mobile =
      elementsArray.find((element) => element.getAttribute('id') === 'mobile')
        ?.value || undefined;
    const email =
      elementsArray.find((element) => element.getAttribute('id') === 'email')
        ?.value || undefined;
    const website =
      elementsArray.find((element) => element.getAttribute('id') === 'website')
        ?.value || undefined;

    insertNewRecord(
      name,
      address,
      Number(lat),
      Number(lng),
      phone,
      mobile,
      email,
      website
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        className={styles.contentSpaceBetween}
        sx={{ marginBottom: '20px' }}
      >
        <Typography variant="h6" color="inherit" component="div">
          Add New Telephone and Address
        </Typography>
        <Tooltip title="List" placement="top">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onListClick}
          >
            <ListIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <form onSubmit={handleSave} className={styles.telAddsForm}>
        <TextField required id="name" label="Name" />
        <TextField id="address" label="Address" />
        <Box className={styles.textFieldRowStack}>
          <TextField
            id="lat"
            label="Latitude"
            type="number"
            sx={{ width: '100%' }}
            slotProps={{ htmlInput: { step: 0.00000000000001 } }}
          />
          <TextField
            id="lng"
            label="Longitude"
            type="number"
            sx={{ width: '100%' }}
            slotProps={{ htmlInput: { step: 0.00000000000001 } }}
          />
        </Box>
        <Box className={styles.textFieldRowStack}>
          <TextField id="phone" label="Phone" sx={{ width: '100%' }} />
          <TextField id="mobile" label="Mobile" sx={{ width: '100%' }} />
        </Box>
        <TextField id="email" label="Email" />
        <TextField id="website" label="Website" />
        <Stack direction="row">
          <Button type="submit" variant="contained" sx={{ width: 80 }}>
            Save
          </Button>
          <FormLabel sx={{ marginLeft: '20px' }}>{info}</FormLabel>
        </Stack>
      </form>
    </Box>
  );
};

export default TelAddsForm;
