import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import LinaSvgIcon from "@lina/core/LinaSvgIcon";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { darken } from "@mui/material/styles";
import { useAppSelector } from "app/store/hooks";

/**
 * The user menu.
 */
function UserMenu() {
  const user = useAppSelector(selectUser);
  const { signOut } = useAuth();
  const [userMenu, setUserMenu] = useState(null);
  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };
  const userMenuClose = () => {
    setUserMenu(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Button
        className='min-h-40 min-w-40 p-0 md:py-6'
        onClick={userMenuClick}
        color='inherit'
      >
        {user.data.photoURL ? (
          <Avatar
            sx={{
              background: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.secondary,
            }}
            className='md:mx-4'
            alt='user photo'
            src={user.data.photoURL}
          />
        ) : (
          <Avatar
            sx={{
              background: (theme) =>
                darken(theme.palette.background.default, 0.05),
              color: (theme) => theme.palette.text.secondary,
            }}
            className='md:mx-4'
          >
            {/* {user?.data?.displayName?.[0]} */}
          </Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
            <div className='mx-4 flex-col text-center md:flex'>
              <Typography component='span' className='flex font-semibold justify-center'>
                {user.data.displayName}
              </Typography>
              <Typography
                className='text-11 font-medium capitalize'
                color='text.secondary'
              >
                {user.role?.toString()}
                {(!user.role ||
                  (Array.isArray(user.role) && user.role.length === 0)) &&
                  "Guest"}
              </Typography>
            </div>
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to='/sign-in' role='button'>
              <ListItemIcon className='min-w-40'>
                <LinaSvgIcon>heroicons-outline:lock-closed</LinaSvgIcon>
              </ListItemIcon>
              <ListItemText primary='Sign In' />
            </MenuItem>
            <MenuItem component={Link} to='/sign-up' role='button'>
              <ListItemIcon className='min-w-40'>
                <LinaSvgIcon>heroicons-outline:user-add </LinaSvgIcon>
              </ListItemIcon>
              <ListItemText primary='Sign up' />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to='/apps/profile'
              onClick={userMenuClose}
              role='button'
            >
              <ListItemIcon className='min-w-40'>
                <LinaSvgIcon>heroicons-outline:user-circle</LinaSvgIcon>
              </ListItemIcon>
              <ListItemText primary='My Profile' />
            </MenuItem>
            <MenuItem
              component={Link}
              to='/apps/mailbox'
              onClick={userMenuClose}
              role='button'
            >
              <ListItemIcon className='min-w-40'>
                <LinaSvgIcon>heroicons-outline:mail-open</LinaSvgIcon>
              </ListItemIcon>
              <ListItemText primary='Inbox' />
            </MenuItem>
            <MenuItem
              onClick={() => {
                signOut();
              }}
            >
              <ListItemIcon className='min-w-40'>
                <LinaSvgIcon>heroicons-outline:logout</LinaSvgIcon>
              </ListItemIcon>
              <ListItemText primary='Sign out' />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
