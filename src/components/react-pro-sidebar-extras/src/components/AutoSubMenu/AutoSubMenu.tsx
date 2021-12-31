import React from 'react';
import { SubMenu, SubMenuProps, MenuItem } from 'react-pro-sidebar';

export interface AutoSubMenuData {
  title: string;
  link?: string;
  linkComponent?: React.ReactNode;
  icon?: React.ReactNode;
  children?: AutoSubMenuData[];
}

export interface Props extends SubMenuProps {
  data?: AutoSubMenuData;
}

export const AutoSubMenu: React.FC<Props> = ({ data, ...props }) => {
  if (data) {
    if (data?.children) {
      return (
        <SubMenu title={data.title} icon={data?.icon}>
          {data.children.map(function (child, index) {
            return <AutoSubMenu key={index} data={child} />;
          })}
        </SubMenu>
      );
    }
  }
  if (data?.linkComponent) {
    return <MenuItem>{data.linkComponent}</MenuItem>;
  }
  if (data?.link) {
    return (
      <MenuItem icon={data?.icon}>
        <a href={data.link}>{data?.title}</a>
      </MenuItem>
    );
  }
  return <MenuItem>{data?.title}</MenuItem>;
};
