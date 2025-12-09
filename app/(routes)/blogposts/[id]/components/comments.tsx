"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../../../button";

type commentForm = {
  name: string;
  content: string;
};

type Comment = {
  id: number;
  blogpostId: number;
  name: string;
  content: string;
  date: string;
};

export default function Comments({ postId, initialComments = [] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<commentForm>();

  const onSubmit = async (data: commentForm) => {
    const tempId = Date.now();

    // Midlertidigt comment til UI
    const tempComment: Comment = {
      id: tempId,
      blogpostId: postId,
      name: data.name,
      content: data.content,
      date: new Date().toISOString().slice(0, 10),
    };

    setComments((prev) => [...prev, tempComment]); // tilføj i bunden
    reset();

    // Send til serveren uden id
    const res = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogpostId: postId,
        name: data.name,
        content: data.content,
        date: tempComment.date,
      }),
    });
    const created = await res.json();

    // Opdater comment med det rigtige ID fra serveren
    setComments((prev) => prev.map((c) => (c.id === tempId ? created : c)));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10">
      {/* Live update af comments */}
      <div className="mt-6 flex flex-col gap-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2">
            <strong>{comment.name}</strong>
            <span className="text-(--pink)">{comment.date}</span>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <input {...register("name", { required: "Name is required" })} placeholder="Your name" className="p-3 bg-black/20 border border-white placeholder-white" />

      {errors.name?.message && <div className="text-white">{errors.name.message}</div>}

      <textarea {...register("content", { required: "Comment is required" })} placeholder="Write a comment..." className="p-3 placeholder-white bg-black/20 border border-white h-32" />

      {errors.content?.message && <div className="text-white">{errors.content.message}</div>}

      <div className="flex justify-end">
        <Button text="Submit" />
      </div>
    </form>
  );
}
