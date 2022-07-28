import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';

export interface IItem {
  id: string;
  name: string;
}

interface IItemStore {
  items: IItem[];
  addNewItem: () => void;
  recycleItem: (item: IItem) => void;
  findItemById: (id: string) => IItem;
  removeItem: (id: string) => void;
}

export const useItemStore = create<IItemStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        items: [],
        addNewItem: () => {
          set((state) => {
            const id = nanoid();
            state.items.push({
              id: id,
              name: `아이템_${id.substr(0, 3)}`
            });
          });
        },
        recycleItem: (item) => {
          set((state) => {
            state.items.push(item);
          });
        },
        findItemById: (id) => {
          const result = get().items.find((item) => item.id === id)!;
          return result;
        },
        removeItem: (id) => {
          set((state) => {
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1);
          });
        }
      })),
      { name: 'item-storage' }
    )
  )
);
