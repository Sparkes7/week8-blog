export default async function Comment({ params }) {
  const myParams = await params;
  console.log(myParams);
  return (
    <div>
      <h2>
        Post: {await myParams.id} Comment: {await myParams.commentId}
      </h2>
      <p>Get comment ID for this post ID</p>
    </div>
  );
}
