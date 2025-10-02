import { db } from "@/utils/dbConnection";
import Image from "next/image";
import NewCommentForm from "@/components/Forms/NewCommentForm";
import style from "./blogpage.module.css";

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

  async function DeleteComment(id) {
    "use server";
    console.log(id);
    //db.query(`DELETE FROM comments WHERE id = $1`, [id]);
  }

  return (
    <>
      <div className={`splash bg-blue-700`}>{`Blog Post`}</div>

      <div className={style.contentContainer}>
        <h2>{postsData.title}</h2>
        <p>{postsData.content}</p>
        <Image
          src={postsData.url}
          alt={postsData.title}
          width={800}
          height={250}
        />
      </div>

      <div className={style.newCommentContainer}>
        {commentsData && commentsData.length > 0 ? (
          commentsData.map((comment) => {
            return (
              <div key={comment.id} className={style.commentContainer}>
                <div>
                  <p>User: {comment.name}</p>
                  <p>Comment: {comment.comment}</p>
                </div>
                <div>
                  <form action={DeleteComment}>
                    {/* FIGURE THIS OUT: HOW DO I PASS THE COMMENT ID INTO THIS FORM ACTION */}
                    <button type="submit" className={style.delCommentBtn}>
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        ) : (
          <p>Be the first to leave a comment!</p>
        )}
      </div>
      <div className={style.newCommentContainer}>
        <NewCommentForm blogid={myParams.id} />
      </div>
    </>
  );
}
