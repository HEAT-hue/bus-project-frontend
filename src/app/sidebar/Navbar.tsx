import React from "react";
const Navbar = () => {
    return (
      <div className="flex justify-between items-center p-4 border-[1.4px] sm:border-l-0 border-ecobankGreen h-[12vh] bg-white w-full">
        <div className="flex items-center space-x-4">
          <img src="logo-drk.png" alt="Ecobank Logo" className="w-[10vw] p-2 pr-[5.5vh] sm:pl-5" />
          <div>
            
          </div>
     
        </div>
        <div className="flex items-center md:mr-[0] sm:mr-[1vh] w-64">
         
          <div className="flex flex-row text-center items-center space-x-[1vh] sm:space-x-[2.5vh] pl-[7vh] whitespace-nowrap">
             <img src="profile-icon.svg" alt="User Icon" className="h-[5vh]" />
          <p className="text-gray-700 font-Gilroy-SemiBold">Tega Williams</p>
          </div>
         
        </div>
      </div>
    );
  };
  

  export default Navbar;