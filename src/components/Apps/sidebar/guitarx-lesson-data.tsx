import Link from 'next/link';
import { FaGem, FaHeart, FaHandshake } from 'react-icons/fa';
import { AutoSubMenuData } from '@strongmove/react-pro-sidebar-extras';

const data: AutoSubMenuData = {
  title: 'foo',
  icon: <FaHandshake />,
  children: [
    {
      title: 'Lesson 1',
      children: [
        {
          title: 'Lesson 1-1',
          linkComponent: <Link href="/guitarx/lesson/1/1">Lesson 1-1</Link>,
        },
        {
          title: 'Lesson 1-2',
          linkComponent: <Link href="/guitarx/lesson/1/2">Lesson 1-2</Link>,
        },
        {
          title: 'Lesson 1-3',
          linkComponent: <Link href="/guitarx/lesson/1/3">Lesson 1-3</Link>,
        },
        {
          title: 'Lesson 1-4',
          linkComponent: <Link href="/guitarx/lesson/1/4">Lesson 1-4</Link>,
        },
        {
          title: 'Lesson 1-5',
          linkComponent: <Link href="/guitarx/lesson/1/5">Lesson 1-5</Link>,
        },
        {
          title: 'Lesson 1-6',
          linkComponent: <Link href="/guitarx/lesson/1/6">Lesson 1-6</Link>,
        },
      ],
    },
    {
      title: 'Lesson 2',
      children: [
        {
          title: 'Lesson 2-1',
          linkComponent: <Link href="/guitarx/lesson/2/1">Lesson 2-1</Link>,
        },
        {
          title: 'Lesson 2-2',
          linkComponent: <Link href="/guitarx/lesson/2/2">Lesson 2-2</Link>,
        },
        {
          title: 'Lesson 2-3',
          linkComponent: <Link href="/guitarx/lesson/2/3">Lesson 2-3</Link>,
        },
        {
          title: 'Lesson 2-4',
          linkComponent: <Link href="/guitarx/lesson/2/4">Lesson 2-4</Link>,
        },
      ],
    },
  ],
};

export default data;
