export const formatTime = (sec) => {
  if(!sec) {
    return null;
  }
  if(typeof(sec) !== 'number') {
    return null;
  }
  if(sec < 0) {
    return null;
  }
  const hours = Math.floor(sec/3600);
  const minutes = Math.floor((sec/60) % 60);
  const seconds = Math.floor(sec % 60);
  
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};