"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = { name: string; content: string };

export default function Comments({ postId }: { postId: number }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId, // <-- kun denne!
        name: data.name,
        content: data.content,
        date: new Date().toISOString().slice(0, 10),
      }),
    });

    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10">
      <input
        {...register("name", {
          required: "Name is required",
          validate: (v) => /\p{L}{2,}/u.test(v.trim()) || "Name must be at least 2 letters",
        })}
        placeholder="Your name"
        className="p-3 bg-black/20 border border-white/20 rounded"
      />
      {errors.name?.message && <div className="text-white">{errors.name.message}</div>}

      <textarea {...register("content", { required: "Comment is required" })} placeholder="Write a comment..." className="p-3 bg-black/20 border border-white/20 rounded h-32" />
      {errors.content?.message && <div className="text-white">{errors.content.message}</div>}

      <button className="border border-white py-2 rounded">Submit</button>
    </form>
  );
}
