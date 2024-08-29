import { useForm } from "react-hook-form";
import ModalBasic from "..";

export default function ModalVarious({ open, setOpen, title }) {
  const defaultValues = {
    p_inidmaestrodetalle: null,
    p_inidmaestrocabecera: "",
    chcodigomaestrodetalle: "",
    chmaestrodetalle: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setFormValue,
  } = useForm({
    defaultValues,
  });

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
    setInputValue(null);
  };

  return (
    <ModalBasic
      open={open}
      handleClose={handleClose}
      title={title}
      actions={
        <div className='flex gap-10 justify-end'>
          <SaveButton text='Guardar' onClick={handleSubmit(onSubmit)} />
          <CancelButton text='Cancelar' onClick={handleClose} />
        </div>
      }
    >
      dada
    </ModalBasic>
  );
}
