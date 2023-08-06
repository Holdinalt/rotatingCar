class RotatingCar{

    ROTATE_TO_SWITCH_PX = 7;

    displayUrl = ''
    displayIndex = 0
    urls = []
    templateSource;

    constructor({
        _urls,
        displayIndexStart = 0,
        _templateSource,

        leftButton,
        rightButton
    }) {
        this.urls = _urls
        // this.cachePicks()
        this.templateSource = _templateSource;
        this.setupIMGS()
        this.controlRender(0)

        this.displayIndex = displayIndexStart
        this.displayUrl = _urls[this.displayIndex]

        this.ROTATE_TO_SWITCH_PX = Math.floor(Number(this.templateSource.style.width.replace('px', '')) / 20)


        this.initialiseTemplateSource()

        // leftButton.addEventListener('click', this.rotateLeft)
        // rightButton.addEventListener('click', this.rotateRight)
    }

    // rotateLeft = (num = 1) => {
    //     this.displayIndex = this.displayIndex - num >= 0 ? this.displayIndex - num : this.urls.length - 1
    //     this.displayUrl = this.urls[this.displayIndex]
    //     this.renderPicture()
    // }
    //
    // rotateRight = (num = 1) => {
    //     this.displayIndex = this.displayIndex + num <= this.urls.length - 1 ? this.displayIndex + num : 0
    //     this.displayUrl = this.urls[this.displayIndex]
    //     this.renderPicture()
    // }

    IMGs = []

    setupIMGS = () => {
        for (let i = 0; i < urls.length; i++){

            const img = document.createElement('img')

            img.width = 500;
            img.draggable = false;
            img.src = 'https://drive.google.com/uc?export=download&id=' + urls[i]
            img.style.position = 'absolute'
            img.style.visibility = 'hidden'

            this.IMGs.push(img)

            this.templateSource.append(img)
        }
    }

    notHiddenIndex = 0;

    renderPictureByIndex = (index) => {

        this.IMGs[index].style.visibility = 'visible'

        if(index !== this.notHiddenIndex){
            this.IMGs[this.notHiddenIndex].style.visibility = 'hidden'
            this.notHiddenIndex = index
        }


    }

    indexEnd = 0;

    controlRender = (num) => {

        let renderIndex;

        console.log(this.indexNow, 'now')

        if( num <= 0 ){
            renderIndex = this.indexNow + num >= 0
                ? this.indexNow + num
                : (((this.indexNow + num) % this.urls.length) + this.urls.length) % this.urls.length
            console.log('left')
        } else {
            renderIndex = (this.indexNow + num) % this.urls.length
            console.log('right')
        }

        console.log(renderIndex, 'index')

        this.renderPictureByIndex(renderIndex)

        this.indexEnd = renderIndex;
    }

    initialiseTemplateSource = () => {
        this.templateSource.addEventListener('mousedown', this.startRotate)
    }

    startedPos;
    indexNow = 0

    startRotate = (event) => {

        document.addEventListener('mouseup', this.endRotate)
        this.templateSource.addEventListener('mousemove', this.rotate)


        this.startedPos = event.screenX;
        console.log(this.startedPos)
    }

    endRotate = (event) => {

        document.removeEventListener('mouseup', this.endRotate)
        this.templateSource.removeEventListener('mousemove', this.rotate)

        this.indexNow = this.indexEnd
        console.log('отжал')
    }

    rotate = (event) => {

        const posX = event.screenX
        const diff = this.startedPos - posX;
        const rotates = Math.floor(diff / this.ROTATE_TO_SWITCH_PX)

        console.log(rotates, 'rotates')
        this.controlRender(rotates)

    }
}
const urls = [
    '1AuLxNG4lqJkK4BX3QVr66K1Sp9gF1f3z',
    '1rZuUFov76KP_9HpZWtonPgYC_VHPGX7W',
    '10ORcMjPIKKPhL97LArpo14zZbHGG22yP',
    '1jQh4DpBq4F2Nl6mAOkbTeD4IeT4XtTOO',
    '1iurf79bgqsVvhbQfhFBOQ2Ll3LFK9HkR',
    '1C23pw74QBcBGxg6R29fCX-wjftKt24rD',
    '1NrIm9zKZXpIKPNtIP85RRGF1-6eVxiXC',
    '1c3Nn0rKnXnTsSy-yv9waz00GeEQhLTKA',
]



const elem = document.getElementById('carTemplate')

const rotatingCar = new RotatingCar({
    _urls: urls,
    _templateSource: elem,
    rightButton: document.getElementById('right'),
    leftButton: document.getElementById('left')
})