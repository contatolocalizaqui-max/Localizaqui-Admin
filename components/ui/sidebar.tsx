
import { cn } from "../../utils/cn";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from '../icons/MenuIcon';
import { XIcon } from '../icons/XIcon';
import { SparklesIcon } from "../icons/SparklesIcon";
import { LoadingSpinner } from "../icons/LoadingSpinner";

interface Link {
  label: string;
  onClick: () => void;
  icon: React.JSX.Element | React.ReactNode;
  isLoading?: boolean;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// FIX: Changed to React.FC to correctly type the component and its props, including `children`.
export const Sidebar: React.FC<{
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}> = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};


export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      {/* 
        FIX: The props for motion.div are not directly compatible with props for a standard div.
        This can cause a TypeScript error with stricter type checking.
        Casting to 'unknown' first is the recommended way to handle this intentional type conversion.
      */}
      <MobileSidebar {...(props as unknown as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-2 py-4 hidden md:flex md:flex-col bg-[#111111] w-[288px] flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "288px" : "72px") : "288px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-16 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-black/80 backdrop-blur-sm w-full border-b border-gray-800 sticky top-0 z-20"
        )}
        {...props}
      >
        <a href="#" className="flex items-center space-x-2">
            <SparklesIcon className="w-6 h-6 text-[#20FF82]"/>
            <span className="font-bold text-xl flex items-center">
                <span className="text-[#20FF82]">localiz</span>
                <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                <span className="text-[#9333ea]">qui</span>
            </span>
        </a>
        <div className="flex justify-end z-20">
          <MenuIcon
            className="text-gray-400 cursor-pointer w-6 h-6"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-[#111111] p-4 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-4 top-5 z-50 text-gray-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <XIcon className="w-6 h-6" />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// FIX: Changed to React.FC to correctly type the component, which implicitly handles the `key` prop.
export const SidebarLink: React.FC<{
  link: Link;
  className?: string;
}> = ({
  link,
  className,
}) => {
  const { open, animate } = useSidebar();
  return (
    <button
      onClick={link.onClick}
      disabled={link.isLoading}
      className={cn(
        "flex items-center justify-start gap-4 group/sidebar py-2.5 px-3 rounded-lg hover:bg-gray-800 w-full transition-colors",
        link.isLoading && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {link.isLoading ? (
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0"><LoadingSpinner className="w-5 h-5" /></div>
      ) : link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-gray-300 group-hover/sidebar:text-white text-sm font-medium transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </button>
  );
};