import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ListCountDowns = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${process.env.API_URL}/list`);
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
          <li key={item.id}>item</li>
        ))}
      </ul>
    </div>
  );
};
