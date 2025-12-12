import Card from "./Section1_welcome_card";
import thumb1 from "@/public/assets/content-img/thumb1.jpg";

export default function Section1_welcome() {
  return (
    <section className="col-[content-start/content-end]">
      <Card image="/assets/content-img/thumb1.jpg" title="Night Club" text="The point of using Lorem Ipsum is that it has a more-or-less normal distribution." icon="/assets/icons/club.svg" />
    </section>
  );
}
