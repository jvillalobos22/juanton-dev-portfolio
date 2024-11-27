import Link from "next/link";

function BlogIndex({ posts }) {
  return (
    <section>
      {posts.map((post) => (
        <article key={post}>
          <Link href={`blog/${post}`}>{post}</Link>
        </article>
      ))}
    </section>
  );
}

export default BlogIndex;
