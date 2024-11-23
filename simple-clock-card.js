class SimpleClock extends HTMLElement {
    static NAME = "Simple Clock Card";
    static VERSION = "0.2.2";

    set hass(hass) {
        if (!this.content) {
            this.setCard()
            this.getClock();

            console.info(
                `%c${SimpleClock.NAME} ${SimpleClock.VERSION}%c`,
                'background-color: #4682B4; border-radius: 10px; padding: 2px 5px; font-weight: bold; color: white;'
            );
        }
    }

    getClock() {
        this.getTime();
        this.getDate();
        setInterval(() => this.getTime(), 1000);
        setInterval(() => this.getDate(), 60000);
    }

    getTime() {
        const now = new Date();
        let timeOptions = { hour: '2-digit', minute: '2-digit' };

        if (this.getTrue(this.showSeconds)) {
            timeOptions.second = '2-digit';
        }

        let time = now.toLocaleTimeString([], timeOptions);

        this.timeDiv.innerHTML = time;
        this.timeDiv.style.fontSize = this.hourFontSize;

        if (this.getTrue(this.hourBoldText)) {
            this.timeDiv.style.fontWeight = "bold";
        }
    }

    getDate() {
        const now = new Date();
        let dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        
        if (this.getTrue(this.showYear)) {
            dateOptions.year = 'numeric';
        }

        let date = now.toLocaleDateString(this.localeDate, dateOptions).replace(',', '');

        if (this.getTrue(this.dateCapitalize)) {
            date = date.replace(/\b\w/g, char => char.toUpperCase());
        }

        this.dateDiv.innerHTML = date;
        this.dateDiv.style.fontSize = this.dateFontSize;
    }

    setCard() {
        const card = document.createElement('ha-card');

        if (this.getTrue(this.noBackground)) {
            card.style.background = 'none'; 
            card.style.boxShadow = 'none'; 
        }

        this.content = document.createElement('div');
        this.content.style.padding = '15px';
        this.content.style.textAlign = 'center';

        this.timeDiv = document.createElement('div');
        this.timeDiv.style.lineHeight = '1em';
        this.content.appendChild(this.timeDiv);

        this.dateDiv = document.createElement('div');
        this.dateDiv.style.lineHeight = '1em';
        this.content.appendChild(this.dateDiv);

        card.appendChild(this.content);
        this.appendChild(card);
    }

    setConfig(config) {
        this.config = config;
        this.noBackground = config.no_background || false;
        this.hourFontSize = config.hour_font_size || '5em';
        this.hourBoldText = config.hour_bold_text || false;
        this.showSeconds = config.show_seconds || false;
        this.dateFontSize = config.date_font_size || '2em';
        this.dateCapitalize = config.date_capitalize || false;
        this.showYear = config.show_year || false;
        this.localeDate = config.locale_date || 'en-US';
    }

    getTrue(setting) {
        if (setting === true || setting === "true") return true
        return false
    } 

    getCardSize() {
        return 1;
    }
}

customElements.define('simple-clock', SimpleClock);
