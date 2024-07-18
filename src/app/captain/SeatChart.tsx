/* eslint-disable @next/next/no-img-element */
import "./page.css";
import React, { useState, useEffect } from "react";

const ExportData = [
  { name: 'Joyce Orimolowo', seat: '8C' },
  { name: 'Sarah Eze', seat: '2C' },
  { name: 'Eremosele Eze', seat: '4C' },
  { name: 'Bamidele Lawal', seat: '6C' },
  { name: 'Femi Johnson', seat: '4F' },
  { name: 'Joy Joseph', seat: '2A' },
  { name: 'Faith Adebayo', seat: '2F' },
  { name: 'Sandra Eze', seat: '3A' },
  { name: 'Kingsley Okonkwo', seat: '3B' },
  { name: 'Funke Akindele', seat: '4A' },
  { name: 'Bimpe Balogun', seat: '1C' },
  { name: 'Harold Danladi', seat: '3C' },
  { name: 'Na’ima Aliu', seat: '5C' },
  { name: 'Christiana Lawrence', seat: '7C' },
  { name: 'Timothy Peters', seat: '2B' },
  { name: 'Ade Bolarinwa', seat: '5B' },
  { name: 'Dolapo Kazeem', seat: '5A' },
  { name: 'Patience Akubueze', seat: '3F' },
  { name: 'Toyin Abraham', seat: '4B' },
  { name: 'Shalom Sahara', seat: '8B' }
];

const SeatChart = ({ handleAllChecked }: any) => {
  const [checkedInputs, setCheckedInputs] = useState<boolean[]>(new Array(ExportData.length).fill(false));

  const handleInputChange = (index: number) => {
    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs[index] = !newCheckedInputs[index];
    setCheckedInputs(newCheckedInputs);

    //  // Update checkedInputs when ExportData changes
    //  useEffect(() => {
    //     setCheckedInputs(new Array(ExportData.length).fill(false));
    //   }, [ExportData]);

    // Call handleAllChecked function to check if all are checked
    handleAllChecked(newCheckedInputs.every((isChecked) => isChecked));

  };
  return (
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between mb-[10%] mt-[8vh]" >
      <div className="w-full sm:w-1/2">
        <table className="sm:w-[80%] w-[100%] text-left">
          <thead id='first-thead'>
            <tr>
              <th className='font-Gilroy-Bold text-sm'>Name</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Seat</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
            </tr>
          </thead>
          <tbody>
            {ExportData.slice(0, 10).map((item, index) => (
              <tr key={index} className="border-b ">
                <td className='pt-4 font-Gilroy-Regular text-sm'>{item.name}</td>
                <td className="font-Gilroy-SemiBold text-center pt-4 text-sm">{item.seat}</td>
                <td className='text-center pt-4'>
                  <div className="flex justify-center">
                    <img
                      src={checkedInputs[index] ? 'checked.svg' : 'unchecked.svg'}

                      alt={checkedInputs[index] ? 'Checked' : 'Unchecked'}
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => handleInputChange(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full sm:w-1/2 flex justify-normal sm:justify-end">
        <table className="sm:w-[80%] w-[100%] text-left justify-end">
          <thead id="second-thead">
            <tr>
              <th className='font-Gilroy-Bold text-sm'>Name</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Seat</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
            </tr>
          </thead>
          <tbody>
            {ExportData.slice(10).map((item, index) => (
              <tr key={index + 10} className="border-b">
                <td className='pt-4 font-Gilroy-Regular text-sm' id="tablename">{item.name}</td>
                <td className="font-Gilroy-SemiBold text-center pt-4 text-sm" id="tableseat">{item.seat}</td>
                <td className='text-center pt-4  ' id="tablestatus">
                  <div className="flex justify-center">
                    <img
                      src={checkedInputs[index + 10] ? 'checked.svg' : 'unchecked.svg'}

                      alt={checkedInputs[index + 10] ? 'Checked' : 'Unchecked'}
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => handleInputChange(index + 10)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatChart;
