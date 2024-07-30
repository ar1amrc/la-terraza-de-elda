export default function PresentationVideo() {
  return (
    <section className="flex justify-center items-center w-full">
      <video
        className="w-full md:w-auto md:aspect-video md:max-h-[540px] pt-16"
        autoPlay
        loop
        muted
      >
        <source src="/videos/promo.mp4" type="video/mp4" />
        <source src="/videos/promo.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      {/* <video className="object-cover absolute w-full h-[540px] -z-10 blur-md hidden md:block" autoPlay  loop muted>
      <source src="/videos/promo.mp4" type="video/mp4" />
      <source src="/videos/promo.ogg" type="video/ogg" />
      Your browser does not support the video tag.
    </video> */}
    </section>
  );
}
