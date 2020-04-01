import 'phaser'
// import logoImg from '../../../assets/logo.png'
import bullet from '../../assets/level/bulletDark2_outline.png'
import tankRed from '../../assets/level/tank_bigRed.png'
import tankSand from '../../assets/level/tank_sand.png'
import base from '../../assets/level/tankBody_darkLarge_outline.png'
import title from '../../assets/ui/title.png'
import cursor from '../../assets/ui/cursor.png'
import blueButton1 from '../../assets/ui/blue_button02.png'
import blueButton2 from '../../assets/ui/blue_button03.png'
import level1 from '../../assets/level/level1.json'
import terrainDefault from '../../assets/level/terrainTiles_default.png'

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    // built-in Phaser
    init() {
        this.readyCount = 0
    }

    preload() {
        // time event for logo - call a function after a set amount of time has passed
        // TODO - update delayedCall time
        this.timedEvent = this.time.delayedCall(2000, this.ready, [], this)     // args are (milliseconds to wait, function to call, array of args to pass, scope)
        this.createPreloader()
        this.loadAssets()
    }

    createPreloader() {
        let width = this.cameras.main.width
        let height = this.cameras.main.height

        // add logo image
        this.add.image(width / 2, height / 2 - 100, 'logo')

        // display progress bar
        let progressBar = this.add.graphics()
        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)    // color of the fill, and opacity
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50)     // make rectangle shape - arguments are (x, y, width of rect, height of rect)

        // loading text
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
        loadingText.setOrigin(0.5, 0.5)     // centering text

        // percent text
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        percentText.setOrigin(0.5, 0.5)     // centering text

        // loading assets text
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        assetText.setOrigin(0.5, 0.5)     // centering text

        // update progress bar
        this.load.on('progress', function (value) {
            // console.log(value)
            percentText.setText(parseInt(value * 100) + '%')
            // creates fill effect for bar
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30)     
        })

        // update file progress text
        this.load.on('fileprogress', function (file) {
            // console.log(file)
            assetText.setText('Loading asset: ' + file.key)
        })

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBox.destroy()
            progressBar.destroy()
            assetText.destroy()
            loadingText.destroy()
            percentText.destroy()
            this.ready()
        }.bind(this))
    }

    loadAssets() {
        // load assets needed for game
        this.load.image('bullet', bullet)
        this.load.image('tower', tankRed)
        this.load.image('enemy', tankSand)
        this.load.image('base', base)
        this.load.image('title', title)
        this.load.image('cursor', cursor)
        this.load.image('blueButton1', blueButton1)
        this.load.image('blueButton2', blueButton2)


        // tile map in JSON format
        this.load.tilemapTiledJSON('level1', level1)
        this.load.spritesheet('terrainTiles_default', terrainDefault, { frameWidth: 64, frameHeight: 64 })
    }

    ready() {
        this.readyCount++
        if (this.readyCount === 2) {
            // TODO switch to Title screen
            this.scene.start('Title')
        }
    }
}