import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { ChartBar as ChartBarIcon } from '../icons/chart-bar'
import { Cog as CogIcon } from '../icons/cog'
import { Lock as LockIcon } from '../icons/lock'
import { Selector as SelectorIcon } from '../icons/selector'
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag'
import { User as UserIcon } from '../icons/user'
import { UserAdd as UserAddIcon } from '../icons/user-add'
import { Users as UsersIcon } from '../icons/users'
import { XCircle as XCircleIcon } from '../icons/x-circle'
import { Logo } from './logo'
import { NavItem } from './nav-item'
import Icon from '@mui/material/Icon'

import { FaDiscord, FaReddit, FaAudible } from 'react-icons/fa'
import { AiOutlineMail, AiOutlineDollar } from 'react-icons/ai'

import { IconButton } from '@mui/material'

const items = [
  {
    href: '/',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Conversion',
  },
  {
    href: '/customers',
    icon: <ShoppingBagIcon fontSize="small" />,
    title: 'Lookup Checksum',
  },
  // {
  //   href: '/products',
  //   icon: (<ShoppingBagIcon fontSize="small" />),
  //   title: 'Info'
  // },
  // {
  //   href: '/account',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
]

export const DashboardSidebar = (props) => {
  const { open, onClose } = props
  const router = useRouter()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  })

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (open) {
        onClose?.()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  )

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ padding: 2 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            marginBottom: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
      <Divider
          sx={{
            borderColor: '#2D3748',
          }}
        />
      <Box
        sx={{
          flex: 0,
          height: '100%',
          anchor: 'bottom',
          justifyContent: 'center',
          margin: 'auto'
        }}
      >

        <IconButton
          aria-label="discord"
          // 
          onClick={() => window.open('https://discord.gg/P9evWVw8DW')}
        >
          <FaDiscord style={{ height: 30, width: 30 }}/>
        </IconButton>

        <IconButton
          aria-label="reddit"
          onClick={() => window.open('https://www.reddit.com/r/audible')}
        >
          <FaReddit />
        </IconButton>

        <IconButton
          aria-label="email"
          onClick={() =>
            window.open(
              'https://mailhide.io/e/0gMsnii0',
              'mailhidepopup',
              'width=500,height=500',
            )
          }
        >
          <AiOutlineMail style={{ height: 30, width: 30 }}/>
        </IconButton>

        <IconButton
          aria-label="donate"
          onClick={() => {
            alert('todo')
          }}
        >
          <AiOutlineDollar style={{ height: 30, width: 30 }}/>
        </IconButton>

        <IconButton
          aria-label="audible"
          onClick={() => {
            const site = navigator.language.includes('de')
              ? 'https://www.audible.de/library/titles'
              : 'https://www.audible.com/library/titles'
            window.open(site)
          }}
        >
          <FaAudible style={{ height: 30, width: 30 }}/>
        </IconButton>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
