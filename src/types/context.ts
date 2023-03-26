type AlertContextData = {
  metadata: string | undefined;
  type: string | undefined;
};

export type ContextType = {
  alertOverlay: AlertContextData;
  setAlertOverlay: ({ metadata, type }: AlertContextData) => void;
};
