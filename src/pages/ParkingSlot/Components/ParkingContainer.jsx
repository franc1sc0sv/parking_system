import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const getParqueos = (jsonData) => {
  const parqueosReservables = [];
  const parqueosNoReservables = [];

  for (const parqueo of jsonData) {
    if (parqueo.sePuedeReservar) {
      parqueosReservables.push(parqueo);
    } else {
      parqueosNoReservables.push(parqueo);
    }
  }
  return { parqueosReservables, parqueosNoReservables };
};

const ParkingContainer = ({ parqueos, handleReservar }) => {
  const formatedParqueos = parqueos.map((parqueo) => {
    const estaReservado = parqueo.reservas.some(
      (reserva) => reserva.estado === "activo"
    );
    return { ...parqueo, estaReservado, isAvailable: true };
  });

  const [parqueosReservables, setParqueos] = useState(() => {
    const { parqueosReservables } = getParqueos(formatedParqueos);
    return parqueosReservables;
  });

  const [parqueosNoReservables, setNoParqueos] = useState(() => {
    const { parqueosNoReservables } = getParqueos(formatedParqueos);
    return parqueosNoReservables;
  });

  const noParqueosReservables = parqueosReservables.length;
  const noParqueosNoReservables = parqueosNoReservables.length;

  const handleOnChangeNoParqueo = (id) => {
    const formatedData = parqueosNoReservables.map((parqueo) => {
      return parqueo.id === id
        ? { ...parqueo, isAvailable: !parqueo.isAvailable }
        : { ...parqueo };
    });
    setNoParqueos(formatedData);
  };

  const handleOnChangeParqueo = (id) => {
    const formatedData = parqueosReservables.map((parqueo) => {
      return parqueo.id === id
        ? { ...parqueo, isAvailable: !parqueo.isAvailable }
        : { ...parqueo };
    });
    setParqueos(formatedData);
  };

  return (
    <div className="flex gap-[150px] w-max mx-auto mt-10  border-[#40454c] rounded-md">
      <div className="grid h-full grid-rows-4 gap-0">
        {parqueosReservables.map((parqueo, i) => (
          <ParkingSlot
            handleReservar={handleReservar}
            key={parqueo.numeroParqueo}
            isAvailable={parqueo.isAvailable}
            parqueo={parqueo}
            isTheLast={i === noParqueosReservables - 1}
            handleOnChangeParqueo={handleOnChangeParqueo}
          />
        ))}
      </div>

      <div className="w-56 border-4 border-dotted border-[#40454c]"></div>

      <div className="grid h-full grid-rows-4 gap-0">
        {parqueosNoReservables.map((parqueo, i) => (
          <ParkingSlotReverse
            handleReservar={handleReservar}
            key={parqueo.numeroParqueo}
            isAvailable={parqueo.isAvailable}
            parqueo={parqueo}
            handleOnChangeNoParqueo={handleOnChangeNoParqueo}
            isTheLast={i === noParqueosNoReservables - 1}
          />
        ))}
      </div>
    </div>
  );
};

const ParkingSlot = ({
  isTheLast,
  isAvailable,
  parqueo,
  handleReservar,
  handleOnChangeParqueo,
}) => {
  const { numeroParqueo, estaReservado } = parqueo;
  const boderB = isTheLast ? "border-b-4" : "";
  const initialAnimation = { opacity: 0 };
  const animateAnimation = { opacity: 1 };
  const exitAnimation = { opacity: 0 };
  const transitionProps = { duration: 0.2 };
  return (
    <div
      className={`relative cursor-pointer justify-end flex w-56 border-[#40454c] h-28 border-t-4  ${boderB}`}
    >
      <div className="w-10 border-r-4 border-[#40454c] h-auto "></div>
      <input
        class="relative float-right -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
        type="checkbox"
        checked={!isAvailable}
        value={!isAvailable}
        onChange={() => {
          handleOnChangeParqueo(parqueo.id);
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={!isAvailable}
          initial={initialAnimation}
          animate={animateAnimation}
          exit={exitAnimation}
          transition={transitionProps}
          className="grid w-full place-items-center"
          onClick={() => {
            if (!estaReservado) {
              handleReservar(parqueo.id, parqueo.sePuedeReservar);
            }
          }}
        >
          {!isAvailable ? (
            <img src="/public/car.svg" alt="nose" className="w-[125px] " />
          ) : (
            <p className="text-[#a2a4ab] text-lg">
              {estaReservado ? "Reservado" : "Disponible"}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-[#a2a4ab] font-bold text-lg absolute bottom-0 right-0 ">
        {numeroParqueo}
      </p>
    </div>
  );
};

const ParkingSlotReverse = ({
  isTheLast,
  isAvailable,
  parqueo,
  handleReservar,
  handleOnChangeNoParqueo = () => {},
}) => {
  const { numeroParqueo, estaReservado } = parqueo;

  const boderB = isTheLast ? "border-b-4" : "";
  const initialAnimation = { opacity: 0 };
  const animateAnimation = { opacity: 1 };
  const exitAnimation = { opacity: 0 };
  const transitionProps = { duration: 0.2 };
  return (
    <div
      className={`relative cursor-pointer justify-end flex w-56 border-[#40454c] h-28 border-t-4  ${boderB}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={!isAvailable}
          initial={initialAnimation}
          animate={animateAnimation}
          exit={exitAnimation}
          transition={transitionProps}
          className="grid w-full place-items-center"
          onClick={() => {
            if (!estaReservado) {
              handleReservar(parqueo.id, parqueo.sePuedeReservar);
            }
          }}
        >
          {!isAvailable ? (
            <img src="/public/car.svg" alt="nose" className="w-[125px] " />
          ) : (
            <p className="text-[#a2a4ab] text-lg">
              {estaReservado ? "Reservado" : "Disponible"}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-[#a2a4ab] font-bold text-lg absolute bottom-0 left-0 ">
        {numeroParqueo}
      </p>
      <div className="w-10 border-l-4 border-[#40454c] h-auto "></div>

      <input
        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
        type="checkbox"
        checked={!isAvailable}
        value={!isAvailable}
        onChange={() => {
          handleOnChangeNoParqueo(parqueo.id);
        }}
      />
    </div>
  );
};

export default ParkingContainer;
