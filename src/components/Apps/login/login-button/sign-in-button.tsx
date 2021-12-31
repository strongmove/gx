import React from 'react';
import IconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';
import { BsPersonFill } from 'react-icons/bs';
import { styled } from '@mui/material/styles';

import { LoginData, ANONYMOUS } from '@/components/Apps/login/login-store';
import { Avatar } from '@mui/material';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

interface LoginDataProps {
  data: LoginData;
}

const SignInButton: React.FC<LoginDataProps> = observer(({ data }) => {
  const { username, token } = data;
  // console.log(token.localUser);
  if (username == ANONYMOUS) {
    const handleLogin = () => {
      data.login({ username: 'David', password: 'asdf' });
    };
    return (
      <MuiButton onClick={handleLogin} variant="contained" color="primary">
        Sign in
      </MuiButton>
    );
  }
  const avatarName = username[0].toUpperCase();
  return (
    <Button>
      <Avatar color="primary">{avatarName}</Avatar>
    </Button>
  );
});

const Button = styled(IconButton)(({ theme }) => ({
  borderRadius: '2px',
  padding: 0,
  '.button-icon': {
    fontSize: '34px',
  },
}));

const AnonymousIcon = styled(BsPersonFill)(({ theme }) => ({
  fontSize: '20px',
}));

export default SignInButton;
