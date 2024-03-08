import { useRouter } from "next/navigation";

export default function useImageLoader({ src }) {
    const router = useRouter()
    return `${router.basePath}/${src}`;
}
