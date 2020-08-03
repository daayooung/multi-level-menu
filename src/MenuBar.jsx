import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import menuItems from './menuItems';

const styles = {
  list: {
    width: 250
  },
  links: {
    textDecoration: 'none'
  },
  menuHeader: {
    paddingLeft: '30px'
  }
};

const menuChildren = menuItems.data.map((a) => a.children);

const MenuBar = (props) => {
  const [hasChildren, setHasChildren] = useState(null);
  console.log(menuChildren);

  const handleClick = () => {
    setHasChildren(() => !hasChildren);
  };

  const handler = (children) => {
    const { classes } = props;
    console.log(children);
    console.log(classes);
    return children.map((data) => {
      if (!data.children) {
        return (
          <div key={data.name}>
            <ListItem button key={data.name}>
              <Link to={data.url} className={classes.links}>
                <ListItemText inset primary={data.name} />
              </Link>
            </ListItem>
          </div>
        );
      }

      return (
        <div key={data.name}>
          <ListItem button onClick={() => handleClick(data.name)}>
            <ListItemText inset primary={data.name} />
            {[data.children] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={hasChildren} timeout="auto" unmountOnExit>
            {handler(data.children)}
          </Collapse>
        </div>
      );
    });
  };

  const { classes, drawerOpen, menuOptions } = props;
  return (
    <div className={classes.list}>
      <Drawer
        variant="persistent"
        anchor="left"
        open
        classes={{ paper: classes.list }}
      >
        <div>
          <List>
            <ListItem key="menuHeading" divider disableGutters>
              <ListItemText
                className={classes.menuHeader}
                inset
                primary="Menu"
              />
            </ListItem>
            {handler(menuItems.data)}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(MenuBar);
