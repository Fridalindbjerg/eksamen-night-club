import { div } from "framer-motion/client";

const Section3_Gallery = async () => {
  const response = await fetch("http://localhost:4000/gallery");
  const gallery = await response.json();

  return (
    <div>
      {gallery.map((picture) => (
        <div
          className="grid max-w-full"
        >
          <img key={picture.id} src={picture.asset.url} alt={picture.description} className="w-full h-auto object-cover mb-4 rounded-lg shadow-lg" />
        </div>
      ))}
    </div>
  );
};

export default Section3_Gallery;
