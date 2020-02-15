

export abstract class BaseAnimator {
  isRunning = true;

  abstract update(delta: number, absolute: number);
}