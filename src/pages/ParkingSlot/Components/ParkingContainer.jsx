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
    return { ...parqueo, estaReservado };
  });
  const { parqueosReservables, parqueosNoReservables } =
    getParqueos(formatedParqueos);

  const noParqueosReservables = parqueosReservables.length;
  const noParqueosNoReservables = parqueosNoReservables.length;

  return (
    <div className="flex gap-[150px] w-max mx-auto mt-10  border-[#40454c] rounded-md">
      <div className="grid h-full grid-rows-4 gap-0">
        {parqueosReservables.map((parqueo, i) => (
          <ParkingSlot
            handleReservar={handleReservar}
            key={parqueo.numeroParqueo}
            isAvailable={true}
            parqueo={parqueo}
            isTheLast={i === noParqueosReservables - 1}
          />
        ))}
      </div>

      <div className="w-56 border-4 border-dotted border-[#40454c]"></div>

      <div className="grid h-full grid-rows-4 gap-0">
        {parqueosNoReservables.map((parqueo, i) => (
          <ParkingSlotReverse
            handleReservar={handleReservar}
            key={parqueo.numeroParqueo}
            isAvailable={true}
            parqueo={parqueo}
            isTheLast={i === noParqueosNoReservables - 1}
          />
        ))}
      </div>
    </div>
  );
};

const ParkingSlot = ({ isTheLast, isAvailable, parqueo, handleReservar }) => {
  const { numeroParqueo, estaReservado } = parqueo;
  const boderB = isTheLast ? "border-b-4" : "";

  return (
    <div
      onClick={() => {
        if (!estaReservado) {
          handleReservar(parqueo.id, parqueo.sePuedeReservar);
        }
      }}
      className={`relative cursor-pointer justify-end flex w-56 border-[#40454c] h-28 border-t-4  ${boderB}`}
    >
      <div className="w-10 border-r-4 border-[#40454c] h-auto "></div>

      {!isAvailable ? (
        <div className="grid w-full place-items-center">
          <img src="/public/car.svg" alt="nose" className="w-[125px] " />
        </div>
      ) : (
        <div className="grid w-full place-items-center">
          <p className="text-[#a2a4ab] text-lg">
            {estaReservado ? "Reservado" : "Disponible"}
          </p>
        </div>
      )}

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
}) => {
  const { numeroParqueo, estaReservado } = parqueo;

  const boderB = isTheLast ? "border-b-4" : "";
  return (
    <div
      onClick={() => {
        if (!estaReservado) {
          handleReservar(parqueo.id, parqueo.sePuedeReservar);
        }
      }}
      className={`relative cursor-pointer justify-end flex w-56 border-[#40454c] h-28 border-t-4  ${boderB}`}
    >
      {!isAvailable ? (
        <div className="grid w-full place-items-center">
          <img src="/public/car.svg" alt="nose" className="w-[125px] " />
        </div>
      ) : (
        <div className="grid w-full place-items-center">
          <p className="text-[#a2a4ab] text-lg">
            {estaReservado ? "Reservado" : "Disponible"}
          </p>
        </div>
      )}

      <p className="text-[#a2a4ab] font-bold text-lg absolute bottom-0 left-0 ">
        {numeroParqueo}
      </p>
      <div className="w-10 border-l-4 border-[#40454c] h-auto "></div>
    </div>
  );
};

export default ParkingContainer;
