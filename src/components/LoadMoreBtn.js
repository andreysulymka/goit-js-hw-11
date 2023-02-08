export default class LoadmoreBtn
{
    constructor(selector, isHidden = true) {
        
        this.button = this.getButton(selector);
        if (isHidden) this.hide();
    };

    getButton(selector) {
        return document.querySelector(selector);
    };

    enable() {
        this.button.disable = false;
        this.button.textContent = 'Load more';
    };
    disable() {
        this.button.disable = true;
        this.button.textContent = 'Loading...';
    }

    hide() {
        this.button.classList.add('hidden');
    };
    show() {
        this.button.classList.remove('hidden');
    };
}