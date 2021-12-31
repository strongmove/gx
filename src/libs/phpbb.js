import React from "react";
import Link from "@material-ui/core/Link";

export const disableMagicUrl = () => {
  const elMagic = document.getElementsByName("disable_magic_url");
  if (elMagic.length === 1) {
    elMagic[0].checked = true;
  }
};

export const getStyleType = () => {
  const stEl = document.getElementsByName("snp_style_type");
  let styleType = "light";
  if (stEl.length === 1) {
    styleType = stEl[0].value;
  }
  return styleType;
};

export const getStyleName = () => {
  const snEl = document.getElementsByName("snp_style_name");
  let styleName = "prosilver";
  if (snEl.length === 1) {
    styleName = snEl[0].value;
  }
  return styleName;
};

export const getTemplateVar = (varname) => {
  const snEl = document.getElementsByName(varname);
  let value = null;
  if (snEl.length === 1) {
    value = snEl[0].value;
  }
  return value;
};

export const UserProfileLink = ({ username, userId, ...rest }) => {
  return (
    <Link href={`memberlist.php?mode=viewprofile&u=${userId}`} {...rest}>
      {username}
    </Link>
  );
};

export const PostLink = ({ children, postId, ...rest }) => {
  return (
    <Link href={`viewtopic.php?p=${postId}`} {...rest}>
      {children}
    </Link>
  );
};

export const isViewTopic = (url) => {
  var filename = url.substring(url.lastIndexOf("/") + 1);
  return filename === "viewtopic.php";
};
