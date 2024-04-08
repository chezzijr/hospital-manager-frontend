import Image from "next/image";
import { usePath } from "./lib/hooks/path";

import Images from '../../public/assets/Images';

export default function Home() {
  return (
    <main className="flex items-center justify-center mt-4">
      <Image
        src={Images.background}
        width={1000}
        height={1000}
        className=""
        alt="Background"
      />
    </main>
  );
}
