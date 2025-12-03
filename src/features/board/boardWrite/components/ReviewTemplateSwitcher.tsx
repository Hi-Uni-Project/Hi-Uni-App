import React from 'react';

import useReviewTemplate from '../hooks/useReviewTemplate';

import ExperienceTemplate from './form/ExperienceTemplate';
import InternshipTemplate from './form/InternshipTemplate';
import InterviewTemplate from './form/InterviewTemplate';
import JobTemplate from './form/JobTemplate';
import LicenseTemplate from './form/LicenseTemplate';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

interface Props {
  postType: PostType | null;
  reviewForm: ReturnType<typeof useReviewTemplate>;
}

const ReviewTemplateSwitcher = ({ postType, reviewForm }: Props) => {
  switch (postType) {
    case 'INTERNSHIP':
      return <InternshipTemplate reviewForm={reviewForm} />;

    case 'JOB':
      return <JobTemplate reviewForm={reviewForm} />;

    case 'INTERVIEW':
      return <InterviewTemplate reviewForm={reviewForm} />;

    case 'EXPERIENCE':
      return <ExperienceTemplate reviewForm={reviewForm} />;

    case 'LICENSE':
      return <LicenseTemplate reviewForm={reviewForm} />;
  }
};

export default ReviewTemplateSwitcher;
