// hooks/useFullscreen.ts
import { useState } from 'react';

export const useFullscreen = (elementRef: React.RefObject<HTMLElement>) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (elementRef.current) {
                const element = elementRef.current as any;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                }
                setIsFullscreen(true);
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    return { isFullscreen, toggleFullscreen };
};
