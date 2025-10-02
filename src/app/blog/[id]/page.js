import { db } from "@/app/utils/dbConnection";
import Image from "next/image";

export default async function BlogPost({ params }) {
  const myParams = await params;
  const postsResponse = await db.query(
    `SELECT posts.title, posts.content, posts.url FROM posts WHERE posts.id = $1`,
    [myParams.id]
  );
  const postsData = postsResponse.rows[0];
  const commentsResponse = await db.query(
    `SELECT comments.id, comments.name, comments.comment FROM comments WHERE comments.post_id = $1`,
    [myParams.id]
  );
  const commentsData = commentsResponse.rows;
  console.log(commentsData);

  //const commentsPost

  return (
    <>
      <div>
        <h2>{postsData.title}</h2>
        <p>{postsData.content}</p>
        <Image
          src={postsData.url}
          alt={postsData.title}
          width={500}
          height={250}
        />
      </div>
      <div>
        comments:
        {commentsData.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
