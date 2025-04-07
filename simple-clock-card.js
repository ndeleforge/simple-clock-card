class SimpleClock extends HTMLElement {
    static NAME = "Simple Clock Card";
    static VERSION = "0.2.6";

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
        // Get time and date a first time
        this.getTime();
        this.getDate();
        
        // Get time every second
        setInterval(() => {
            this.getTime();
            const now = new Date();
            if (now.getSeconds() === 0) {
                this.getDate();
            }
        }, 1000);
    }

    getTime() {
        // Define time options
        const now = new Date();
        let timeOptions = { hour: '2-digit', minute: '2-digit' };
        
        // Add second if the option is set
        if (this.isTrue(this.showSeconds)) timeOptions.second = '2-digit';
        
        // Set locale time
        let time = now.toLocaleTimeString([], timeOptions);
        
        // Add it to the time container
        this.timeDiv.innerHTML = time;
        this.timeDiv.style.fontSize = this.hourFontSize;
        
        // Add bold if the option is set
        if (this.isTrue(this.hourBoldText)) this.timeDiv.style.fontWeight = "bold";
    }

    getDate() {
        // Define date options
        const now = new Date();
        let dateOptions = { day: 'numeric' };
        
        // Weekday and month format
        dateOptions.weekday = (this.weekdayFormat === 'short') ? 'short' : 'long';
        dateOptions.month = (this.monthFormat === 'short') ? 'short' : 'long';
        
        // Add year if the option is set
        if (this.isTrue(this.showYear)) dateOptions.year = 'numeric';
        
        // Set local date
        let date = now.toLocaleDateString(this.localeDate, dateOptions).replace(',', '');
        
        // Add capitalization if the option is set
        if (this.isTrue(this.dateCapitalize)) {
            date = date.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        
        // Add "er" for french date only 
        if (this.localeDate.startsWith('fr')) date = date.replace(/\b1\b/, '1er');
        
        // Cut the date in two parts if the option is set
        if (this.isTrue(this.dateBreak)) {
            const parts = date.split(' ');
            
            // Depends on if the year is displayed or not
            if (parts.length === 3) {
                const firstLine = parts[0];
                const secondLine = parts.slice(1).join(' ');
                date = `${firstLine}<br>${secondLine}`;
            } else if (parts.length === 4) {
                const firstLine = parts.slice(0, 2).join(' ');
                const secondLine = parts.slice(2).join(' ');
                date = `${firstLine}<br>${secondLine}`;
            }
        }
        
        // Add it to the date container
        this.dateDiv.innerHTML = date;
        this.dateDiv.style.fontSize = this.dateFontSize;
    }

    setCard() {
        // Define card
        const card = document.createElement('ha-card');
        
        // Remove background and shadow if the option is set
        if (this.isTrue(this.noBackground)) {
            card.style.background = 'none'; 
            card.style.boxShadow = 'none'; 
        }
        
        // Create the main container
        this.content = document.createElement('div');
        this.content.style.padding = '15px';
        this.content.style.textAlign = 'center';
        
        // Switch the container to flex style if option is set
        this.content.style.display = (this.isTrue(this.oneRow)) ? 'flex' : 'block';
        if (this.isTrue(this.oneRow)) {
            this.content.style.flexDirection = 'row';
            this.content.style.justifyContent = 'space-evenly';
            this.content.style.alignItems = 'center';
            this.content.style.gap = '10px';
        }
        
        // Create the time container
        this.timeDiv = document.createElement('div');
        this.timeDiv.style.lineHeight = '1em';
        this.content.appendChild(this.timeDiv); 
        
        // Create the date container
        this.dateDiv = document.createElement('div');
        this.dateDiv.style.lineHeight = '1em';
        
        // Force the date aligned at left if some options are set together
        if (this.isTrue(this.oneRow) && this.isTrue(this.dateBreak)) {
            this.dateDiv.style.textAlign = 'left';
            this.dateDiv.style.whiteSpace = 'pre-line';
        }
        
        this.content.appendChild(this.dateDiv);
        
        // Add all elements to the card
        card.appendChild(this.content);
        this.appendChild(card);
    }

    setConfig(config) {
        this.config = config;
        this.noBackground = config.no_background || false;
        this.oneRow = config.one_row || false ;
        this.hourFontSize = config.hour_font_size || '5em';
        this.hourBoldText = config.hour_bold_text || false;
        this.showSeconds = config.show_seconds || false;
        this.dateFontSize = config.date_font_size || '2em';
        this.dateCapitalize = config.date_capitalize || false;
        this.weekdayFormat = config.weekday_format || 'long'; 
        this.monthFormat = config.month_format || 'long';
        this.showYear = config.show_year || false;
        this.localeDate = config.locale_date || 'en-US';
        this.dateBreak = config.date_break || false;
    }

    isTrue(setting) {
        return (setting === true || setting === "true") ? true : false;
    }
    
    getCardSize() {
        return 1;
    }
}

customElements.define('simple-clock', SimpleClock);
