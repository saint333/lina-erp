import { styled } from "@mui/material/styles";
import LinaMessage from "@lina/core/LinaMessage";
import AppContext from "app/AppContext";
import { lazy, memo, Suspense, useContext } from "react";
import { useRoutes } from "react-router-dom";
import { selectLinaCurrentLayoutConfig } from "@lina/core/LinaSettings/linaSettingsSlice";
import LinaSuspense from "@lina/core/LinaSuspense";
import { useAppSelector } from "app/store/hooks";
import LeftSideLayout1 from "./components/LeftSideLayout1";
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1";
import ToolbarLayout1 from "./components/ToolbarLayout1";

const LinaDialog = lazy(() => import("@lina/core/LinaDialog/LinaDialog"));
const Root = styled("div")(({ config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `${config.containerWidth}px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `${config.containerWidth}px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

/**
 * The layout 1.
 */
function Layout1(props) {
  const { children } = props;
  const config = useAppSelector(selectLinaCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  return (
    <Root id='lina-layout' config={config} className='flex w-full'>
      {config.leftSidePanel.display && <LeftSideLayout1 />}

      <div className='flex min-w-0 flex-auto'>
        {config.navbar.display && config.navbar.position === "left" && (
          <NavbarWrapperLayout1 />
        )}

        <main
          id='lina-main'
          className='relative z-10 flex max-h-screen min-w-0 flex-auto flex-col'
        >
          {config.toolbar.display && (
            <ToolbarLayout1
              className={config.toolbar.style === "fixed" ? "sticky top-0" : ""}
            />
          )}

          <div className='relative z-10 flex min-h-0 flex-auto flex-col'>
            <LinaSuspense>{useRoutes(routes)}</LinaSuspense>

            <Suspense>
              <LinaDialog />
            </Suspense>
            {children}
          </div>
        </main>

        {config.navbar.display && config.navbar.position === "right" && (
          <NavbarWrapperLayout1 />
        )}
      </div>

      <LinaMessage />
    </Root>
  );
}

export default memo(Layout1);
