'use server';

import { apiUrls } from './apiUrls';

export const fetchFundData = async (fund: string) => {
  if (!apiUrls[fund]) {
    throw new Error('Fund not found in apiUrls');
  }

  const response = await fetch(apiUrls[fund], {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to parse response as JSON');
  }
};
