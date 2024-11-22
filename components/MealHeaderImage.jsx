import Image from 'next/image';
export default function MealHeaderImage({ Image }) {
  return (
    <section className=" container-xl m-auto">
      <div className=" grid grid-cols-1">
        <Image
          src={Image}
          alt=""
          className=" object-cover h-[400px] w-full"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
