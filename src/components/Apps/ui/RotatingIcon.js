import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  icon: {
    transition: "all 0.25s",
    display: "inline-block",
  },
}));

function RotatingIcon({ children, angle }) {
  const classes = useStyles();
  const divRef = React.useRef();
  const containerRef = React.useRef();
  React.useEffect(() => {
    const el1 = containerRef.current;
    if (el1) {
      const [w1, h1] = [el1.clientWidth, el1.clientHeight];
      // console.log(w1, h1);
    }

    const el2 = divRef.current;
    if (el2) {
      const [w2, h2] = [el2.clientWidth, el2.clientHeight];
      // console.log(w2, h2);
    }
  });
  return (
    <div
      ref={containerRef}
      className={classes.icon}
      style={{
        display: "inline-block",
        lineHeight: "0.74rem",
        transform: `rotate(${angle}deg)`,
      }}
    >
      <ArrowDropUpIcon ref={divRef} style={{ color: "inherit" }} />
    </div>
  );
}

export default React.memo(RotatingIcon);
