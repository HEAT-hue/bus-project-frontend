'use client'
const Navigation: React.FC = () => {
    return (
        <nav className=" bg-white sm:bg-ecobankBlue sm:sp-4 h-[62px] sm:flex sm:items-center sm:justify-between">
            <div className="flHeaderex justify-center h-screen mt-12 sm:hidden">
                <div className="text-ecobankBlue text-[3rem] font-bold ml-8">
                    <a href="/">
                        <p className="text-ecobankBlue text-[3rem] text-center border-b-[6px] border-b-ecobankGreen w-max font-Aladin-Regular leading-none">Kiti</p>
                    </a>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-x-4">
                {/* Notification */}
                <div className="relative">
                    <span className="text-white text-xl cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                        </svg>
                    </span>
                </div>

                {/* Avatar and Name */}
                <div className="flex items-center space-x-2 mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-person-circle text-white"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <span className="text-white text-sm font-Ala">John Doe</span>
                </div>
            </div>

        </nav>
    );
};

export default Navigation;