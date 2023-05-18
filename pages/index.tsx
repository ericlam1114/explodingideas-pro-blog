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
  // console.log(posts);

  return (
    <div>
      <Head>
        <title>Explodingideas Pro</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        {/* <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div> */}
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}

        <h2 className="flex justify-center  gap-8 uppercase text-xl pt-8">
          Newest Ideas
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="flex justify-between items-center px-4 py-1 ">
                <p className="font-semibold">{post.title}</p>
              </div>
              <div className=" border-opacity-40 rounded-md group">
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
                

                <div className="h-2/5 w-full flex flex-col justify-center">
                  {/* <div className="flex justify-between items-center px-4 py-1 ">
                <p className="font-semibold">
                  {post.title}
                </p>
<img className="w-12 h-12 rounded-full object-cover"
src={urlFor(post.author.image).url()!} alt="authorImg"/>
</div> */}
                  {/* <p className="py-2 px-4 text-base">
   {post.description.substring(0,45)}...
</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title, 
    author -> {
      name,
      image
    },
    description, 
    mainImage, 
    slug,
    publishedAt
  }[0..5]`;  // This will limit to the top 6 posts.
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
