/**
 * 2D Vector
 */
export default class Vec {
  /** x-axis coord */
  private _x: number;

  /** y-axis coord */
  private _y: number;

  constructor(x: number, y?: number) {
    this._x = x;
    this._y = y == null ? this._x : y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  /**
   * Returns a new vector that is the result of adding this vector with
   * another vector.
   */
  add(other: Vec): Vec {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  /**
   * Returns a new vector that is the result of subtracting this vector by
   * another vector.
   */
  subtract(other: Vec): Vec {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  /**
   * Returns a new vector that is the result of multiplying the elements of
   * this vector by a scalar.
   */
  multiply(scalar: number): Vec {
    return new Vec(scalar * this.x, scalar * this.y);
  }

  /**
   * Returns a new vector that is the result of dividing the elements of this
   * vector by a scalar.
   */
  divide(scalar: number): Vec {
    return new Vec(this.x / scalar, this.y / scalar);
  }

  /**
   * Return Euklidean distance between two vectors(points)
   */
  distance(other: Vec): number {
    return new Vec(this.x - other.x, this.y - other.y).magnitude();
  }

  /**
   * Return squared Euklidean distance between two vectors(points)
   */
  squareDistance(other: Vec): number {
    return new Vec(this.x - other.x, this.y - other.y).magnitudeSquared();
  }

  /**
   * Return Manhattan distance between two vectors (points)
   */
  manhattanDistance(other: Vec): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  /**
   * Returns the normalized form of this vector as a new vector. A normalized
   * vector has a length of 1. This operation is potentially costly so it is
   * best to cache the result when possible.
   */
  normalize(): Vec {
    let magnitude = this.magnitude();
    return new Vec(this.x / magnitude, this.y / magnitude);
  }

  /**
   * Returns the squared magnitude of this vector. This is cheaper to
   * compute than the magnitude, so should be preferred where possible.
   */
  magnitudeSquared(): number {
    return this.dot(this);
  }

  /**
   * Computes the magnitude (or length) of this vector. This operation is
   * potentially cost os it is best to cache the result when possible.
   */
  magnitude(): number {
    return Math.sqrt(this.magnitudeSquared());
  }

  /**
   * Computes and returns the angle of this vector in radians.
   */
  angle(): number {
    let result = Math.atan2(this.y, this.x);
    if (result < 0) {
      result += 2 * Math.PI;
    }
    return result;
  }

  /**
   * Calculates and returns the dot product of this vector and another vector.
   */
  dot(other: Vec): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Limits the vector size
   */
  limit(magnitude: number): Vec {
    let mag = this.magnitudeSquared();
    if (magnitude < mag) {
      return new Vec(this.x / Math.sqrt(mag / magnitude), this.y / Math.sqrt(mag / magnitude));
    } else {
      return this.clone();
    }
  }

  equals(other: Vec): boolean {
    return this.x === other.x && this.y === other.y;
  }

  clone(): Vec {
    return new Vec(this.x, this.y);
  }
}