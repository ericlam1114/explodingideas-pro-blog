import React, { useState } from 'react';
import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import Banner from '../components/Banner';
import BannerBottom from '../components/BannerBottom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const [filter, setFilter] = useState('');

  // filter posts based on the filter state
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>Explodingideas Pro</title>
        <link rel='icon' href='/smallLogo.ico' />
      </Head>

      <main className='font-bodyFont'>
        <Header />

        <h2 className='flex justify-center  gap-8 uppercase text-xl pt-8'>
          Research Database
        </h2>
        {/* Add a search bar */}
        <input
          type='text'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='Search articles...'
          className='w-full px-3 py-2 my-4 text-lg text-gray-700 bg-gray-200 rounded-md focus:outline-none'
        />

        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6'>
          {filteredPosts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='flex justify-between items-center px-4 py-1 '>
                <p className='font-semibold'>{post.title}</p>
              </div>
              <div className=' border-opacity-40 rounded-md group'>
                <div className='flex justify-center  w-full overflow-hidden'></div>
                <Image
                  className='rounded-sm shadow-lg border-4 border-gray w-full  object-cover duration-300 '
                  src={urlFor(post.mainImage).url()!}
                  alt={post.title}
                  width={380}
                  height={350}
                />

                <div className='h-2/5 w-full flex flex-col justify-center'></div>
              </div>
            </Link>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title, 
    author -> {
      name,
      image
    },
    description, 
    mainImage, 
    slug
  }`;
  try {
    const posts = await sanityClient.fetch(query);
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
