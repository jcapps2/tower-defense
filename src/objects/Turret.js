import Phaser from 'phaser'

export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, x, y, map) {
        super(scene, x, y, 'tower')

        this.scene = scene
        this.map = map
        this.nextTic = 0

        // add the turret to our game
        this.scene.add.existing(this)
        this.setScale(-0.8)
    }

    update(time, delta) {
        // setting shoot delay
        if (time > this.nextTic) {
            this.fire()
            this.nextTic = time + 1000
        }
    }

    // placing turrets on map
    place(i, j) {
        this.y = i * 64 + 32
        this.x = j * 64 + 32
        this.map[i][j] = 1      // fill map position when turret is placed
    }

    // firing bullets
    fire() {
        let enemy = this.scene.getEnemy(this.x, this.y, 100)   // check if enemy is near
        if (enemy) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
            this.scene.addBullet(this.x, this.y, angle)
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
        }
    }
}