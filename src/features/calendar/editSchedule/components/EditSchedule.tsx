import React from 'react';

import ScheduleDurationPicker from './ScheduleDurationPicker';
import ScheduleHeaderInput from './ScheduleHeaderInput';
import ScheduleMemoInput from './ScheduleMemoInput';

const EditSchedule = () => {
  return (
    <>
      <ScheduleHeaderInput />
      <ScheduleDurationPicker />
      <ScheduleMemoInput />
    </>
  );
};

export default EditSchedule;
