// components/CanvasItem.tsx
import React from 'react';
import {CanvasItemType} from "./CanvasItemType";

interface CanvasItemProps {
    item: CanvasItemType;
}

const CanvasItem: React.FC<CanvasItemProps> = ({ item }) => (
    <div style={{ padding: '10px', background: '#f0f0f0' }}>{item.content}</div>
);

export default CanvasItem;
