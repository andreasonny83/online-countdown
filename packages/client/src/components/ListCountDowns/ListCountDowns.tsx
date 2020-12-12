import { useState, useEffect } from 'react';
import axios from 'axios';

export const ListCountDowns = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${process.env.REACT_APP_API_URL}/list`);
        if (result && result.data) {
          setItems(result.data);
        }
      } catch (err) {
        console.warn('error');

        setItems([]);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="ListCountDowns">
        <div>Loading...</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="ListCountDowns">
        <div>Nothing here yet</div>
      </div>
    );
  }

  return (
    <div className="ListCountDowns">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>
              {item.day}/{item.month}/{item.year}
            </p>
            <p>
              {item.hour}:{item.min}:{item.sec}
            </p>
            <p>{item.locale}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
