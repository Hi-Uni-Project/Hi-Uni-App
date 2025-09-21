import React, { useEffect } from 'react';

import { View } from 'react-native';

import { axiosInstance } from '@/shared/api/axiosInstance';

const Test = () => {
  const fetchUniversities = async () => {
    try {
      const response = (await axiosInstance.get('/univs')).data;

      console.log('응답: ', response);
    } catch (err: any) {
      console;
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  return <View />;
};

export default Test;
