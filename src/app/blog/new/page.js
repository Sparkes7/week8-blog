import { db } from "@/utils/dbConnection.js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import style from "./newpost.module.css";
import Link from "next/link";

export default async function NewPost() {
  async function handleSubmit(formData) {
    "use server";
    console.log(formData);

    const formValues = {
      title: formData.get("title"),
      content: formData.get("content"),
      category_id: formData.get("category_id"),
      url: formData.get("url"),
    };

    db.query(
      `INSERT INTO posts (title, content, category_id, url, created) VALUES ($1, $2, $3, $4, $5)`,
      [
        formValues.title,
        formValues.content,
        formValues.category_id,
        formValues.url,
        Date.now(),
      ]
    );

    revalidatePath("/blog");
    redirect("/blog");
  }

  const categoriesResponse = await db.query(`SELECT * FROM categories`);
  const categories = categoriesResponse.rows;

  return (
    <>
      <div className={`splash bg-blue-700`}>New Blog Post</div>
      <div className={style.backToBlogDiv}>
        <Link href="/blog" className={style.backToBlogBtn}>
          Back To Posts
        </Link>
      </div>
      <form action={handleSubmit} className={style.form}>
        <fieldset className="flex flex-col gap-6">
          <legend className="text-center text-2xl">Create A New Post</legend>
          <div className={style.formGroup}>
            <label htmlFor="title">
              Title: <span className="text-red-600">*</span>
            </label>
            <input
              name="title"
              className="border-black border-1 p-[0.5ex]"
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="content">
              Content: <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              className="border-black border-1 p-[0.5ex]"
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="url">Image Link:</label>
            <input name="url" className="border-black border-1 p-[0.5ex]" />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="category_id">
              Category: <span className="text-red-600">*</span>
            </label>
            <select
              name="category_id"
              className="border-black border-1 p-[0.5ex]"
              required
            >
              <option value="">-Select Category-</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} name="category_id" value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit" className={style.formButton}>
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
