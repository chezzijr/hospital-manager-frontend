// import config
import config from "@root/next.config.mjs"

export const usePath = (path: string) => {
    if (path.startsWith('/')) {
        path = path.slice(1);
    }
    const basePath = config.basePath;
    return `${basePath}/${path}`;
}
