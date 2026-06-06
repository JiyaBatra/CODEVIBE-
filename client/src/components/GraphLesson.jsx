import React from 'react';
import CourseModuleOverview from './CourseModuleOverview';
import { getModuleByKey } from '../config/dsaModuleData';

const GraphLesson = () => {
  const moduleData = getModuleByKey('graph');
  return <CourseModuleOverview moduleData={moduleData} />;
};

export default GraphLesson;
