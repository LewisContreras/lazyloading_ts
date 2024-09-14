import { useEffect, useRef, useState } from "react"
import type { ImgHTMLAttributes } from "react"

type LazyImagePropsProps = {
    src: string;
    onLazyLoad?: (img: HTMLImageElement) => void
}

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>

type Props = ImageNativeTypes & LazyImagePropsProps


export const LazyImage = ({
    src,
    onLazyLoad,
    ...imgPops
}: Props): JSX.Element => {
    const [currentSrc, setCurrentSrc] = useState<string>(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    )
    const [isLazyLoaded, setIsLazyLoaded] = useState(false)
    const node = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (isLazyLoaded) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentSrc(src)
                    observer.disconnect()
                    setIsLazyLoaded(true)
                    if (typeof onLazyLoad === "function") {
                        onLazyLoad(node.current!)
                    }
                }
            })
        })

        if (node.current) {
            observer.observe(node.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [src, onLazyLoad, isLazyLoaded]);
    
 
    return (
        <img
            ref={node}
            src={currentSrc}
            {...imgPops}
        />
    )
}