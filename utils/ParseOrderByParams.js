export const parseOrderByParams = params => {
  const orderBy = [];
  let orderItem;
  if (params.includes(',')) {
    for (const items of params.split(',')) {
      orderItem = items.split(':');
      orderBy.push({
        column: orderItem[0],
        order: orderItem[1],
      });
    }
  } else if (params.includes(':')) {
    return [
      {
        column: params.split(':')[0],
        order: params.split(':')[1],
      },
    ];
  }
  return orderBy;
};
