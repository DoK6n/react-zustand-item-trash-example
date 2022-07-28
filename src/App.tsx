import React from 'react';
import { useItemStore } from './store/useItemStore';
import { useRemovedStore } from './store/useRemovedItemStore';
import Item from './components/Item';
import Trash from './components/Trash';

export default function App() {
  const { items, addNewItem } = useItemStore();
  const { removedItems, deleteAll } = useRemovedStore();

  return (
    <div className="App">
      <h2>아이템 목록</h2>
      <button
        onClick={() => {
          addNewItem();
        }}
      >
        아이템 추가
      </button>
      <ul>
        {items.map((item, i) => (
          <Item id={item.id} name={item.name} key={i} />
        ))}
      </ul>
      <hr />
      <h2>휴지통</h2>
      <button
        style={{ marginBottom: '1em' }}
        onClick={() => {
          deleteAll();
        }}
      >
        휴지통 비우기
      </button>
      <div
        style={{
          border: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          padding: '1em 0 1em 0'
        }}
      >
        {removedItems.map((removedItem, i) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              color: 'lightgray',
              padding: '0 1em 0 1em'
            }}
            key={i}
          >
            <Trash
              id={removedItem.id}
              name={removedItem.name}
              removedDt={removedItem.removedDt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
