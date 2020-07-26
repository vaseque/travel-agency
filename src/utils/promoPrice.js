export const promoPrice = function(sum, percent) {
  if(arguments.length !== 2) {
    return null;
  }
  if((typeof sum !== 'number') || (typeof percent !== 'number')) {
    return null;
  }
  if(sum < 0 || percent < 0) {
    return null;
  }
  const discount = sum * (percent/100);
  return sum - discount;
};
