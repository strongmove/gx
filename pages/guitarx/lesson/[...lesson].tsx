import React, { Suspense, lazy } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import SideNav from '@/components/Apps/sidebar/sidebar';
import { Lessons } from '@/components/learn-guitar-position/lesson-list';
console.log(Lessons);

const Lesson: React.FC = (props) => {
  const router = useRouter();
  const specs = router.query.lesson || [];
  const [major, minor] = specs.map((v) => parseInt(v));
  // try {
  //   Lessonx = lazy(
  //     () => import(`@/gx/components/Lesson${major}/SubLesson${minor}/App.js`)
  //   );
  // } catch (e) {
  //   return null;
  // }
  // console.log(Lessonx);
  const Lessonx = Lessons[major][minor] || <React.Fragment />;
  return (
    <SideNav>
      <Lessonx />
    </SideNav>
  );
};

export default Lesson;
