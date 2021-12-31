import React from 'react';
import { SubMenuProps } from 'react-pro-sidebar';
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
export declare const AutoSubMenu: React.FC<Props>;
