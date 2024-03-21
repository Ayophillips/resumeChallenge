import React, { useState, useEffect } from 'react';

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
    const birthTime = new Date('1990-02-05T09:24:00');
    setAge(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{age}</>;
};

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:8010/proxy/visitorcount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'zY5rXmdOEA2QGw6kJQlF44lNYgMcP9OJ9UKUeP4W',
        },
      });
      const data = await response.json();
      setVisitorCount(data.visitor_count);
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
    }
  }, []);

  return <>{visitorCount}</>;
};

const data = [
  {
    key: 'visitors',
    label: 'Resume visits',
    value: <VisitorCounter />,
  },
  {
    key: 'age',
    label: 'Current age',
    value: <Age />,
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: 53,
    link:
      'https://www.google.com/maps/d/embed?mid=1iBBTscqateQ93pWFVfHCUZXoDu8&z=2',
  },
  {
    key: 'location',
    label: 'Current city',
    value: 'New York, NY',
  },
];

export default data;
