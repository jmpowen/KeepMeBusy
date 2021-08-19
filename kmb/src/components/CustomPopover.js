import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const useStyles = makeStyles({
  root: {
  },
  selectAction: {
    display: "flex",
    flexFlow: "column wrap",
  },
});

export default function CustomPopover({ icon, actions, handleActionClick }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (icon === null) {
    return (
      <SvgIcon component={HourglassEmptyIcon} />
    );
  }

  return (
    <>
      <SvgIcon component={icon} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={classes.selectAction}>
          {actions.map((action) => (
            <Button
              value={action}
              onClick={handleActionClick}
              variant="contained"
              key={action}
            >
              {action}
            </Button>
          ))}
        </div>
      </Popover>
    </>
  );
}
