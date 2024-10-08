import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "@/components/ui/section-title";
import ProductList from "@/components/ui/product-list";
import CarouselPromo from "@/components/CarouselPromo";
import { getBanners } from "@/actions/banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    }
  })


  const { banners } = await getBanners()

  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-8">

      <section className="flex flex-1 w-full h-full justify-center">
        <CarouselPromo banner={banners} />
      </section>


      <div className="px-5 md:px-0 max-w-[1248px] w-full mx-auto">
        <Categories />
      </div>

      <div className="max-w-[1248px] w-full mx-auto">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="md:hidden">
        <PromoBanner
          src={banners[1]?.image}
          alt={banners[1]?.title}
        />
      </div>

      <div className="max-md:hidden flex flex-row items-center h-[215px] overflow-hidden max-w-[1248px] w-full mx-auto gap-8">
        <PromoBanner
          src={banners[0]?.image}
          alt={banners[0]?.title}
        />

        <PromoBanner
          src={banners[1]?.image}
          alt={banners[1]?.title}
        />
      </div>


    </div>
  )
}
