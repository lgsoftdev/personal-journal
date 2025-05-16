import {
  Box,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import styles from './styles.module.css';
import { useCallback, useState, type FormEvent } from 'react';
import axios from 'axios';

const TelAddsForm = () => {
  const [info, setInfo] = useState('');
  const insertNewRecord = useCallback(
    async (
      name: string,
      address?: string,
      phone?: string,
      mobile?: string,
      email?: string,
      website?: string
    ) => {
      await axios
        .post(`http://localhost:4000/teladds`, {
          name,
          address,
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
    const address = elementsArray.find(
      (element) => element.getAttribute('id') === 'address'
    )?.value;
    const phone = elementsArray.find(
      (element) => element.getAttribute('id') === 'phone'
    )?.value;
    const mobile = elementsArray.find(
      (element) => element.getAttribute('id') === 'mobile'
    )?.value;
    const email = elementsArray.find(
      (element) => element.getAttribute('id') === 'email'
    )?.value;
    const website = elementsArray.find(
      (element) => element.getAttribute('id') === 'website'
    )?.value;

    insertNewRecord(name, address, phone, mobile, email, website);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        sx={{ marginBottom: '20px' }}
      >
        Add New Telephone and Address
      </Typography>
      <form onSubmit={handleSave} className={styles.telAddsForm}>
        <TextField required id="name" label="Name" />
        <TextField id="address" label="Address" />
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
          <FormLabel>{info}</FormLabel>
        </Stack>
      </form>
    </Box>
  );
};

export default TelAddsForm;
