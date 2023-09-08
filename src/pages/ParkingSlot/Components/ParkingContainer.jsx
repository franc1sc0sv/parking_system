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
            if (!estaReservado && isAvailable) {
              handleReservar(parqueo.id, parqueo.sePuedeReservar);
            }
          }}
        >
          {!isAvailable ? (
            <MyIcon />
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
            if (!estaReservado && !isAvailable) {
              handleReservar(parqueo.id, parqueo.sePuedeReservar);
            }
          }}
        >
          {!isAvailable ? (
            <MyIcon />
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

const MyIcon = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1200 1200"
      enableBackground="new 0 0 1200 1200"
      xmlSpace="preserve"
    >
      <path
        fill="#1E1E1E"
        d="M1146.099,582.67c-1.521-3.967,1.125-35.701-0.065-48.792s0.397-21.818,0-28.561
    c-0.397-6.744-6.744-9.52-10.314-13.884c-3.57-4.363-13.091-33.718-36.098-59.502c-23.008-25.784-72.593-45.222-72.593-45.222
    s-12.297-8.33-17.851-11.107c-5.554-2.777-48.792-3.967-87.27-4.76c-38.478-0.793-70.609,4.364-70.609,4.364l-76.56-2.777
    c0,0-9.917-17.057-16.661-24.991s-18.644-18.247-23.008-20.231c-7.754-3.524-16.264,0.397-17.057,3.173
    c-0.793,2.777,17.057,42.048,17.057,42.048s-216.589-1.19-246.736,0c-30.148,1.19-168.987,5.554-168.987,5.554l-3.306-0.793
    c0,0-72.461-3.173-109.484-0.529c-37.024,2.645-44.958,13.223-44.958,13.223s-49.717,5.289-58.073,7.404
    c-8.355,2.116-21.793,19.57-31.842,40.197c-10.05,20.627-17.983,70.874-19.57,101.022c-1.364,25.913-1.946,53.369-2.082,60.577H50
    c0,0,0.005,0.324,0.016,0.917c-0.011,0.593-0.016,0.917-0.016,0.917h0.033c0.136,7.208,0.719,34.664,2.082,60.577
    c1.587,30.148,9.52,80.394,19.57,101.022c10.049,20.628,23.487,38.082,31.842,40.197c8.355,2.116,58.073,7.405,58.073,7.405
    s7.934,10.578,44.958,13.223c37.024,2.645,109.484-0.529,109.484-0.529l3.306-0.793c0,0,138.839,4.364,168.987,5.554
    c30.148,1.19,246.736,0,246.736,0s-17.851,39.272-17.057,42.048c0.793,2.777,9.303,6.698,17.057,3.173
    c4.364-1.983,16.264-12.297,23.008-20.231c6.744-7.934,16.661-24.991,16.661-24.991l76.56-2.777c0,0,32.131,5.157,70.609,4.363
    c38.478-0.793,81.717-1.983,87.27-4.76c5.554-2.777,17.851-11.107,17.851-11.107s49.585-19.437,72.593-45.222
    s32.528-55.139,36.098-59.502c3.57-4.363,9.917-7.14,10.314-13.884c0.397-6.744-1.19-15.471,0-28.561s-1.456-44.825,0.065-48.792
    c1.521-3.967,3.901-8.33,3.901-8.33v-8.082v-1.835V591C1150,591,1147.62,586.637,1146.099,582.67z M451.06,427.294
    c2.076-3.972,4.864-9.155,7.126-12.817c4.165-6.744,12.892-15.272,12.892-15.272s76.163-5.752,116.625-6.744
    c40.462-0.992,164.623-1.785,164.623-1.785s0.595,5.355,0,7.339c-0.595,1.983-7.735,5.157-11.107,6.545
    c-3.372,1.388-113.253,17.057-165.813,22.016c-43.231,4.078-101.489,5.876-120.809,6.385
    C451.642,433.039,449.691,429.913,451.06,427.294z M611.5,600.971h-0.082c-0.33,7.912-1.549,38.339-1.549,55.975
    c0,10.349-0.981,25.881-1.946,38.67c-0.948,12.549-11.412,22.239-23.996,22.239h-75.949c-12.483,0-22.833-9.663-23.672-22.118
    c-0.707-10.489-1.439-22.285-1.693-29.546c-0.482-13.717-1.175-55.733-1.329-65.22h-0.031c0,0,0.006-0.36,0.016-0.971
    c-0.01-0.611-0.016-0.972-0.016-0.972h0.031c0.153-9.487,0.847-51.503,1.329-65.22c0.255-7.261,0.987-19.057,1.693-29.546
    c0.839-12.455,11.188-22.117,23.672-22.117h75.949c12.584,0,23.048,9.69,23.996,22.239c0.965,12.789,1.946,28.321,1.946,38.67
    c0,17.636,1.219,48.063,1.549,55.975h0.082c0,0-0.015,0.342-0.041,0.972C611.485,600.63,611.5,600.971,611.5,600.971z
     M119.66,733.34c-10.917,3.686-23.002-0.129-29.717-9.492c-4.06-5.661-7.945-12.434-9.795-19.446
    c-4.76-18.049-6.545-36.495-6.942-56.527c-0.359-18.16-0.067-43.328-0.009-47.875c-0.058-4.547-0.35-29.715,0.009-47.875
    c0.397-20.032,2.182-38.478,6.942-56.527c1.849-7.012,5.735-13.785,9.795-19.446c6.716-9.363,18.801-13.178,29.717-9.492
    l29.312,9.898c0,0-16.661,18.247-25.388,42.247c-8.16,22.44-8.69,74.522-8.725,81.196c0.034,6.674,0.565,58.755,8.725,81.196
    c8.727,23.999,25.388,42.247,25.388,42.247L119.66,733.34z M152.11,599.085l0.036-0.002c0,0-0.009,0.328-0.02,0.917
    c0.011,0.588,0.02,0.917,0.02,0.917l-0.036-0.002c-0.111,6.851-0.294,31.736,2.416,51.72c3.173,23.404,12.297,46.809,13.289,49.982
    c0.992,3.173-2.182,6.545-2.182,6.545s-13.091-8.925-17.057-39.073c-3.706-28.165-3.084-65.322-2.986-70.089
    c-0.098-4.767-0.719-41.924,2.986-70.089c3.967-30.148,17.057-39.073,17.057-39.073s3.173,3.372,2.182,6.545
    c-0.992,3.173-10.115,26.578-13.289,49.982C151.816,567.349,151.998,592.234,152.11,599.085z M296.333,782.797
    c-30.902-3.899-86.981-11.817-106.31-14.561c-1.945-0.276-2.315-2.924-0.517-3.717c5.234-2.312,13.02-5.807,19.186-8.582
    c6.358-2.862,13.335-4.064,20.284-3.499l197.364,16.07l9.878,29.459C436.217,797.968,334.083,787.56,296.333,782.797z
     M426.339,431.491l-197.364,16.07c-6.949,0.566-13.926-0.636-20.284-3.498c-6.166-2.776-13.952-6.27-19.186-8.582
    c-1.797-0.794-1.428-3.441,0.517-3.717c19.329-2.745,75.408-10.662,106.31-14.561c37.75-4.763,139.884-15.17,139.884-15.17
    L426.339,431.491z M752.326,809.324c0,0-124.162-0.793-164.623-1.785c-40.462-0.992-116.625-6.744-116.625-6.744
    s-8.727-8.529-12.892-15.272c-2.262-3.662-5.05-8.845-7.126-12.817c-1.369-2.619,0.583-5.745,3.537-5.667
    c19.32,0.509,77.578,2.307,120.809,6.385c52.56,4.958,162.441,20.627,165.813,22.016c3.372,1.388,10.512,4.562,11.107,6.545
    S752.326,809.324,752.326,809.324z M875.028,600.615h-0.072c-0.309,5.267-1.663,27.865-4.678,72.55
    c-2.083,30.863-13.789,63.312-22.866,84.414c-5.984,13.912-20.313,22.31-35.37,20.683c-17.201-1.858-39.541-4.371-53.227-6.301
    c-15.985-2.254-46.558-8.753-66.143-13.057c-9.918-2.18-16.131-12.047-13.83-21.937c4.083-17.552,9.91-43.754,11.892-58.419
    c3.167-23.433,1.583-78.531,1.583-78.531l5.169-0.018l-5.169-0.018c0,0,1.583-55.098-1.583-78.531
    c-1.982-14.666-7.809-40.867-11.892-58.42c-2.301-9.89,3.912-19.756,13.83-21.936c19.584-4.305,50.158-10.803,66.143-13.057
    c13.686-1.93,36.026-4.444,53.227-6.302c15.057-1.626,29.386,6.771,35.37,20.684c9.076,21.103,20.783,53.551,22.866,84.414
    c3.015,44.685,4.369,67.283,4.678,72.55l0.072,0c0,0-0.012,0.205-0.036,0.616C875.017,600.41,875.028,600.615,875.028,600.615z
     M1076.667,778.326c-19.058,18.475-52.118,28.587-52.118,28.587s-5.445-1.167,0.778-3.695c1.837-0.747,28.781-12.252,48.811-28.393
    c7.331-5.908,41.811-51.534,43.755-49.978C1119.839,726.403,1095.725,759.851,1076.667,778.326z M1117.894,475.153
    c-1.945,1.556-36.424-44.07-43.755-49.978c-20.03-16.141-46.974-27.646-48.811-28.393c-6.223-2.528-0.778-3.695-0.778-3.695
    s33.06,10.112,52.118,28.587C1095.725,440.149,1119.839,473.597,1117.894,475.153z"
        style={{ fill: "rgb(255, 255, 255)" }}
      ></path>
    </svg>
  );
};
