import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalBasic({
  open,
  handleClose,
  title,
  children,
  actions,
  className,
}) {
  return (
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={style}
        className={`w-11/12 md:w-3/4 lg:w-7/12 rounded-md py-14 max-h-full ${className}`}
      >
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          className='flex justify-between'
          color={"primary"}
        >
          {title}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Divider />
        <Typography
          id='modal-modal-description'
          sx={{ mt: 2 }}
          component='div'
          className='overflow-y-auto max-h-[550px] pr-1'
        >
          <div className='mt-5'>{children}</div>
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} component='div'>
          <Divider className='!mb-3' />
          {actions}
        </Typography>
      </Box>
    </Modal>
  );
}
