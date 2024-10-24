import React from 'react';
import styles from './CanvasItem.module.css';
import {CanvasItemType} from "./CanvasItemType";

interface CanvasItemProps {
    item: CanvasItemType;
}

const CanvasItem: React.FC<CanvasItemProps> = ({ item }) => {
    switch (item.type) {
        case 'Texto':
            return (
                <div className={styles.canvasText}>
                    <textarea defaultValue={item.content} />
                </div>
            );
        case 'Post-it':
            return <div className={styles.postIt}>Post-it conteúdo</div>;
        case 'Imagens':
            return <div>Imagem aqui</div>;
        case 'Código':
            return (
                <pre>
          {`class AFD {
  def __init__(self, transicoes, estado_inicial, estados_finais):
    self.transicoes = transicoes;
    self.estado_atual = estado_inicial;
    self.estados_finais = estados_finais;
}
`}
        </pre>
            );
        default:
            return null;
    }
};

export default CanvasItem;
