import React, { useState } from "react";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from 'next/link'

export default function Home() {
  const [filter, setFilter] = useState("");

  // Dummy book data for illustration
  const books = [
    {title: 'How to Validate Your Idea', author: 'Explodingideas', img: '/images/book1.jpg', description: 'A short description about this book', price: '$20.00'},
    //... other books
  ]

  return (
    <div>
      <Head>
        <title>Explodingideas Pro</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        <Header />

        <h2 className="flex justify-center  gap-8 uppercase text-xl pt-8">
          Startup Library
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {books.map((book) => (
            <Link key={book.title} href="/books/howtovalidateyouridea">
              <div className="border border-gray-200 p-4 rounded-md shadow-lg cursor-pointer"> 
                  <img src={book.img} alt={book.title} className="w-full h-64 object-cover rounded" />
                  <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-500">By {book.author}</p>
                  <p className="mt-2 text-sm">{book.description}</p>
                  <div className="mt-3">
                    <span className="text-lg font-semibold">{book.price}</span>
                  </div>
              </div>
            </Link>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}
