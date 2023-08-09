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
            img.src = urls[i]
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

// const urls = []
//
// for(let i = 1; i <= 35; i++){
//     let str = i.toString()
//
//     console.log(str.length)
//
//     while (str.length < 2){
//         str = '0' + str
//     }
//
//     urls.push(str + '.webp')
// }

const urls = [
    'https://thumb.tildacdn.com/tild3865-3631-4762-a430-346534343731/-/format/webp/01.png',
    'https://thumb.tildacdn.com/tild3665-3234-4562-b738-656466343165/-/format/webp/02.png',
    'https://thumb.tildacdn.com/tild6632-3766-4638-a235-386135616230/-/format/webp/03.png',
    'https://thumb.tildacdn.com/tild3438-6365-4933-b130-383037363064/-/format/webp/04.png',
    'https://thumb.tildacdn.com/tild3337-6334-4264-b136-303931633533/-/format/webp/05.png',
    'https://thumb.tildacdn.com/tild3834-3434-4534-b764-303537333161/-/format/webp/06.png',
    'https://thumb.tildacdn.com/tild3134-3066-4535-b933-356265383637/-/format/webp/07.png',
    'https://thumb.tildacdn.com/tild6366-3732-4135-b136-323231336136/-/format/webp/08.png',
    'https://thumb.tildacdn.com/tild3530-6161-4338-a538-323730353531/-/format/webp/09.png',
    'https://thumb.tildacdn.com/tild3063-3364-4963-b231-313631623536/-/format/webp/10.png',
    'https://thumb.tildacdn.com/tild3338-6261-4938-a265-333939636130/-/format/webp/11.png',
    'https://thumb.tildacdn.com/tild3937-6438-4666-b438-623666323865/-/format/webp/12.png',
    'https://thumb.tildacdn.com/tild6235-6566-4666-a138-376436653966/-/format/webp/13.png',
    'https://thumb.tildacdn.com/tild3031-3838-4334-b635-303530626365/-/format/webp/14.png',
    'https://thumb.tildacdn.com/tild3534-6636-4565-b061-646333653061/-/format/webp/15.png',
    'https://thumb.tildacdn.com/tild6636-3061-4364-a530-366439613163/-/format/webp/16.png',
    'https://thumb.tildacdn.com/tild3238-3262-4637-a132-316536656135/-/format/webp/17.png',
    'https://thumb.tildacdn.com/tild3261-3236-4937-b036-356139613538/-/format/webp/18.png',
    'https://thumb.tildacdn.com/tild6639-6130-4938-a137-646361356130/-/format/webp/19.png',
    'https://thumb.tildacdn.com/tild3030-3563-4666-b862-363639346633/-/format/webp/20.png',
    'https://thumb.tildacdn.com/tild6561-6137-4536-b864-373138393835/-/format/webp/21.png',
    'https://thumb.tildacdn.com/tild6638-3439-4331-a665-313135646536/-/format/webp/22.png',
    'https://thumb.tildacdn.com/tild6464-6131-4433-b265-343234333537/-/format/webp/23.png',
    'https://thumb.tildacdn.com/tild3030-3230-4136-a133-623461616634/-/format/webp/24.png',
    'https://thumb.tildacdn.com/tild6361-3738-4532-b165-666232363933/-/format/webp/25.png',
    'https://thumb.tildacdn.com/tild6234-6339-4737-a339-653838323764/-/format/webp/26.png',
    'https://thumb.tildacdn.com/tild6265-3237-4239-a636-636538313535/-/format/webp/27.png',
    'https://thumb.tildacdn.com/tild3037-3331-4864-b163-393162363465/-/format/webp/28.png',
    'https://thumb.tildacdn.com/tild6164-3034-4063-b639-613531636561/-/format/webp/29.png',
    'https://thumb.tildacdn.com/tild3862-6562-4531-b831-306466613363/-/format/webp/30.png',
    'https://thumb.tildacdn.com/tild3264-3130-4435-b132-323838353932/-/format/webp/31.png',
    'https://thumb.tildacdn.com/tild3539-3365-4563-b333-633263313337/-/format/webp/32.png',
    'https://thumb.tildacdn.com/tild3835-3231-4065-b232-623266333739/-/format/webp/33.png',
    'https://thumb.tildacdn.com/tild3236-3261-4336-a132-666431383065/-/format/webp/34.png',
    'https://thumb.tildacdn.com/tild6239-3362-4533-a666-306166303435/-/format/webp/35.png',
    'https://thumb.tildacdn.com/tild6530-6566-4132-b363-393431643766/-/format/webp/36.png',
]



const elem = document.getElementById('carTemplate')

const rotatingCar = new RotatingCar({
    _urls: urls,
    _templateSource: elem,
    _rotateSegments: 72
})