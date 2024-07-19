'use client';

import { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'dashboard.svg' },
  { name: 'Staff Management', href: '/staff', icon: 'staff-management.svg' },
  { name: 'Check-In Management', href: '/checkin', icon: 'check-in-management.svg' },
  { name: 'Route Management', href: '/route', icon: 'route-management.svg' },
  { name: 'Bus Management', href: '/bus', icon: 'bus-management.svg' },
  { name: 'Report', href: '/report', icon: 'report.svg' },
  { name: 'User Management', href: '/user', icon: 'user-management.svg' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="lg:hidden p-4 bg-ecobankTeal">
        <button onClick={toggleSidebar}>
          <img src='sandwich.svg' alt="menu icon"/>
        </button>
      </div>
      <div
        className={`bg-ecobankTeal text-white h-screen lg:static lg:w-72 fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 lg:translate-x-0`}
      >
        <div className="p-1 flex flex-col justify-between h-full">
          <div className='p-3'>
            <div className="flex justify-center">
              <p className="text-white text-[2.3rem] text-center border-b-[5px] border-b-ecobankGreen w-max font-Aladin-Regular leading-none  m-[8vh]">Kiti</p>
            </div>
            <nav className='font-Gilroy-Regular'>
              <ul className="space-y-5">
                {navigation.map((item) => (
                  <li key={item.name} className="flex items-center space-x-4">
                    <Link
                      href={item.href}
                      className={classNames(
                        pathname === item.href ? 'text-white font-bold' : 'text-gray-400 group hover:text-white hover:font-bold whitespace-nowrap transition-all duration-300',
                        'flex items-center space-x-4'
                      )}
                    >
                      <div className="w-6 h-6 flex justify-center items-center group-hover:text-white">
                        <img src={item.icon} alt={item.name} className='mr-2 transition-colors duration-300 ease-in-out group-hover:fill-current hover:text-white group-hover:text-white' />
                      </div>
                      <span className='group-hover:text-white'>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="space-y-[10vh] mb-[12vh] sm:mb-[5vh] p-3">
            {/* button for logout */}
            <button className="flex items-center space-x-2 group hover:text-white hover:font-bold transition-all duration-300">
              <div className="w-6 h-6 flex justify-center items-center group-hover:text-white">
                <img src="logout.svg" alt="Log Out" className='transition-colors duration-300 ease-in-out group-hover:fill-current group-hover:text-white' />
              </div>
              <span className='text-gray-400 font-Gilroy-Regular group-hover:text-white'>Log Out</span>
            </button>
            <div className="text-center text-xs font-Gilroy-Regular">
              <span>Powered by innovation</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
