import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) =>{
        console.log("Storing user in Zustand:", userData);
        set({ user: userData });
       },

      logout: () => set({ user: null }),
      
      hasHydrated: false, // hydration flag
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (set) => {
        set.hasHydrated = true;
      },
    }
  )
);