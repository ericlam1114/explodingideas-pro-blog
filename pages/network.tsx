import React, { useState } from "react";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <Head>
        <title>Explodingideas Pro</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        <Header />

        <h2 className="flex justify-center  gap-8 uppercase text-xl pt-8">
          Network
        </h2>
        {/* Add a search bar */}
        {/* <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search articles..."
          className="w-2/3 mx-auto px-4 py-2 my-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow focus:outline-none"
          style={{ fontSize: "1.2rem" }}
        /> */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          <div className="border border-gray-200 p-4 rounded-md shadow-lg">
            Contacts: Crypto Venture Capital
          </div>
          <div className="border border-gray-200 p-4 rounded-md shadow-lg">
          Contacts: Traditional Venture Capital
          </div>
          <div className="border border-gray-200 p-4 rounded-md shadow-lg">
            Publications: Crypto Journalists
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
