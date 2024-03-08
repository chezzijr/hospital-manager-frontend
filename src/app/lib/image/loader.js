import { useRouter } from "next/navigation";

export default function imageLoader({ src }) {
    const router = useRouter()
    return `${router.basePath}/${src}`;
}
