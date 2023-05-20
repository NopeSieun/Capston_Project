import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import Header from "./Header";

const Check = () => {
  const [searchParams] = useSearchParams();

  const days = searchParams.get('days');
  const gender = searchParams.get('gender');
  const height = searchParams.get('height');
  const weight = searchParams.get('weight');

  const [result, setResult] = useState(null);

  useEffect(() => {
    // Make an HTTP POST request to the Django URL with the form data
    axios
      .post('http://127.0.0.1:8000/sndpage/api/calculate/', {
        days,
        gender,
        height,
        weight
      })
      .then((response) => {
        // Handle the response data
        setResult(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, [days, gender, height, weight]);

  return (
    <div>
      <Header></Header>
      <h1>Check</h1>
      
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>

      {/* Display the result */}
      {result && (
        <div>
          <p>Result:</p>
          <p>Height Percent: {result.height_percent}</p>
          <p>Weight Percent: {result.weight_percent}</p>
        </div>
      )}
    </div>
  );
};

export default Check;