export const GetGiftFinderProducts = (query, success, error) => {
  $.ajaxq.abort('giftFinderQueue');

  $.ajaxq('giftFinderQueue', {
    type: 'PUT',
    url: '/api/giftfinder/seasonal',
    data: JSON.stringify(query),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: success,
    error: error,
  });
};
