import type { OverlayStore } from 'types/store-types';
import { create } from 'zustand';

const defaultOverlayStore = { overlayType: undefined, overlayMetadata: undefined };

const useOverlayStore = create<OverlayStore>((set) => ({
  ...defaultOverlayStore,
  openOverlay: ({ overlayType, overlayMetadata }) => set({ overlayType, overlayMetadata }),
  closeOverlay: () => set({ ...defaultOverlayStore })
}));

export default useOverlayStore;
