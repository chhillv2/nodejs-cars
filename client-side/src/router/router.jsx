import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Paper,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useLocation } from "react-router-dom";
import { useActions } from "../redux/actions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  averageListingprice,
  AuthorsListScreen,
  DistributionMakeListScreen,
  TopfivepermonthScreen,
} from "../screens/allScreens";

import { Logo, LogoDark, Profile } from "../STATIC/user.js";
import MovaLogo from "../assets/mova-logo-sm.png";
import MovaLogoSM from "../assets/mova-logo-sm.png";

const drawerWidth = 240;

export default function Router() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeLink, setActiveLink] = useState(0);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/averageListing") {
      setActiveLink(0);
    } else if (location.pathname === "/distributionMake") {
      setActiveLink(1);
    } else if (location.pathname === "/mostContactedlisting") {
      setActiveLink(2);
    } else if (location.pathname === "/topfivepermonth") {
      setActiveLink(3);
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{ justifyContent: "space-between", alignItems: "middle" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "middle",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={Logo}
              className={classes.logo}
              style={{ display: open ? "none" : "block" }}
              alt=""
            />
          </div>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <img src={Profile} className={classes.profile} alt="" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: 20 }}
            >
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link to="/">
            <img src={LogoDark} className={classes.logoDark} />
          </Link>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider style={{ marginBottom: "1rem" }} />
        <div className={classes.toolbarContent}>
          <List>
            <Link to="/averageListing" className={classes.linkfix}>
              <ListItem
                button
                key="1"
                style={{
                  borderLeft:
                    activeLink === 0
                      ? "3px solid #0A3C70"
                      : "3px solid transparent",
                  paddingBottom: 15,
                  paddingTop: 15,

                  backgroundColor: activeLink === 0 ? "#f7f7f7" : "transparent",
                }}
              >
                <ListItemIcon
                  style={{
                    color: activeLink === 0 ? "#0A3C70" : "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ color: activeLink === 0 ? "#0A3C70" : "inherit" }}
                >
                  Average-Listing
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/distributionMake" className={classes.linkfix}>
              <ListItem
                button
                key="1"
                style={{
                  borderLeft:
                    activeLink === 1
                      ? "3px solid #0A3C70"
                      : "3px solid transparent",
                  paddingBottom: 15,
                  paddingTop: 15,

                  backgroundColor: activeLink === 1 ? "#f7f7f7" : "transparent",
                }}
              >
                <ListItemIcon
                  style={{
                    color: activeLink === 1 ? "#0A3C70" : "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  <ImportContactsIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ color: activeLink === 1 ? "#0A3C70" : "inherit" }}
                >
                  Distribution
                </ListItemText>
              </ListItem>
            </Link>

            <Link to="/mostContactedlisting" className={classes.linkfix}>
              <ListItem
                button
                key="1"
                style={{
                  borderLeft:
                    activeLink === 2
                      ? "3px solid #0A3C70"
                      : "3px solid transparent",
                  paddingBottom: 15,
                  paddingTop: 15,

                  backgroundColor: activeLink === 2 ? "#f7f7f7" : "transparent",
                }}
              >
                <ListItemIcon
                  style={{
                    color: activeLink === 2 ? "#0A3C70" : "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ color: activeLink === 2 ? "#0A3C70" : "inherit" }}
                >
                  Average-price
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/topfivepermonth" className={classes.linkfix}>
              <ListItem
                button
                key="1"
                style={{
                  borderLeft:
                    activeLink === 3
                      ? "3px solid #0A3C70"
                      : "3px solid transparent",
                  paddingBottom: 15,
                  paddingTop: 15,

                  backgroundColor: activeLink === 3 ? "#f7f7f7" : "transparent",
                }}
              >
                <ListItemIcon
                  style={{
                    color: activeLink === 3 ? "#0A3C70" : "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: activeLink === 3 ? "#0A3C70" : "inherit",
                  }}
                >
                  TopFivePerMonth
                </ListItemText>
              </ListItem>
            </Link>
          </List>

          <div className={classes.toolbarFooter}>
            <img
              src={MovaLogo}
              className={classes.toolbarFooterLogo}
              style={{ display: open ? "inline-block" : "none" }}
            />
            <img
              src={MovaLogoSM}
              className={classes.toolbarFooterLogoSM}
              style={{ display: open ? "none" : "inline-block" }}
            />
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Paper style={{ height: "100%" }}>
          <div className={classes.wrapper}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/mostContactedlisting" component={AuthorsListScreen} />
              <Route exact path="/averageListing" component={averageListingprice} />
              <Route exact path="/distributionMake" component={DistributionMakeListScreen} />
              <Route exact path="/topfivepermonth" component={TopfivepermonthScreen} />
              <Route exact path="/">
                <Redirect to="/articles" />
              </Route>
            </Switch>
          </div>
        </Paper>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    //height: "100vh",
    backgroundColor: "#fff",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
  },
  toolbarContent: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  toolbarFooter: {
    paddingBottom: "1.5rem",
    width: "100%",
    textAlign: "center",
  },
  toolbarFooterLogo: {
    width: 140,
  },
  toolbarFooterLogoSM: {
    height: 30,
  },
  content: {
    flexGrow: 1,
  },
  profile: {
    width: "2.6rem",
    height: "2.6rem",
    borderRadius: 30,
    cursor: "pointer",
  },
  logo: {
    width: "8rem",
  },
  logoDark: {
    width: "7rem",
  },
  linkfix: {
    textDecoration: "none",
    color: "inherit",
  },
  wrapper: {
    padding: theme.spacing(2.5),
  },
}));
