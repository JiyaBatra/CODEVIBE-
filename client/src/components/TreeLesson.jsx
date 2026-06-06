import React from 'react';
import CourseModuleOverview from './CourseModuleOverview';
import { getModuleByKey } from '../config/dsaModuleData';

const TreeLesson = () => {
  const moduleData = getModuleByKey('tree');
  return <CourseModuleOverview moduleData={moduleData} />;
};

export default TreeLesson;
