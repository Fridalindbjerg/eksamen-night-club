import Image from "next/image";

type Props = {
  image: string;
  title: string;
  text: string;
  icon?: string;
};

export default function Card({ image, title, text, icon }: Props) {
  return (
    <div className="relative overflow-hidden  group">
      <Image src={image} alt={title} width={1200} height={800} className="w-full h-auto object-cover"  />

      <h3 className="text-white text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80 max-w-[380px]">{text}</p>
    </div>
  );
}
