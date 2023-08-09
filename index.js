class RotatingCar{

    ROTATE_TO_SWITCH_PX;

    urls = []
    templateSource;

    constructor({
        _urls,
        _templateSource,
        _rotateSegments = 20
    }) {
        this.urls = _urls

        this.templateSource = _templateSource;
        this.setupIMGS()
        this.cacheCursors()
        this.controlRender(0)
        this.setCursor('neutral')

        this.ROTATE_TO_SWITCH_PX = Math.floor(Number(this.templateSource.style.width.replace('px', '')) / _rotateSegments)

        this.initialiseTemplateSource()
    }

    IMGs = []

    setupIMGS = () => {
        for (let i = 0; i < urls.length; i++){

            const img = document.createElement('img')

            img.width = 1064;
            img.draggable = false;
            img.src =  'http://sarkisab.beget.tech/assets/images/electriccars/lil7/white/' + urls[i]
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
    prevX;

    controlRender = (num) => {

        let renderIndex;

        // console.log(this.indexNow, 'now')

        if( num <= 0 ){

            renderIndex = this.indexNow + num >= 0
                ? this.indexNow + num
                : (((this.indexNow + num) % this.urls.length) + this.urls.length) % this.urls.length
            // console.log('left')
        } else {

            renderIndex = (this.indexNow + num) % this.urls.length
            // console.log('right')
        }

        // console.log(renderIndex, 'index')

        this.renderPictureByIndex(renderIndex)

        this.indexEnd = renderIndex;
    }

    initialiseTemplateSource = () => {
        this.templateSource.addEventListener('mousedown', this.startRotate)
        this.templateSource.addEventListener('touchstart', this.startRotateTouch)
    }

    startedPos;
    indexNow = 0

    startRotate = (event) => {

        event.preventDefault()

        document.addEventListener('mouseup', this.endRotate)

        this.templateSource.addEventListener('mousemove', this.rotate)

        this.startedPos = event.screenX;
        // console.log(this.startedPos)
    }

    endRotate = (event) => {

        document.removeEventListener('mouseup', this.endRotate)
        this.templateSource.removeEventListener('mousemove', this.rotate)

        this.setCursor('neutral')

        this.indexNow = this.indexEnd
        // console.log('отжал')
    }

    startRotateTouch = (event) => {

        event.preventDefault()

        document.addEventListener('touchend', this.endRotateTouch)
        this.templateSource.addEventListener('touchmove', e => this.rotate(e, true))

        this.startedPos = Math.floor(event.changedTouches[0].clientX);
    }

    endRotateTouch = (event) => {
        document.removeEventListener('touchend', this.endRotateTouch)
        this.templateSource.removeEventListener('touchmove', e => this.rotate(e, true))

        this.setCursor('neutral')

        this.indexNow = this.indexEnd
    }

    rotate = (event, touch = false) => {

        let posX

        if(!touch){
            posX = event.clientX;
        } else {
            posX = Math.floor(event.changedTouches[0].clientX);
        }

        if(this.prevX > posX){
            this.setCursor('left')
        }

        if(this.prevX < posX) {
            this.setCursor('right')
        }

        this.prevX = posX

        const diff = this.startedPos - posX;
        const rotates = Math.floor(diff / this.ROTATE_TO_SWITCH_PX)

        // console.log(rotates, 'rotates')
        this.controlRender(rotates)

    }

    cursors = {
        right: 'https://drive.google.com/uc?export=download&id=1BYdpC_UlUju6GqcTysALFBIPXxwugrlB',
        left: 'https://drive.google.com/uc?export=download&id=1fU1u-TpdzSrwKuxq_rKI1SNJ0XthRtJI',
        neutral: 'https://drive.google.com/uc?export=download&id=1oOn2G_2XstKSU3NYaZO-X-vtkx1LfSjg'
    }

    cacheCursors = () => {
        for (const curs in this.cursors){

            const img = document.createElement('img')

            img.width = 0;
            img.draggable = false;
            img.src = this.cursors[curs]
            img.style.position = 'absolute'
            img.style.visibility = 'hidden'

            this.templateSource.append(img)
        }
    }

    setCursor = (type) => {
        let newCursor;

        switch (type){
            case 'right': newCursor = `url("${this.cursors.right}"), auto`; break;
            case 'left': newCursor = `url("${this.cursors.left}"), auto`; break;
            case 'neutral': newCursor = `url("${this.cursors.neutral}"), auto`; break;
            case 'default': newCursor = 'auto'; break;
        }

        // console.log(type, newCursor)

        this.templateSource.style.cursor = newCursor
    }
}
// const urls = [
//     '1AuLxNG4lqJkK4BX3QVr66K1Sp9gF1f3z',
//     '1rZuUFov76KP_9HpZWtonPgYC_VHPGX7W',
//     '10ORcMjPIKKPhL97LArpo14zZbHGG22yP',
//     '1jQh4DpBq4F2Nl6mAOkbTeD4IeT4XtTOO',
//     '1iurf79bgqsVvhbQfhFBOQ2Ll3LFK9HkR',
//     '1C23pw74QBcBGxg6R29fCX-wjftKt24rD',
//     '1NrIm9zKZXpIKPNtIP85RRGF1-6eVxiXC',
//     '1c3Nn0rKnXnTsSy-yv9waz00GeEQhLTKA',
// ]

const urls = []

for(let i = 1; i <= 35; i++){
    let str = i.toString()

    console.log(str.length)

    while (str.length < 2){
        str = '0' + str
    }

    urls.push(str + '.webp')
}



const elem = document.getElementById('carTemplate')

const rotatingCar = new RotatingCar({
    _urls: urls,
    _templateSource: elem,
    _rotateSegments: 72
})