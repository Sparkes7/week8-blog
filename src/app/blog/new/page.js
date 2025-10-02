import { db } from "@/utils/dbConnection.js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
      `INSERT INTO posts (title, content, category_id, url) VALUES ($1, $2, $3, $4)`,
      [
        formValues.title,
        formValues.content,
        formValues.category_id,
        formValues.url,
      ]
    );

    revalidatePath("/blog");
    redirect("/blog");
  }

  const categoriesResponse = await db.query(`SELECT * FROM categories`);
  const categories = categoriesResponse.rows;

  return (
    <>
      <form action={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>
          <div>
            <label htmlFor="title">Title:</label>
            <input name="title" className="border-black border-1" />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea name="content" className="border-black border-1" />
          </div>
          <div>
            <label htmlFor="url">Link:</label>
            <input name="url" className="border-black border-1" />
          </div>
          <div>
            <select name="category_id">
              {categories.map((cat) => {
                return (
                  <option key={cat.id} name="category_id" value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}
