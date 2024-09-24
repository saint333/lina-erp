import { useSnackbar } from "notistack";
import ModalBasic from "..";

export const BotModal = ({ open, setOpen, title, data, setData }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setData(null);
    setOpen(false);
  };

  return (
    <ModalBasic
      open={open}
      title={title}
      handleClose={handleClose}
      className="md:!w-8/12 lg:!w-6/12"
    ></ModalBasic>
  );
};
