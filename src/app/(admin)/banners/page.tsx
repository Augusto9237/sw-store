import SearchInput from "@/components/search-input"
import TableBanners from "./components/table-banners"
import { Button } from "@/components/ui/button"
import CarouselPromo from "@/components/CarouselPromo"
import { Card, CardHeader } from "@/components/ui/card"
import ModalFormBanner from "./components/modal-form-banner"
import { getBanners } from "@/actions/banner"

export default async function Banners() {
  const { banners } = await getBanners()

  return (
    <div className="flex flex-1 h-full w-full gap-8">
      <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
        <div className="flex w-full justify-between">
          <SearchInput />

          <ModalFormBanner />
        </div>
        <TableBanners banner={banners} />
      </div>

      <Card className="w-full max-w-sm bg-background rounded-lg  h-full max-h-[272px]">
        <CardHeader>
          <h2 className='text-lg font-bold leading-none text-center'>Demonstração</h2>
        </CardHeader>
        <CarouselPromo banner={banners} />
      </Card>
    </div>
  )
}
