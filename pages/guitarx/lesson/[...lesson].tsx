import React, { Suspense, lazy } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import SideNav from '@/components/Apps/sidebar/sidebar';
// import { Lessons } from '@/components/learn-guitar-position/lesson-list';
import Redirect from '@/components/Apps/route/redirect';

const Lesson: React.FC = (props) => {
  const router = useRouter();
  const specs = router.query.lesson || [];
  if (specs.length !== 2) {
    return <Redirect to="/guitarx" />;
  }
  const [major, minor] = specs.map((v) => parseInt(v));
  // try {
  //   Lessonx = lazy(
  //     () => import(`@/gx/components/Lesson${major}/SubLesson${minor}/App.js`)
  //   );
  // } catch (e) {
  //   return null;
  // }
  // console.log(Lessonx);
  let Content = <Redirect to="/guitarx" />;
  // const Lessonx = Lessons[major][minor] || null;
  // if (Lessonx) {
  //   Content = <Lessonx />;
  // }
  return <SideNav>{Content}</SideNav>;
};

export default Lesson;
