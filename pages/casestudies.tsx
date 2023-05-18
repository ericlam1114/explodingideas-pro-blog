import React, { useState, useEffect } from "react";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Image from "next/image";
import Link from "next/link";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = Array.from(
      new Set(
        posts.flatMap((post) =>
          post.categories.map((category) => category.title)
        )
      )
    );
    const filteredCategories = categories.filter(
      (category) => category.toLowerCase() !== "research"
    );
    setAllCategories(filteredCategories);
  }, [posts]);

  const sortPosts = (posts: Post[]) => {
    switch (sortOption) {
      case "newest":
        return [...posts].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      case "oldest":
        return [...posts].sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
      case "alphabetical":
        return [...posts].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return posts;
    }
  };

  const filteredAndSortedPosts = sortPosts(
    posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filter.toLowerCase()) &&
        selectedCategories.every((cat) =>
          post.categories.map((category) => category.title).includes(cat)
        )
    )
  );

  return (
    <div>
      <Head>
        <title>Explodingideas Pro</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        <Header />

        <h2 className="flex justify-center  gap-8 uppercase text-xl pt-8">
          Case Studies
        </h2>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-4 py-2 my-4 text-lg text-gray-700 bg-white shadow rounded-md focus:outline-none focus:shadow-outline"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-4 py-2 my-4 text-lg text-gray-700 bg-white shadow rounded-md focus:outline-none focus:shadow-outline"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>

        {allCategories.map((category, index) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={selectedCategories.includes(category)}
              onChange={() =>
                setSelectedCategories((currentCategories) =>
                  currentCategories.includes(category)
                    ? currentCategories.filter((cat) => cat !== category)
                    : [...currentCategories, category]
                )
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor={`checkbox-${index}`} className="ml-2 text-gray-700">
              {category}
            </label>
          </div>
        ))}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {filteredAndSortedPosts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="flex justify-between items-center px-4 py-1 ">
                <p className="font-semibold">{post.title}</p>
              </div>
              <div className=" border-opacity-40 rounded-md group">
                <div className="flex justify-center  w-full overflow-hidden"></div>
                <div
                  className="border-opacity-40 rounded-md group"
                  style={{
                    width: "auto",
                    height: "240px",
                    position: "relative",
                  }}
                >
                  <Image
                    className="rounded-sm shadow-lg border-4 border-gray w-full duration-300 "
                    src={urlFor(post.mainImage).url()!}
                    alt={post.title}
                    // width={500}
                    // height={500}
                    sizes="(max-width: 600px) 100vw, 600px"
                    fill={true}
                    priority={true}
                  />
                </div>

                <div className="h-2/5 w-full flex flex-col justify-center"></div>
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
  const query = `*[_type == "post" && "e71fc20e-f8a9-4604-ae2b-eed49b8a2eae" in categories[]._ref]{
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    categories[]->,
    "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
       title,
       slug
     }
  }
  `;
  try {
    const posts = await sanityClient.fetch(query);
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
