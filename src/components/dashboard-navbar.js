import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { SettingsModal } from './settings/settings-modal';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const progress = useSelector((state) => state.books.progress);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <SettingsModal a="b" />

        </Toolbar>
        <LinearProgress variant="determinate"
          value={progress?.value}
          style={{ display: progress.finished ? 'none' : 'block' }}
        />
      </DashboardNavbarRoot>

    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
