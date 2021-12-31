import { useRouter } from 'next/router';
import React from 'react';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (to) {
      console.log('redirecting');
      router.push(to);
    }
  }, [router, to]);
  return null;
};
export default Redirect;
