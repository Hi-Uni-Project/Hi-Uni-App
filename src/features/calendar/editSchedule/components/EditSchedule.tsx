import React, { useEffect } from 'react';

import useCalendarScheduleStore from '../stores/useCalendarScheduleStore';

import ScheduleDurationPicker from './ScheduleDurationPicker';
import ScheduleHeaderInput from './ScheduleHeaderInput';
import ScheduleMemoInput from './ScheduleMemoInput';

const EditSchedule = () => {
  const storeInitialData = useCalendarScheduleStore(state => state.initialData);
  const storeScheduleData = useCalendarScheduleStore(
    state => state.scheduleData,
  );

  const storeIsValid = useCalendarScheduleStore(state => state.isValid);
  const storeHasDataChanges = useCalendarScheduleStore(
    state => state.hasDataChanges,
  );

  // TODO: 삭제해라
  useEffect(() => {
    console.log(storeInitialData);
    console.log(storeScheduleData);
    console.log('유효성', storeIsValid(), '변경여부', storeHasDataChanges());
  }, [storeInitialData, storeScheduleData]);

  return (
    <>
      <ScheduleHeaderInput />
      <ScheduleDurationPicker />
      <ScheduleMemoInput />
    </>
  );
};

export default EditSchedule;
