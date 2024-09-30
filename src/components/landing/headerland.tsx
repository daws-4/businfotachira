const routes = [
    { name: "Home", href: "#", isActive: true },
    { name: "Services", href: "#", isActive: false },
    { name: "Why us?", href: "#", isActive: false },
    { name: "How It Works", href: "#", isActive: false },
    { name: "Features", href: "#", isActive: false },
    { name: "Testimonials", href: "#", isActive: false },
];

import Link from 'next/link';
import PropTypes from 'prop-types';

const NavMenu = ({ routes }: { routes: { name: string, href: string, isActive: boolean }[] }) => (
    <ul
        className="flex flex-col lg:flex-row justify-center items-center text-3xl gap-6 lg:text-base lg:gap-2 absolute h-screen w-screen top-0 left-full lg:left-0 lg:relative lg:h-auto lg:w-auto bg-white dark:bg-[#0b1727] lg:bg-transparent"
        id="navbar"
    >
        {routes.map((route, i) => (
            <li key={i}>
                <a
                    className={`px-4 ${route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                        }`}
                    href={route.href}
                >
                    {route.name}
                </a>
            </li>
        ))}
    </ul>
);

NavMenu.propTypes = {
    routes: PropTypes.array.isRequired,
};

const HeaderLand = () => {
    return (
        <header className="tsicky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <nav className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="container px-4">
                    <div className="flex justify-between items-center">
                        <Link className="font-black text-3xl" href="#!">
                            {" "}
                            Easy Frontend{" "}
                        </Link>
                        <button
                            className="block lg:hidden cursor-pointer h-10 z-20"
                            type="button"
                            id="hamburger"
                        >
                            <div className="h-0.5 w-7 bg-black dark:bg-white -translate-y-2" />
                            <div className="h-0.5 w-7 bg-black dark:bg-white" />
                            <div className="h-0.5 w-7 bg-black dark:bg-white translate-y-2" />
                        </button>
                        <NavMenu routes={routes} />
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default HeaderLand;