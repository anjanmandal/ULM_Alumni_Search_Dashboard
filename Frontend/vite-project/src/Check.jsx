import { useEffect, useState } from 'react';
import axios from 'axios';

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const { data } = await axios.get('/api/alumni'); // No need for localhost:5000 due to proxy setup
        setAlumni(data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div>
      {alumni.map((alum, index) => (
        <div key={index}>
          <h3>{alum.name}</h3>
          <p>{alum.occupation}</p>
        </div>
      ))}
    </div>
  );
};

export default AlumniList;
