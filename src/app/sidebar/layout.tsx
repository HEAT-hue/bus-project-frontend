// components/Layout.js
import Sidebar from './page';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar className="lg:block lg:w-64 w-full" />
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-grow p-4">
          {/* {children} */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
