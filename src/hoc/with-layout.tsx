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
  }, [getProfile])

  const currentPage = navbarPages.find(page => page.url === location.pathname)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className="pt-0">
        {navbarPages.map(({ url, label, icon: Icon }) => (
          <ListItem key={url} button component={Link} to={url} className="py-4">
            <ListItemIcon
              className={clsx({
                'text-red-500': location.pathname === url,
              })}
            >
              <Icon />
            </ListItemIcon>
            <Text
              className={clsx('font-normal', {
                'text-red-500': location.pathname === url,
              })}
            >
              {label}
            </Text>
          </ListItem>
        ))}
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
              <Avatar className="bg-red-500">
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
      <nav className={classes.drawer} aria-label="mailbox folders">
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
