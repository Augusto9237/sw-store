import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })
  return (
    <div className="p-5">
      <Image
        src="/Banner-home-01.png"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
        alt="Desconto esse mês"
      />

      <div className="mt-8">
        <Categories />
      </div>

      <div>
        <ProductList products={deals} />
      </div>
    </div>
  )
}