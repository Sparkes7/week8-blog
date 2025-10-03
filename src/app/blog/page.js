import { db } from "../../utils/dbConnection";
import Link from "next/link";
import style from "./blog.module.css";

export default async function Blog({ searchParams }) {
  const params = await searchParams;
  console.log(params);
  const query = await db.query(
    `SELECT posts.id, posts.title, posts.content, posts.category_id, categories.name AS "cat_name" FROM posts JOIN categories ON posts.category_id = categories.id ORDER BY posts.id DESC`
  );
  //console.log(query.rows);
  const posts = query.rows;
  //console.log(posts);

  function handleChange() {
    "use client";
  }

  if (params.sort === "asc") {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (params.sort === "desc") {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <>
      <div className={`splash bg-blue-700`}>Blog</div>
      <div className={style.newPostDiv}>
        <div className={style.filters}>
          <span>Sort:</span>
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
                <span className={`${style.postHeadingCategory}`}>
                  {`${post.cat_name.toUpperCase()}`}
                </span>
              </div>
              <div className="post-preview">
                <p>
                  {`${post.content.slice(0, 200)}... `}
                  <Link href={`/blog/${post.id}`} className={style.readMore}>
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
