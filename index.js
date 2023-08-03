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
        'https://drive.google.com/uc?export=view&id='
    }
}
const urls = [
    '1ECe0MyxrqBTIUNTp0t8_gQ2Ids79z6MP',
    '15Cgx8PsGZaBAIjDok0CsudxwJgRC_XEx',
    '1gqrtA5SxTfwF55LFsgOyzlJq5Go6G7PL',
    '1ynEDYcW3rSuLXvpAlQZ4WpVAUl_XZT2x',
    '1mJmgRy5BR-1Xcde3-YXdY21G9ozyGLCC',
    '1AtpNsjKxxoNgLbpUFNHZVhxRein_Q6NL',
    '1g4MQRpt__vZP4T_YHETLJOnnZA2c5IQC',
    '1GLnVRccdRNgQD1UMOdiHKPLSiqgK2zRX',
]


const elem = document.getElementById('car')

const rotatingCar = new RotatingCar({
    _urls: urls,
    _templateSource: elem,
    rightButton: document.getElementById('right'),
    leftButton: document.getElementById('left')
})