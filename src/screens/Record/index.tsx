import React from 'react';

import CoverLetterSection from './CoverLetterView';
import ResumeSection from './ResumeView';

import useRecordQueries from '@/features/record/recordMain/hooks/useRecordQueries';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const RecordScreen = () => {
  const { data: records } = useRecordQueries();

  if (!records) {
    return null;
  }

  const isResumeExist = (records?.data.title?.length ?? 0) > 0;
  const isCoverLetterExist = (records?.data.coverLetters?.length ?? 0) > 0;

  return (
    <ScreenLayout className="items-start">
      <ResumeSection
        title={records.data.title}
        imageUrl={records.data.imageUrl}
        isExist={isResumeExist}
      />

      <CoverLetterSection
        coverLetters={records.data.coverLetters}
        isExist={isCoverLetterExist}
      />
    </ScreenLayout>
  );
};

export default RecordScreen;
