import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
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
      <PromoBanner
        src="/Banner-home-01.png"
        alt="Desconto esse mês"
      />

      <div className="px-5 md:px-28">
        <Categories />
      </div>

      <div className="md:px-28">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="md:hidden">
        <PromoBanner
          src="/Banner-home-02.png"
          alt="Desconto esse mês"
        />
      </div>

      <div className="max-md:hidden flex flex-row  h-[215px] overflow-hidden px-28 gap-8">
        <PromoBanner
          src="/Banner-home-02.png"
          alt="Desconto esse mês"
        />
        <PromoBanner
          src="/Banner-home-03.png"
          alt="Desconto esse mês"
        />
      </div>

      <div className="md:px-28">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/Banner-home-03.png"
        alt="Desconto esse mês"
      />

      <div className="md:px-28">
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
