import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "@uidotdev/usehooks";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Modal = ({ modalState, toggleModal, children, desktopTitle }) => {
  const dekstop = useMediaQuery("(min-width: 768px)");

  const MODAL_DURATION = 0.5;

  const MODAL_MOBILE_INITIAL = { translateY: "100%" };
  const MODAL_MOBILE_ANIMATE = { translateY: "0%" };

  const MODAL_DESKTOP_ANIMATE = {
    translateX: "-50%",
    translateY: "-50%",
  };
  const MODAL_DESKTOP_INITIAL = {
    translateX: "-50%",
    translateY: "100%",
  };

  const MODAL_ANIMATE = dekstop ? MODAL_DESKTOP_ANIMATE : MODAL_MOBILE_ANIMATE;
  const MODAL_INITIAL = dekstop ? MODAL_DESKTOP_INITIAL : MODAL_MOBILE_INITIAL;

  return (
    <>
      <AnimatePresence mode="popLayout">
        {modalState && (
          <>
            <motion.div
              key={"background-modal"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: MODAL_DURATION }}
              className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black/50"
            ></motion.div>

            <motion.div
              key={"modal"}
              initial={MODAL_INITIAL}
              animate={MODAL_ANIMATE}
              exit={{
                translateY: "100%",
                opacity: 0,
                transition: { duration: MODAL_DURATION },
              }}
              transition={{ type: "spring", duration: MODAL_DURATION }}
              className={clsx(
                "bg-white  rounded-tl-2xl rounded-tr-2xl flex flex-col fixed bottom-0 left-0 right-0 z-50",
                "md:rounded-xl md:min-w-[450px] md:max-w-max md:max-h-max  md:top-1/2 md:left-1/2 md:botton-auto md:right-auto"
              )}
            >
              <div
                onClick={() => toggleModal(false)}
                className="flex justify-center w-full pt-3 pb-2 md:hidden"
              >
                <div className="h-2 bg-gray-300 rounded-md w-28"></div>
              </div>

              <div className="items-center justify-between hidden w-full gap-4 md:flex">
                <h3
                  className={clsx(
                    "text-xl font-bold md:p-4 md:text-2xl text-black"
                  )}
                >
                  {desktopTitle}
                </h3>
                <div
                  onClick={() => toggleModal(false)}
                  className="p-2 m-2 bg-gray-200 rounded-full cursor-pointer justify-self-end"
                >
                  <RxCross2 color="gray" />
                </div>
              </div>

              <div className="md:p-0 md:m-0">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const useModal = () => {
  const [modalState, toggleModal] = useState(false);
  return [Modal, { modalState, toggleModal }];
};
export { useModal };
