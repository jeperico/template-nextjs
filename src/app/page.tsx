'use client';

import { get } from '@/providers/api';
import React from 'react';

const Home = () => {
  return (
    <button
      onClick={async () => {
        try {
          const response = await get('profiles/user');
          console.log(response);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }}
      className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      Get User
    </button>
  );
};

export default Home;
