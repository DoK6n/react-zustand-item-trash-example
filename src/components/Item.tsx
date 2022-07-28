import { IItem, useItemStore } from '../store/useItemStore';
import { useRemovedStore } from '../store/useRemovedItemStore';

interface Props extends IItem {}

export default function Item({ name, id }: Props) {
  const { findItemById, removeItem } = useItemStore();
  const { addRemovedItem } = useRemovedStore();

  const onRemoveItem = () => {
    addRemovedItem(findItemById(id));
    removeItem(id);
  };

  return (
    <li>
      <b>{name}</b> <span style={{ color: 'lightseagreen' }}>({id})</span>
      <span style={{ color: 'lightgray' }}> --- </span>{' '}
      <button onClick={onRemoveItem}>제거</button>
    </li>
  );
}
