import { uploadImage } from "@/actions/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export async function FormImage() {
    return(
        <form action={uploadImage} className="space-y-8">
            <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                    <Input id="image" type="file" />
                </div>
                <div className="grid items-center gap-4">
                    {/* <Image
                                        id="image-preview"
                                        src={form.getValues().image}
                                        alt="Image Preview"
                                        className="aspect-square w-full rounded-md object-cover"
                                        width={300}
                                        height={300}
                                    /> */}
                </div>
            </div>
            <div className="flex w-full justify-center gap-5 ">
                <Button variant='save' className="uppercase font-semibold" type="submit">Salvar</Button>
            </div>
        </form>
    )
}