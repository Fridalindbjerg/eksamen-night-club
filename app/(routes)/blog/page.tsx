import Link from "next/link";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const isEven = (n: number) => n % 2 === 0;

const Blogposts = async () => {
  "use server";

  const response = await fetch("http://localhost:4000/blogposts?_embed=comments&_limit=3");
  const posts = await response.json();

  return (
    <main
      className="
      col-[full-start/full-end]
      grid grid-cols-subgrid 
      my-8
    "
    >
      <h1 className="col-[content-start/content-end] text-3xl font-bold">De 3 nyeste blogposts</h1>

      {posts.map((post, i) => {
        const flip = !isEven(i);

        return (
          // article er subgrid af main/body grid
          <article
            key={post.id}
            className="
              col-[full-start/full-end]
              grid grid-cols-subgrid 
              
              items-start gap-y-20
            "
          >
            {/* BILLEDE */}
            <div
              className={`
              col-[full-start/full-end]
              md:row-start-1
              ${flip ? "md:col-[full-start/middle]" : "md:col-[middle/full-end]"}
            `}
            >
              <img
                src={post.asset?.url}
                alt={post.title}
                className="
                w-full h-[360px] md:h-[480px]
                object-cover 
              "
              />
            </div>

            {/* TEKST */}
            <div
              className={`
              md:row-start-1
              ${flip ? "md:col-[middle/content-end] md:text-right" : "md:col-[content-start/middle]"}
              flex flex-col gap-4 md:gap-6 md:pr-5 
            `}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>

              <div
                className={`
                flex gap-2 font-semibold text-(--pink)
                ${flip ? "justify-end" : ""}
              `}
              >
                <p>BY: {post.author}</p>
                <span>/</span>
                <p>{post.comments?.length ?? 0} comments</p>
                <span>/</span>
                <p>date: NA</p>
              </div>

              <p className="line-clamp-6">{post.content}</p>

              <div className={flip ? "self-start" : "self-end"}>
                <Link href={`/blogposts/${post.id}`} className="inline-block pt-4 pb-4 border-t border-b border-white text-sm">
                  READ MORE
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default Blogposts;
