import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePresenter from './HomePresenter';

type movie = {
  id: number;
  title: string;
  genres: string;
  overview: string;
  rates: number;
};

export default () => {
  const [recent, setRecent] = useState<Array<object>>([{}]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRecent = async () => {
    const { data } = await axios.get('/post/');
    setRecent(data);
    setLoading(false);
  };

  useEffect(() => {
    getRecent();
  }, []);

  return <HomePresenter recent={recent as any} loading={loading} />;
};
