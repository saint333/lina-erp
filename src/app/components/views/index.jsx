import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Breadcrumbs, Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link } from "react-router-dom";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

/**
 * The SimpleFullWidthPageScroll page.
 */
function ViewPrincipal({ header, content }) {
  const { title, breadcrumbs } = header || {};

  return (
    <Root
      header={
        header && (
          <div className='flex flex-col p-24 w-full sm:py-32 sm:px-40'>
            {breadcrumbs && (
              <div>
                <Breadcrumbs
                  separator={
                    <FuseSvgIcon size={20}>
                      heroicons-solid:chevron-right
                    </FuseSvgIcon>
                  }
                  aria-label='breadcrumb'
                >
                  {breadcrumbs.map((breadcrumb, index) => (
                    <Link
                      className='font-medium hover:underline'
                      key={index}
                      color='inherit'
                      to={breadcrumb.link}
                    >
                      {breadcrumb.title}
                    </Link>
                  ))}
                </Breadcrumbs>

                <div className='flex sm:hidden' />
              </div>
            )}
            {title && (
              <div className='flex items-center w-full mt-8 -mx-10'>
                <Typography
                  component='h2'
                  className='flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10'
                >
                  {title}
                </Typography>
              </div>
            )}
          </div>
        )
      }
      content={
        <div className='flex-auto p-24 sm:p-40'>
          <div className='h-full min-h-full max-h-full rounded-2xl'>
            {content}
          </div>
        </div>
      }
      scroll='content'
    />
  );
}

export default ViewPrincipal;
