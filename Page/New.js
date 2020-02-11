import common from '../Common/common.js';
import Feed from '../Component/Feed.js';
import ClickMore from '../Prototype/ClickMore.js';
import ScrollMore from '../Prototype/ScrollMore.js';
import engine from '../Common/engine.js';

class New extends ClickMore {
    constructor(param = {}) {
        super();
        this.$parent = param.parent;
        this.$el;
        this.CART_DATA = param.cartDataId;
        this._render();
        this.$more = this.$el.querySelector('.more');
        this.$click = this.$el.querySelector('.click');
        this.$scroll = this.$el.querySelector('.scroll');
        this.url = 'https://my-json-server.typicode.com/euijunh/VanillaGram/feed/';
        this.event = {
            initScroll: undefined,
        }
        this._create();
        this.items = new Feed({ parent: this.$el.querySelector('.items') });
    }

    async _create() {
        await super.create();
        if(this.hasNext) {
            this._addEvent();
        } else {
            this.$more.style.display = 'none';
        }
    }

    renderMore(data) {
        this.items.render(data);
    }

    processData(list) {
        list.forEach(data => {
            data.img = common.imgPath + data.img;
        });
    }

    _render() {
        const template = `
            <div class="v9tJq VfzDr">
                <div class=" _2z6nI">
                    <div class="Gx7Kn">
                        <div id="" class="items" style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                        </div>
                        <div id="" class=" Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl more" style="margin-right: 8px">
                            <button id="" class="sqdOP L3NKy y3zKF _4pI4F click" type="button" style="margin: 16px 8px">더보기</button>
                            <button id="" class="sqdOP L3NKy y3zKF _4pI4F scroll" type="button" style="margin: 16px 8px">전체보기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const { fragment, elements } = engine(template, [null]);
        this.$parent.appendChild(fragment);
        this.$el = elements[0];
    }

    _initScroll() {
        this.$more.style.display = 'none';
        this._removeEvent();

        if(Object.setPrototypeOf && Object.getPrototypeOf) {
            Object.setPrototypeOf(Object.getPrototypeOf(this), ScrollMore.prototype);
        } else {
            this.__proto__.__proto__ = ScrollMore.prototype;
        }

        super.addEvent();
        this.event.scroll();
    }

    _finalScroll() {
        if(Object.setPrototypeOf && Object.getPrototypeOf) {
            Object.setPrototypeOf(Object.getPrototypeOf(this), ClickMore.prototype);
        } else {
            this.__proto__.__proto__ = ClickMore.prototype;
        }
    }

    _addEvent() {
        super.addEvent();
        this.event.initScroll = this._initScroll.bind(this);
        this.$scroll.addEventListener('click', this.event.initScroll);
    }

    _removeEvent() {
        super.removeEvent();
        this.$scroll.removeEventListener('click', this.event.initScroll);
    }

    destroy() {
        this.items.destroy();
        this.$parent.removeChild(this.$el);
        this._removeEvent();
        this._finalScroll();
    }
}

export default New;