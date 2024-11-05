export const getComment = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comments"],
    },
  };
  const res = await fetch(`http://localhost:5000/api/a6/comment/${postId}`, {
    next: {
      tags: ["comments"],
    },
    cache: "no-store",
  });
  return res.json();
};
