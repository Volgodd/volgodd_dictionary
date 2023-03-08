import { create } from 'zustand';

const defaultOverlayStore = { overlayType: undefined, overlayMetadata: undefined };

const useOverlayStore = create((set) => ({
  ...defaultOverlayStore,
  openOverlay: ({ overlayType, overlayMetadata }) => set({ overlayType, overlayMetadata }),
  closeOverlay: () => set({ ...defaultOverlayStore })
}));

export default useOverlayStore;
