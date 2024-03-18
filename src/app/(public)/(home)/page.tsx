import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "@/components/ui/section-title";
import ProductList from "@/components/ui/product-list";
import CarouselPromo from "@/components/CarouselPromo";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      }
    }
  })

  return (
    <div className="flex flex-col gap-8 md:gap-10 py-8">
      {/* <PromoBanner
        src="/Banner-home-01.png"
        alt="Desconto esse mês"
      /> */}
       <section className="flex flex-1 w-full h-full justify-center">
        <CarouselPromo />
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
          src="/Banner-home-02.png"
          alt="Desconto esse mês"
        />
      </div>

      <div className="max-md:hidden flex flex-row items-center h-[215px] overflow-hidden max-w-[1248px] w-full mx-auto gap-8">
        <PromoBanner
          src="/Banner-home-02.png"
          alt="Desconto esse mês"
        />

        <PromoBanner
          src="/Banner-home-03.png"
          alt="Desconto esse mês"
        />
      </div>

      <div className="max-w-[1248px] w-full mx-auto">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/Banner-home-03.png"
        alt="Desconto esse mês"
      />

      <div className="max-w-[1248px] w-full mx-auto">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
