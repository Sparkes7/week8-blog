import { db } from "@/utils/dbConnection";
import style from "./NewCommentForm.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewCommentForm({ blogid }) {
  console.log(`params: ${blogid}`);
  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      post_id: blogid,
    };
    console.log(formValues);
    db.query(
      `INSERT INTO comments (name, comment, post_id) VALUES ($1, $2, $3)`,
      [formValues.name, formValues.comment, formValues.post_id]
    );
    revalidatePath(`/blog/${blogid}`);
    redirect(`/blog/${blogid}`);
  }
  return (
    <>
      <form action={handleSubmit}>
        <fieldset>
          <legend>New Comment</legend>
          <div className={style.form}>
            <label htmlFor="name">Your Name:</label>
            <input name="name" />
          </div>
          <div className={style.form}>
            <label htmlFor="comment">Comment:</label>
            <textarea name="comment" />
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
