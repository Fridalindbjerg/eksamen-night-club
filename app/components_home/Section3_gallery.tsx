// components/Section3_Gallery.tsx
import Section3_popup, { Picture } from "./Section3_popup";

const Section3_Gallery = async () => {
  // Server-side fetch
  const response = await fetch("http://localhost:4000/gallery?_limit=7");
  const gallery: Picture[] = await response.json();

  return (
    <div className="max-w-full">
      <h2 className="text-center mb-4">Night club gallery</h2>
      {/* Client-side modal komponent */}
      <Section3_popup gallery={gallery} />
    </div>
  );
};

export default Section3_Gallery;
