export const BATCH_SIZE = 50;
// we keep in memory 2 more items than in flat list, because otherwise
// last item in flat list is apperaring and disspaearing and it is not the best UX
// I am aware this can still easily happen if whale comes and buy down all (in IN_FLATLIST_ITEMS) bids/asks
export const IN_MEMORY_ITEMS = 18;
export const IN_FLATLIST_ITEMS = 16;

// In general this (WSS_URL) should be in ENV VAR - but for simplicity of this app just added here
export const WSS_URL = 'wss://futures.kraken.com/ws/v1​';
export const WSS_OPEN_MESSAGE = JSON.stringify({
  event: 'subscribe',
  feed: 'book',
  product_ids: ['PI_XBTUSD'],
});
