import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editBlog({ params }) {
  const myParams = await params;

  const blogData = await db.query(
    `SELECT posts.id, posts.title, posts.content, posts.category_id, posts.url, categories.name AS "cat_name" FROM posts JOIN categories ON posts.category_id = categories.id WHERE posts.id = $1`,
    [myParams.id]
  );
  const categoriesResponse = await db.query(`SELECT * FROM categories`);
  const blog = blogData.rows[0];
  console.log(categoriesResponse.rows);

  async function updatePost(formData) {
    "use server";
    const formValues = {
      title: formData.get("title"),
      content: formData.get("content"),
      url: formData.get("url"),
      category_id: formData.get("category_id"),
    };

    db.query(
      `UPDATE posts SET title = $1, content = $2, url = $3, category_id = $4 WHERE posts.id = $5`,
      [
        formValues.title,
        formValues.content,
        formValues.url,
        formValues.category_id,
        myParams.id,
      ]
    );

    revalidatePath(`/blog/${myParams.id}`);
    redirect(`/blog/${myParams.id}`);
  }

  return (
    <>
      <div className={`splash bg-blue-700 mb-5`}>Edit Post</div>
      <form action={updatePost} className="flex flex-col w-[80%] m-auto gap-5 ">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title: <span className="font-light text-red-600">*</span>
          </label>
          <input
            name="title"
            defaultValue={blog.title}
            className="border-1 border-black p-[0.5ex]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="font-bold">
            Content: <span className="font-light text-red-600">*</span>
          </label>
          <textarea
            name="content"
            defaultValue={blog.content}
            className="border-1 border-black p-[0.5ex]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="url" className="font-bold">
            Image Link:{" "}
            <sup className="font-light text-zinc-600 italic text-xs">
              optional
            </sup>
          </label>
          <input
            name="url"
            defaultValue={blog.url}
            className="border-1 border-black p-[0.5ex]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category_id" className="font-bold">
            Category: <span className="font-light text-red-600">*</span>
          </label>
          <select
            name="category_id"
            defaultValue={blog.category_id}
            className="border-1 border-black p-[0.5ex]"
            required
          >
            {categoriesResponse.rows.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
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
