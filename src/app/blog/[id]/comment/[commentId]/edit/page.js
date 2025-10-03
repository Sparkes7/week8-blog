import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editComment({ params }) {
  const myParams = await params;

  const response = await db.query(`SELECT * FROM comments WHERE id = $1`, [
    myParams.commentId,
  ]);

  const comment = await response.rows[0];

  async function updateComment(formData) {
    "use server";
    const formValues = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      post_id: myParams.id,
    };

    console.log(formValues);

    db.query(
      `UPDATE comments SET name = $1, comment = $2, post_id = $3 WHERE id = $4`,
      [
        formValues.name,
        formValues.comment,
        formValues.post_id,
        myParams.commentId,
      ]
    );
    console.log;
    revalidatePath(`/blog/${myParams.id}/comment/${myParams.commentId}/edit`);
    redirect(`/blog/${myParams.id}`);
  }

  return (
    <>
      <div className={`splash bg-blue-700 mb-5`}>Edit Comment</div>
      <form
        action={updateComment}
        className="w-[80%] m-auto flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <label className="font-bold">
            User: <span className="text-red-500 font-light">*</span>
          </label>
          <input
            name="name"
            defaultValue={comment.name}
            className="border-1 border-black p-[0.5ex]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">
            Comment: <span className="text-red-500 font-light">*</span>
          </label>
          <textarea
            name="comment"
            defaultValue={comment.comment}
            className="border-1 border-black p-[0.5ex]"
            required
          />
        </div>
        <button
          type="submit"
          className="border-1 border-black  p-2 rounded-xl bg-blue-700 hover:bg-blue-500 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}
