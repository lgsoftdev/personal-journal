import axios from 'axios';
import { useEffect, useState } from 'react';

const TelAddsList = () => {
  const [telAdds, setTelAdds] = useState([]);

  const fetchTelAdds = async () => {
    const paramChar = 's';
    const res = await axios
      .get(`http://localhost:4000/teladds/${paramChar}`)
      .catch((err) => console.log(err.message));
    const telAddsData = res && res.data ? res.data : [];
    setTelAdds(telAddsData);
  };

  useEffect(() => {
    fetchTelAdds();
  }, []);

  return null;
};

export default TelAddsList;
