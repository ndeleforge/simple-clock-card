class SimpleClock extends HTMLElement {
    static NAME = "Simple Clock Card";
    static VERSION = "0.2";

    set hass(hass) {
        if (!this.content) {
            // Create card
            const card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '15px';
            this.content.style.textAlign = 'center';

            // Hour container
            this.timeDiv = document.createElement('div');
            this.timeDiv.style.lineHeight = '1em';
            this.content.appendChild(this.timeDiv);

            // Date container
            this.dateDiv = document.createElement('div');
            this.dateDiv.style.lineHeight = '1em';
            this.content.appendChild(this.dateDiv);

            // Add containers to the card
            card.appendChild(this.content);
            this.appendChild(card);

            // Call clock
            this.getClock();
            console.log(
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
        let timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
        };
        if (this.showSeconds) timeOptions.second = '2-digit';

        let time = now.toLocaleTimeString([], timeOptions);
        this.timeDiv.innerHTML = time;
        this.timeDiv.style.fontSize = this.hourFontSize;
    }

    getDate() {
        const now = new Date();
        let dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        if (this.showYear) dateOptions.year = 'numeric';

        let date = now.toLocaleDateString(this.localeDate, dateOptions);
        date = date.replace(',', '');

        if (this.dateCapitalize) {
            date = date.replace(/\b\w/g, char => char.toUpperCase());
        }

        this.dateDiv.innerHTML = date;
        this.dateDiv.style.fontSize = this.dateFontSize;
    }

    setConfig(config) {
        this.config = config;
        this.hourFontSize = config.hour_font_size || '5em';
        this.showSeconds = config.show_seconds || false;
        this.dateFontSize = config.date_font_size || '2em';
        this.dateCapitalize = config.date_capitalize || false;
        this.showYear = config.show_year || false;
        this.localeDate = config.locale_date || 'en-US';
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('simple-clock', SimpleClock);
