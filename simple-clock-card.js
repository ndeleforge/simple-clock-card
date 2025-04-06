class SimpleClock extends HTMLElement {
    static NAME = "Simple Clock Card";
    static VERSION = "0.2.4";

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
        
        if (this.isTrue(this.showSeconds)) timeOptions.second = '2-digit';
        
        let time = now.toLocaleTimeString([], timeOptions);
        
        this.timeDiv.innerHTML = time;
        this.timeDiv.style.fontSize = this.hourFontSize;
        
        if (this.isTrue(this.hourBoldText)) this.timeDiv.style.fontWeight = "bold";
    }

    getDate() {
        const now = new Date();
        let dateOptions = { day: 'numeric' };
        
        dateOptions.weekday = (this.weekdayFormat === 'short') ? 'short' : 'long';
        dateOptions.month = (this.monthFormat === 'short') ? 'short' : 'long';
        
        if (this.isTrue(this.showYear)) dateOptions.year = 'numeric';
        
        let date = now.toLocaleDateString(this.localeDate, dateOptions).replace(',', '');
        
        if (this.isTrue(this.dateCapitalize)) {
            date = date.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        
        if (this.localeDate.startsWith('fr')) date = date.replace(/\b1\b/, '1er');
        
        this.dateDiv.innerHTML = date;
        this.dateDiv.style.fontSize = this.dateFontSize;
    }

    setCard() {
        const card = document.createElement('ha-card');
        
        if (this.isTrue(this.noBackground)) {
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
        this.weekdayFormat = config.weekday_format || 'long'; 
        this.monthFormat = config.month_format || 'long';
        this.showYear = config.show_year || false;
        this.localeDate = config.locale_date || 'en-US';
    }

    isTrue(setting) {
        return (setting === true || setting === "true") ? true : false;
    }
    
    getCardSize() {
        return 1;
    }
}

customElements.define('simple-clock', SimpleClock);
