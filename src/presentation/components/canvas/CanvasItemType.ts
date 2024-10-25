// types.ts
export interface CanvasItemType {
    id: number;
    type: string;
    content: string;
    position: Position;
    size: Size;
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}
