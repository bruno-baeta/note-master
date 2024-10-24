export interface CanvasItemType {
    id: number;
    type: string;
    content: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
}
