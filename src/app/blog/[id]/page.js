import { db } from "@/utils/dbConnection";
import Image from "next/image";
import NewCommentForm from "@/components/Forms/NewCommentForm";
import style from "./blogpage.module.css";
import { revalidatePath } from "next/cache";
import Link from "next/link";

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

  async function DeleteComment(formData) {
    "use server";
    const id = formData.get("id");
    console.log(id);
    db.query(`DELETE FROM comments WHERE id = $1`, [id]);

    revalidatePath(`/blog/${myParams.id}`);
  }

  return (
    <>
      <div className={`splash bg-blue-700`}>{`Blog Post`}</div>
      <div className={style.backToBlogDiv}>
        <Link href={`/blog/${myParams.id}/edit`} className={style.editBtn}>
          Edit Post
        </Link>
        <Link href="/blog" className={style.backToBlogBtn}>
          Back To Posts
        </Link>
      </div>
      <div className={style.contentContainer}>
        <h2 className="text-3xl font-bold">{postsData.title}</h2>
        <p className="text-zinc-600">{postsData.content}</p>
        {postsData.url ? (
          <Image
            src={postsData.url}
            alt={postsData.title}
            width={800}
            height={250}
            draggable={false}
          />
        ) : null}
      </div>

      <div className={style.newCommentContainer}>
        <h3>Comments:</h3>
        {commentsData && commentsData.length > 0 ? (
          commentsData.map((comment) => {
            return (
              <div key={comment.id} className={style.commentContainer}>
                <div className="flex flex-row align-center">
                  <Link
                    href={`/blog/${myParams.id}/comment/${comment.id}/edit`}
                    className={style.editCommentBtn}
                  >
                    Edit
                  </Link>
                  <div>
                    <p>User: {comment.name}</p>
                    <p>Comment: {comment.comment}</p>
                  </div>
                </div>

                <div>
                  <form action={DeleteComment}>
                    {/* ADDING THIS HIDDEN INPUT TO PASS THE COMMENT ID FEELS CHEAP, BUT IT WORKS I GUESS? #PROBLEMSOLVING */}
                    <input
                      name="id"
                      defaultValue={comment.id}
                      readOnly
                      hidden
                    />
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
