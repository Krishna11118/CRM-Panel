import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useMenu, MenuProvider } from "@mui/base/useMenu";
import { useMenuItem } from "@mui/base/useMenuItem";
import { Popper } from "@mui/base/Popper";
import { useDropdown, DropdownContext } from "@mui/base/useDropdown";
import { useMenuButton } from "@mui/base/useMenuButton";
import { useTheme } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Profile from "../../pages/Profile";
import { Link } from "react-router-dom";

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
  });

  return (
    <Popper open={open} anchorEl={triggerElement}>
      <ul className="menu-root" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

Menu.propTypes = {
  children: PropTypes.node,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    rootRef: ref,
  });

  const classes = {
    "focus-visible": focusVisible,
    "menu-item": true,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
      className={clsx(classes)}
    >
      {children}
    </li>
  );
});

MenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const MenuButton = React.forwardRef(function MenuButton(props, forwardedRef) {
  const { getRootProps: getButtonProps } = useMenuButton({
    rootRef: forwardedRef,
  });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default function UseMenu() {
  const { contextValue: dropdownContextValue } = useDropdown();

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <React.Fragment>
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton className=" h-[40px] pl-5">
          <MoreVertIcon style={{ color: "white" }} size={10} />
        </MenuButton>
        <Menu id="hooks-menu">
          <MenuItem
            onClick={createHandleMenuClick("Light")}
            style={{ color: "white" }}
          >
            <Link to="/profile" style={{ color: "white" }} className="no-underline"> Profile </Link>
          </MenuItem>
          <MenuItem
            onClick={createHandleMenuClick("Light")}
            style={{ color: "white" }}
          >
            Light
          </MenuItem>{" "}
          <MenuItem
            onClick={createHandleMenuClick("Light")}
            style={{ color: "white" }}
          >
            Light
          </MenuItem>{" "}
        </Menu>
      </DropdownContext.Provider>
      <Styles />
    </React.Fragment>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#1D283C",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const styles = `
    .menu-root {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box; 
      padding: 5px;
      margin: 10px 0;
      min-width: 80px;
      background: #384770;
      border: 1px solid ${grey[400]};
      border-radius: 0.75em;
      color: ${grey[900]};
      overflow: auto;
      outline: 0px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
      cursor: pointer;

    }

    .mode-dark .menu-root {
      background: ${grey[900]};
      border-color: ${grey[700]};
      color: ${grey[300]};
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    }

    .menu-item {
      list-style: none;
      padding: 8px;
      border-radius: 0.45em;
      cursor: default;
      user-select: none;
      cursor: pointer;
    }

    .menu-item:last-of-type {
      border-bottom: none;
    }

    .menu-item:focus {
      background-color: ${grey[400]};
      color: ${grey[900]};
      outline: 0;
    }

    .mode-dark .menu-item:focus {
      background-color: ${grey[800]};
      color: ${grey[300]};
    }

    .menu-item.disabled {
      color: ${grey[400]};
    }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

    .button {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      
      transition: all 150ms ease;
      cursor: pointer;
      border: 1px solid ${isDarkMode ? grey[700] : grey[400]};
      color: ${isDarkMode ? grey[200] : grey[900]};
      padding-right: 10px;

     
    }
  `;

  // eslint-disable-next-line react/no-danger
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
