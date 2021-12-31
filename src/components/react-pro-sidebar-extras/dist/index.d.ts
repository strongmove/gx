import React from 'react';
import { SubMenuProps } from 'react-pro-sidebar';

interface AutoSubMenuData {
    title: string;
    link?: string;
    linkComponent?: React.ReactNode;
    icon?: React.ReactNode;
    children?: AutoSubMenuData[];
}
interface Props extends SubMenuProps {
    data?: AutoSubMenuData;
}
declare const AutoSubMenu: React.FC<Props>;

export { AutoSubMenu, AutoSubMenuData, Props };
