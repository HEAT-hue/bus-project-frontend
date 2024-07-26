'use client';
import Image from "next/image"
import { Parser } from 'json2csv';

type ExportProp = {
    data: {
        [key: string]: any
    }
}

const ExportData: React.FC<ExportProp> = ({ data }) => {

    const downloadCSV = () => {
        const parser = new Parser();
        const csv = parser.parse(data);

        // Create a blob with the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute with a filename
        link.download = 'data.csv';

        // Create a URL for the blob and set it as the href attribute
        link.href = window.URL.createObjectURL(blob);

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };
    return (
        <div
            className="flex rounded hover:scale-105 font-Gilroy-SemiBold duration-300 flex-row gap-3 py-2 px-[20px] text-xs text-white bg-[#005A86] justify-between items-center cursor-pointer"
            onClick={downloadCSV}
        >
            <span> Export </span>
            <Image src={"/export.png"} width={18} height={18} className="w-4 h-4" alt="export" />
        </div>
    )
}
export default ExportData