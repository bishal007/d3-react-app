import { create } from 'zustand';

const useStore = create((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUserData: (name, data) => set((state) => ({
    users: state.users.map(user => 
      user.name === name ? { ...user, ...data, detailsFilled: true } : user
    )
  })),
  selectedCharts: [],
  setSelectedCharts: (charts) => set({ selectedCharts: charts }),
  showData: false,
  setShowData: (show) => set({ showData: show }),
}));

export default useStore;