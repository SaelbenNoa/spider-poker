import React from 'react';
import { css } from 'aphrodite';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import style from '../styles/Navbar';

const Navbar = ({ openImportDialog }) => (
  <AppBar
    title="Planning Poker"
    className={css(style.main)}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Importar histórias"
          onTouchTap={() => openImportDialog()}
        />
      </IconMenu>
    }
  />
);

export default Navbar;

