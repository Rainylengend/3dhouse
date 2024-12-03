import { Camera, Vector2, Vector3, Quaternion } from "three"
const quaternion = new Quaternion()
const cameraLookAt = new Vector3()
const lookDirection = new Vector3()
const leftDirection = new Vector3()

class CameraControls {
  private sizes: Vector2
  private beginCursor: Vector2 = new Vector2(9999, 9999)
  private currentCursor: Vector2 = new Vector2(9999, 9999)
  private _intensity: number = 4
  constructor(private camera: Camera, private canvas: HTMLCanvasElement) {
    this.sizes = new Vector2(canvas.clientWidth, canvas.clientHeight)
    this.pointerdown = this.pointerdown.bind(this)
    this.pointermove = this.pointermove.bind(this)
    this.pointerup = this.pointerup.bind(this)
    this.canvas.style.touchAction = 'none';
    this.bind()
  }
  private bind() {
    this.canvas.addEventListener('pointerdown', this.pointerdown)
    window.addEventListener('pointermove', this.pointermove)
    window.addEventListener('pointerup', this.pointerup)
  }
  dispose() {
    this.canvas.removeEventListener('pointerdown', this.pointerdown)
    window.removeEventListener('pointermove', this.pointermove)
    window.removeEventListener('pointerup', this.pointerup)
    this.canvas.style.touchAction = 'auto';
  }


  get intensity() {
    return this._intensity
  }
  set(v: number) {
    this._intensity = v
  }
  private pointerdown(event: MouseEvent) {
    this.getCursor(event, this.beginCursor)
  }
  private pointermove(event: MouseEvent) {
    if (this.beginCursor.x === 9999 && this.beginCursor.y === 9999) {
      return
    }
    this.getCursor(event, this.currentCursor)
    const direction = new Vector2().subVectors(this.currentCursor, this.beginCursor)
    lookDirection.copy({ x: 0, y: 0, z: -1 }).applyQuaternion(this.camera.quaternion)
    leftDirection.copy({ x: 0, y: 1, z: 0 }).applyQuaternion(this.camera.quaternion).cross(lookDirection)

    //点乘判断角度
    const v = lookDirection.dot(this.camera.up)
    let yAngle = direction.y * this._intensity
    if (direction.y < 0 && v > 0.9 || direction.y > 0 && v < -0.6) {
      yAngle = 0
    }
    let xAngle = direction.x * this._intensity

    cameraLookAt.copy(lookDirection)
    quaternion.setFromAxisAngle(leftDirection, yAngle)
    cameraLookAt.applyQuaternion(quaternion)
    quaternion.setFromAxisAngle({ x: 0, y: 1, z: 0 }, -xAngle)
    cameraLookAt.applyQuaternion(quaternion)


    cameraLookAt.add(this.camera.position)
    this.camera.lookAt(cameraLookAt)

    this.beginCursor.copy(this.currentCursor)
  }
  private pointerup() {
    this.beginCursor.x = this.beginCursor.y = 9999
  }

  private getCursor(event: MouseEvent, point: Vector2) {
    const { clientX, clientY } = event
    point.set(clientX / this.sizes.width, clientY / this.sizes.height)
  }
}

export {
  CameraControls
}