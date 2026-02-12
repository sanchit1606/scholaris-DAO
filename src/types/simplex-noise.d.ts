declare module "simplex-noise" {
  export function createNoise3D(): (x: number, y: number, z: number) => number;
  const SimplexNoise: any;
  export default SimplexNoise;
}

