import { db } from "../../utils/dbConnection";
import Link from "next/link";
import style from "./blog.module.css";

export default async function Blog({ searchParams }) {
  const params = await searchParams;
  const query = await db.query(
    `SELECT posts.id, posts.title, posts.content, posts.category_id, posts.created ,categories.name AS "cat_name" FROM posts JOIN categories ON posts.category_id = categories.id ORDER BY posts.id DESC`
  );
  //console.log(query.rows);
  const posts = query.rows;
  console.log(posts);

  //console.log(Date.now());

  if (params.sort === "asc") {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (params.sort === "desc") {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (params.sort === "newest") {
    posts.sort((a, b) => b.created.localeCompare(a.created));
  } else if (params.sort === "oldest") {
    posts.sort((a, b) => a.created.localeCompare(b.created));
  }

  return (
    <>
      <div className={`splash bg-blue-700`}>Blog</div>
      <div className={style.newPostDiv}>
        <div className={style.filters}>
          <span>Sort:</span>
          <Link href={`/blog?sort=newest`} className="hover:underline">
            Newest
          </Link>
          <Link href={`/blog?sort=oldest`} className="hover:underline">
            Oldest
          </Link>
          <Link href={`/blog?sort=asc`} className="hover:underline">
            Ascending
          </Link>
          <Link href={`/blog?sort=desc`} className="hover:underline">
            Descending
          </Link>
        </div>
        <Link href="/blog/new" className={style.newPostBtn}>
          New Post
        </Link>
      </div>

      <section className={style.postsSection}>
        {posts.map((post, i) => {
          return (
            <div key={i} className={style.post}>
              <div className={style.postHeading}>
                <Link href={`/blog/${post.id}`}>{` ${post.title} `}</Link>
                <span
                  className={`${style.postHeadingCategory} cat`}
                >{`${post.cat_name.toUpperCase()}`}</span>
              </div>
              <div className="flex flex-col pt-3 gap-2">
                <p className="text-zinc-600 text-sm">
                  {`${post.content.slice(0, 280)}... `}
                  <Link href={`/blog/${post.id}`} className={style.readMore}>
                    Read More
                  </Link>
                </p>
                <span className="text-sm text-zinc-600">
                  Posted: {new Date(Number(post.created)).toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
