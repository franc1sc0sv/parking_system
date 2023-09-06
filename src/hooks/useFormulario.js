import { useState } from "react";
import { useForm } from "react-hook-form";

const useFormulario = (apiFunction, defaultValues = {}) => {
  const { register, handleSubmit, setValue, formState, reset } = useForm({});
  const [mensajeError, setMensajeError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const realizarAccion = async (data) => {
    try {
      setIsLoading(true);
      const d = await apiFunction(data);
      setData(d);
      setRegistroExitoso(true);
    } catch (error) {
      setMensajeError(error);
      setRegistroExitoso(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(realizarAccion),
    setValue,
    mensajeError,
    registroExitoso,
    formState,
    data,
    reset,
    isLoading,
  };
};

export { useFormulario };
