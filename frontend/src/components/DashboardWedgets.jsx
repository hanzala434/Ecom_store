import React from 'react';

const DashboardWidgets = () => {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap md:flex-nowrap m-auto">
        <a
          href="/admin-orders"
          className="m-4 w-full border-2 border-black hover:bg-black rounded-lg hover:text-white flex justify-center items-center text-4xl shadow-2xl p-8 sm:mb-4 md:mb-0"
        >
          Orders
        </a>
        <a
          href="/admin-category"
          className="m-4 w-full border-2 border-black hover:bg-black rounded-lg hover:text-white flex justify-center items-center text-4xl shadow-2xl p-8 sm:mb-4 md:mb-0"
        >
          Categories
        </a>
      </div>
      <div className="flex flex-wrap md:flex-nowrap m-auto">
        <a
          href="/"
          className="m-4 w-full border-2 border-black hover:bg-black rounded-lg hover:text-white flex justify-center items-center text-4xl shadow-2xl p-8 sm:mb-4 md:mb-0"
        >
          Products
        </a>
        <a
          href="/"
          className="m-4 w-full border-2 border-black hover:bg-black rounded-lg hover:text-white flex justify-center items-center text-4xl shadow-2xl p-8 sm:mb-4 md:mb-0"
        >
          Payments
        </a>
      </div>
    </section>
  );
};

export default DashboardWidgets;
