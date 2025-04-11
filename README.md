# Simple Clock Card

<div align="center">

[![GitHub license](https://img.shields.io/github/license/ndeleforge/simpleClockCard?style=for-the-badge)](https://github.com/ndeleforge/binocle/blob/main/LICENCE)
![GitHub last commit](https://img.shields.io/github/last-commit/ndeleforge/simpleClockCard?style=for-the-badge)
[![GitHub forks](https://img.shields.io/github/forks/ndeleforge/simpleClockCard?style=for-the-badge)](https://github.com/ndeleforge/binocle/network)
[![GitHub stars](https://img.shields.io/github/stars/ndeleforge/simpleClockCard?style=for-the-badge)](https://github.com/ndeleforge/binocle/stargazers)

This clock card is made for anybody which is looking for a simple, no fancy clock card.

![Card example](/docs/images/card.png)

</div>

# Usage

This card is not available on HACS.

## Manual Installation

- Download the `simple-clock-card.js` file.
- Add it to your `www` Home-Assistant folder.  
- Add the ressource to your Home-Assistant via the [GUI](https://my.home-assistant.io/redirect/lovelace_resources/).
```
/local/simple-clock-card.js
```
- Do not hesitate to clear your cache.

## Manual update

- Download the new `simple-clock-card.js` file.
- Replace the old one in your `www` Home-Assistant folder.
```
/local/simple-clock-card.js?v=x
```
- Change the x value by anything to force your browser to reload it.

# Configuration

In order to add the clock in your dashboard, create a manual card and add this :

```
type: custom:simple-clock
```

## Parameters

| Parameter | Required | Description | Type | Default value
| -------------- | ------------ | --------------- | ------- | -----------------
| type | Yes | Name of the card | string | none
| no_background | No | Hide the background card | boolean | false
| one_row | No | Hour and date will be displayed in one row | boolean | false
| **Hour settings**
| hour_font_size | No | Define hour font size | string | 5em
| hour_bold_text | No | Put time in bold | boolean | false
| show_seconds | No | Show seconds | boolean | false
| **Date settings**
| date_font_size | No | Define date font size | string | 2em
| date_capitalize | No | Capitalize date (day and month) | boolean | false
| weekday_format | No | Put the weekday in *short* or *long* format | string | long
| month_format | No | Put the month in *short* or *long* format | string | long
| show_year | No | Show year | boolean | false
| locale_date | No | Define locale for date | string | en-US
| break_date | No | Break the date into two parts | boolean | false

## Examples

### No options

![No option example](/docs/images/no_options.png)

```YAML
type: custom:simple-clock
```

### All in one, no background

![All in one] example](/docs/images/all_in_one.png)

```YAML
type: custom:simple-clock
show_year: true
show_seconds: true
no_background: true
```

### One row, short size

![One row example](/docs/images/one_row.png)

```YAML
type: custom:simple-clock
hour_bold_text: true
one_row: true
weekday_format: short
month_format: short
```

### One row, full size

![One row full example](/docs/images/one_row_full.png)

```YAML
type: custom:simple-clock
hour_bold_text: true
hour_font_size: 6.5em
one_row: true
break_date: true
show_year: true
```