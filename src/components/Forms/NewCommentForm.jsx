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
      <form action={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="name">Your Name:</label>
          <input name="name" className={style.formInput} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="comment">Comment:</label>
          <textarea name="comment" className={style.formInput} />
        </div>
        <button type="submit" className={style.formButton}>
          Submit
        </button>
      </form>
    </>
  );
}
