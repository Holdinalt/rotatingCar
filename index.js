class RotatingCar{

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
        this.cachePicks()
        this.displayIndex = displayIndexStart
        this.templateSource = _templateSource;
        this.displayUrl = _urls[this.displayIndex]
        this.renderPicture()

        leftButton.addEventListener('click', this.rotateLeft)
        rightButton.addEventListener('click', this.rotateRight)
    }

    rotateLeft = () => {
        this.displayIndex = this.displayIndex - 1 >= 0 ? this.displayIndex - 1 : this.urls.length - 1
        this.displayUrl = this.urls[this.displayIndex]
        this.renderPicture()
    }

    rotateRight = () => {
        this.displayIndex = this.displayIndex + 1 <= this.urls.length - 1 ? this.displayIndex + 1 : 0
        this.displayUrl = this.urls[this.displayIndex]
        this.renderPicture()
    }

    renderPicture = () => {
        this.templateSource.src = 'https://drive.google.com/uc?export=download&id=' + this.displayUrl
    }

    cachedPicks = []

    cachePicks = () => {
        for (const url of this.urls){

            let img = document.createElement('img');
            img.src = 'https://drive.google.com/uc?export=download&id=' + url;

            this.cachedPicks[url] = img
        }

        console.log(this.cachedPicks)
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



const elem = document.getElementById('car')

const rotatingCar = new RotatingCar({
    _urls: urls,
    _templateSource: elem,
    rightButton: document.getElementById('right'),
    leftButton: document.getElementById('left')
})