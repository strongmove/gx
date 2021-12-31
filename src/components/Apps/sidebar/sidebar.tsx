import React from 'react';
import { styled } from '@mui/material/styles';
import { AutoSubMenu } from '@strongmove/react-pro-sidebar-extras';
// } from '../src/components/react-pro-sidebar-extras/src/components/AutoSubMenu/AutoSubMenu';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import LessonData from './guitarx-lesson-data';
import SignInButton from '../login/login-button/sign-in-button';
import { useLogin } from '../login/login';

const Sidebar: React.FC = (props) => {
  const loginData = useLogin();
  return (
    <Grid container sx={{ height: '100vh' }} direction="column">
      <Grid item sx={{ height: '100%' }}>
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>
              <SignInButton data={loginData} />
            </MenuItem>
            <AutoSubMenu
              data={LessonData}
              title="Components"
              icon={<FaHeart />}
            />
          </Menu>
        </ProSidebar>
      </Grid>
      <Grid item>{props.children}</Grid>
    </Grid>
  );
};

const StyledSidebar = styled(Sidebar)(({ theme }) => ({}));

export default React.memo(StyledSidebar);
