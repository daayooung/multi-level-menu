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

const MenuBar = (props) => {
  const [item, setItem] = useState(menuItems);

  const handleClick = (item) => {
    setItem(() => !item);
    // console.log(!item);
  };

  const handler = (children) => {
    const { classes } = props;
    console.log(classes);
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <div key={subOption.name}>
            <ListItem button key={subOption.name}>
              <Link to={subOption.url} className={classes.links}>
                <ListItemText inset primary={subOption.name} />
              </Link>
            </ListItem>
          </div>
        );
      } else {
        return (
          <div key={subOption.name}>
            <ListItem button onClick={() => handleClick(subOption.name)}>
              <ListItemText inset primary={subOption.name} />
              {[subOption.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse name={[subOption.name]} timeout="auto" unmountOnExit>
              {handler(subOption.children)}
            </Collapse>
          </div>
        );
      }
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
