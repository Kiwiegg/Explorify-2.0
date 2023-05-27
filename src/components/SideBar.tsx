import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideBar = () => {
    const menu = [
        { name: "Home", link: "/", icon: HiMenuAlt3 },
        { name: "Explore", link: "/explore", icon: HiMenuAlt3 },
        { name: "Music Tinder", link: "/tinder", icon: HiMenuAlt3 },
        { name: "About", link: "/about", icon: HiMenuAlt3 },
    ];

    const [open, setOpen] = useState(true);

    return (
        <div
            className={`bg-[var(--text-primary)] ${
                open ? "w-72" : "w-16"
            } min-h-screen text-gray-100 px-5 duration-500 shadow-xl`}
        >
            <div className="flex justify-end py-4">
                <HiMenuAlt3
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="flex flex-col gap-5 mt-4 relative">
                {menu?.map((menu, i) => (
                    <Link
                        key={i}
                        to={menu?.link}
                        className="flex gap-6 items-center font-medium p-2 hover:bg-gray-800 rounded-md text-lg"
                    >
                        <div className="peer">
                            {React.createElement(menu.icon, { size: "20" })}
                        </div>
                        <h2
                            className={`${
                                !open &&
                                "opacity-0 translate-x-28 overflow-hidden"
                            } duration-500`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={` ${
                                !open && "peer-hover:opacity-100"
                            } absolute left-16 bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg 
                            px-2.5 py-0.5 opacity-0 duration-150 pointer-events-none`}
                        >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
