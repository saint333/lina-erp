import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { memo } from "react";
import {
  changeLinaTheme,
  selectLinaCurrentLayoutConfig,
  selectToolbarTheme,
} from "@lina/core/LinaSettings/linaSettingsSlice";
import NavbarToggleButton from "app/theme-layouts/shared-components/navbar/NavbarToggleButton";
import { selectLinaNavbar } from "app/theme-layouts/shared-components/navbar/navbarSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import AdjustFontSize from "../../shared-components/AdjustFontSize";
import FullScreenToggle from "../../shared-components/FullScreenToggle";
import LanguageSwitcher from "../../shared-components/LanguageSwitcher";
import NavigationShortcuts from "../../shared-components/navigation/NavigationShortcuts";
import UserMenu from "../../shared-components/UserMenu";
import DomainComponent from "app/theme-layouts/shared-components/Domain";
import SucursalComponent from "app/theme-layouts/shared-components/Sucursal";
import LinaThemeSelector from "@lina/core/LinaThemeSelector";
import themeOptions from "app/configs/themeOptions";
import { showMessage } from "@lina/core/LinaMessage/linaMessageSlice";
import { Language } from "@mui/icons-material";
import { IconButton } from "@mui/material";

/**
 * The toolbar layout 1.
 */
function ToolbarLayout1(props) {
  const { className } = props;
  const config = useAppSelector(selectLinaCurrentLayoutConfig);
  const navbar = useAppSelector(selectLinaNavbar);
  const toolbarTheme = useAppSelector(selectToolbarTheme);
  const dispatch = useAppDispatch();

  function handleThemeSelect(_theme) {
    dispatch(changeLinaTheme(_theme?.section)).then(() => {
      dispatch(showMessage({ message: "Cambio de tema aplicado" }));
    });
    localStorage.setItem("theme", JSON.stringify(_theme.id));
  }

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id='lina-toolbar'
        className={clsx("relative z-20 flex shadow", className)}
        color='default'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position='static'
        elevation={0}
      >
        <Toolbar className='min-h-48 p-0 pt-10 md:min-h-64'>
          <div className='flex flex-1 px-16'>
            {config.navbar.display && config.navbar.position === "left" && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === "style-3" ||
                    config.navbar.style === "style-3-dense") && (
                    <NavbarToggleButton className='mx-0 h-40 w-40 p-0' />
                  )}

                  {config.navbar.style === "style-1" && !navbar.open && (
                    <NavbarToggleButton className='mx-0 h-40 w-40 p-0' />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className='mx-0 h-40 w-40 p-0 sm:mx-8' />
                </Hidden>
              </>
            )}

            <Hidden lgDown>
              <NavigationShortcuts />
            </Hidden>
          </div>

          <div
            className='flex h-full items-center overflow-x-auto px-8 gap-3 py-8'
            style={{ scrollbarWidth: "none" }}
          >
            <IconButton
              className={clsx("h-40 w-40", className)}
              aria-controls='font-size-menu'
              aria-haspopup='true'
              size='large'
            >
              <Language />
            </IconButton>
            <div className='flex gap-3 w-full'>
              <DomainComponent />
              <SucursalComponent />
            </div>
            <LinaThemeSelector
              options={themeOptions}
              onSelect={handleThemeSelect}
            />
            <AdjustFontSize />
            <FullScreenToggle />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === "right" && (
            <>
              <Hidden lgDown>
                {!navbar.open && (
                  <NavbarToggleButton className='mx-0 h-40 w-40 p-0' />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className='mx-0 h-40 w-40 p-0 sm:mx-8' />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
