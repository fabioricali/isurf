const DEFAULT_CONFIG = {
    interval: 5000,
    domain: 'https://www.google.com'
}

export default class ISurf {
    constructor(opts = {}) {
        this.opts = Object.assign({}, DEFAULT_CONFIG, opts);
        this.onLine = null;

        this.checkConnection();
        setInterval(() => {
            this.checkConnection();
        }, this.opts.interval);

        this.$alertElement = document.createElement('div')
        this.$alertElement.style.cssText = `
            display: none;
            position: fixed;
            left: 24px;
            bottom: 24px;
            background: red;
            padding: 24px;
            color: white;
            font-family: arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
            border-radius: 4px;
            font-weight: bold;
            box-shadow: 0px 0px 4px #00000040;
        `
        this.$alertElement.innerHTML = 'Maybe you\'re not connected to the internet'

        document.body.appendChild(this.$alertElement);
    }

    checkConnection() {
        fetch(this.opts.domain, {method: 'HEAD', mode: 'no-cors'})
            .then((response) => {
                this.$alertElement.style.display = 'none'
            })
            .catch(error => {
                this.$alertElement.style.display = 'block'
            })
    }
}