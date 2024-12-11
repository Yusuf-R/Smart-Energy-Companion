// userDataStore
// healthWorkerDataStore
// stakeholderDataStore

// useClientStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userDataStore = create(
    persist(
        (set, get) => ({
            encryptedUserData: null, // Stores Base64-encoded encrypted data

            setEncryptedUserData: (data) => {
                set({ encryptedUserData: data });
            },

            clearEncryptedUsertData: () => set({ encryptedUserData: null }),

            getEncryptedUserData: () => get().encryptedUserData,
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ encryptedUserData: state.encryptedUserData }),
        }
    )
);