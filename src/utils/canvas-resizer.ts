
// will resize canvas to be always in the center of the browser, regardless of the scale
export const resizeCanvas = (container: HTMLElement, virtualWidth: number, virtualHeight: number) => {
  let scale: number;
  let isVertical = false;
  if (window.innerWidth / window.innerHeight > virtualWidth / virtualHeight) {
    scale = window.innerHeight / virtualHeight;
  } else {
    scale = window.innerWidth / virtualWidth;
    isVertical = true;
  }

  let transform = `scale(${scale})`;
  let topPos = isVertical ? window.innerHeight / 2 - virtualHeight / 2 : ((scale - 1) * virtualHeight / 2);
  container.style.setProperty('position', 'absolute');
  container.style.setProperty('MozTransform', transform);
  container.style.setProperty('transform', transform);
  container.style.setProperty('WebkitTransform', transform);
  container.style.setProperty('top', topPos + 'px');
  container.style.setProperty('left', ((scale - 1) * virtualWidth / 2 + (window.innerWidth - virtualWidth * scale) / 2) + 'px');
};
