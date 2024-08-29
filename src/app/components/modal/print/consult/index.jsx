import { CancelButton, SendButton } from "src/app/components/button/button";
import ModalBasic from "../..";

export default function ConsultModal({ open, setOpen, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-10 justify-end'>
          <SendButton text='Enviar por Whatsapp' color='success' />
          <SendButton text='Enviar por Correo' color='warning' />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      <div className='p-2'>
        <iframe
          src='https://www.recope.go.cr/wp-content/uploads/2017/03/INFORME-ANUAL-DE-VENTAS-2016.pdf'
          width='100%'
          height='500px'
        />
      </div>
    </ModalBasic>
  );
}
