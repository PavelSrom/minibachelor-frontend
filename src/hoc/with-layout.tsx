import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
  Drawer,
  Hidden,
  CssBaseline,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { navbarPages } from '../utils/pages'
import { Text } from '../styleguide'
import { useAuth } from '../contexts/auth'

const DRAWER_WIDTH = 240

const useStyles = makeStyles<Theme>(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}))

export const WithLayout: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const { user, getProfile, logout } = useAuth()
  const classes = useStyles()
  const location = useLocation()

  useEffect(() => {
    getProfile()

    // eslint-disable-next-line
  }, [])

  const currentPage = navbarPages.find(page => page.url === location.pathname)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className="pt-0">
        {navbarPages.map(({ url, label, icon: Icon }) => {
          const isCurrentPage = location.pathname === url

          return (
            <ListItem
              key={url}
              button
              component={Link}
              to={url}
              className={clsx('py-5', {
                'bg-theme-lightgray': isCurrentPage,
              })}
              TouchRippleProps={{
                className: clsx({
                  'border-l-4 border-theme-secondary': isCurrentPage,
                }),
              }}
            >
              <ListItemIcon
                className={clsx({
                  'text-theme-secondary': isCurrentPage,
                })}
              >
                <Icon />
              </ListItemIcon>
              <Text
                className={clsx('font-semibold', {
                  'text-theme-secondary': isCurrentPage,
                })}
              >
                {label}
              </Text>
            </ListItem>
          )
        })}
      </List>
    </div>
  )

  return (
    <div className="flex">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="flex justify-between">
          <Text variant="h2" className="text-white">
            {currentPage?.label}
          </Text>
          {!!user && (
            <IconButton edge="end" onClick={e => setAnchorEl(e.currentTarget)}>
              <Avatar className="bg-theme-secondary">
                {user.name[0].toUpperCase() + user.surname[0].toUpperCase()}
              </Avatar>
            </IconButton>
          )}

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className="flex-grow">
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
