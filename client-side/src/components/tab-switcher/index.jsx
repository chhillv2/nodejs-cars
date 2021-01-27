import React from "react";
import { Toolbar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TabSwitcher = (props) => {
  const classes = useStyles();
  const { open, tabs = [], activeTab, onTabChange, actions = [] } = props;

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Toolbar variant="dense" style={{ padding: 0 }}>
          {tabs.length === 0 ? null : (
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={onTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs.map((tab, index) => (
                <Tab
                  className={classes.tabOverride}
                  key={index}
                  label={tab.label}
                  disabled={tab.disabled}
                />
              ))}
            </Tabs>
          )}
        </Toolbar>
      </div>
    </div>
  );
};

export default TabSwitcher;

const useStyles = makeStyles((theme) => ({
  button: {
    whiteSpace: "nowrap",
  },
  tabOverride: {
    textTransform: "capitalize",
    minWidth: 0,
    marginRight: 30,
  },
}));
