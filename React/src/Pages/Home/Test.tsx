import React, { useEffect } from 'react';

export function Test() {
  useEffect(() => {
    const fetchData = () => {
      const parameterValue = 'databases';
      fetch(`http://localhost:5000/api/${parameterValue}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);

  return <div>Test Component</div>;
}

export default Test;