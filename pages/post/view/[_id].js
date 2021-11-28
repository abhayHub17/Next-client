import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>NEXT - A social media network</title>
      <meta name="description" content={post.content} />
      <meta property="og:description" content="A social media network" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NEXT" />
      <meta
        property="og:url"
        content={`http://NEXT.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <div className="container ">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`); //ctx = context
  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
