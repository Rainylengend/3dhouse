import * as THREE from 'three'

function classNames(...args: (string | null | undefined | boolean)[]) {
  return args.filter(Boolean).join(' ')
}

function getForwardDirection(camera: any, v: number) {
  const vec3 = new THREE.Vector3()
  vec3.setFromMatrixColumn(camera.matrix, 0);
  vec3.crossVectors(camera.up, vec3);

  return vec3.multiplyScalar(v)
}


function getRightDirection(camera: any, v: number) {
  const vec3 = new THREE.Vector3()
  vec3.setFromMatrixColumn(camera.matrix, 0);
  return vec3.multiplyScalar(v)
}

export {
  classNames,
  getForwardDirection,
  getRightDirection
}

