interface Heap {
  track: (event: string, properties?: Record<string, any>) => void;
  identify: (identity: string) => void;
  resetIdentity: () => void;
  addUserProperties: (properties: Record<string, any>) => void;
  addEventProperties: (properties: Record<string, any>) => void;
  removeEventProperty: (property: string) => void;
  clearEventProperties: () => void;
  appid: string;
  userId: string;
  identity: string | null;
  config: any;
}

type GetHeap = () => Heap;

export const getHeap: GetHeap = () => window.heap;
