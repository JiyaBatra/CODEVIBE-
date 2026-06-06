import React from 'react';
import CourseModuleOverview from './CourseModuleOverview';
import { getModuleByKey } from '../config/dsaModuleData';

const DPLesson = () => {
  const moduleData = getModuleByKey('dp');
  return <CourseModuleOverview moduleData={moduleData} />;
};

export default DPLesson;
