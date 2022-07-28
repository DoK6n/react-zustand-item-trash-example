import { useItemStore } from '../store/useItemStore';
import { useRemovedStore, IRemovedItem } from '../store/useRemovedItemStore';

interface Props extends IRemovedItem {}

export default function Trash({ id, name, removedDt }: Props) {
  const { findRemovedItemById, deleteById } = useRemovedStore();
  const { recycleItem } = useItemStore();

  const onRecycleItem = () => {
    const removedItem = findRemovedItemById(id);
    recycleItem(removedItem);
    deleteById(id);
  };

  return (
    <>
      <div>
        <b>{name}</b> <span style={{ opacity: '50%' }}>({id})</span>
      </div>
      <div>{removedDt}</div>
      <button onClick={onRecycleItem}>복구</button>
    </>
  );
}
