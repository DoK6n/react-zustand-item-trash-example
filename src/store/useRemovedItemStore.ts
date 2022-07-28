import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import timestamp from '../utils/timestamp';
import { IItem } from './useItemStore';

export interface IRemovedItem extends IItem {
  removedDt: string;
}

interface IRemovedItemStore {
  removedItems: IRemovedItem[];
  addRemovedItem: (item: IItem) => void;
  findRemovedItemById: (id: string) => IItem;
  // recycleItem: (removedItem: IRemovedItem) => void;
  deleteAll: () => void;
  deleteById: (id: string) => void;
}

export const useRemovedStore = create<IRemovedItemStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        removedItems: [],
        addRemovedItem: (item) => {
          set((state) => {
            const addedDtItem = { ...item, removedDt: timestamp() };
            state.removedItems.push(addedDtItem);
          });
        },
        findRemovedItemById: (id) => {
          const result = get().removedItems.find(
            (removedItem) => removedItem.id === id
          )!;
          return result;
        },
        // recycleItem: (removedItem) => {
        //   set((state) => {
        //     state.removedItems.push(removedItem);
        //   });
        // },
        deleteAll: () => {
          set((state) => {
            state.removedItems = [];
          });
        },
        deleteById: (id) => {
          set((state) => {
            const index = state.removedItems.findIndex(
              (removedItem) => removedItem.id === id
            );
            state.removedItems.splice(index, 1);
          });
        }
      })),
      { name: 'removed-item-storage' }
    )
  )
);
