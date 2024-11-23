# Simple Clock Card

<div align="center">

[![GitHub license](https://img.shields.io/github/license/ndeleforge/binocle?style=for-the-badge)](https://github.com/ndeleforge/binocle/blob/main/LICENCE)
![GitHub last commit](https://img.shields.io/github/last-commit/ndeleforge/binocle?style=for-the-badge)
[![GitHub forks](https://img.shields.io/github/forks/ndeleforge/binocle?style=for-the-badge)](https://github.com/ndeleforge/binocle/network)
[![GitHub stars](https://img.shields.io/github/stars/ndeleforge/binocle?style=for-the-badge)](https://github.com/ndeleforge/binocle/stargazers)

This clock card is made for anybody which is looking for a simple, no fancy clock card.

![Card example](/docs/images/card.png)

</div>

# Usage

This card is not available on HACS. It means it must be installed manually.   

## Installation 
- Download the `SimpleClockCard.js` file.
- Add it to your `www` Home-Assistant folder.  
- Add the ressource to your Home-Assistant.

## Configuration

In order to add the clock in your dashboard, create a manual card and add this :

```
type: custom:simple-clock
```

## Parameters

| Parameter | Required | Description | Default value
| -------------- | ------------ | --------------- | -----------------
| type | Yes | Name of the card | none
| no_background | No | Hide the background card | false
| hour_font_size | No | Define hour font size | 5em
| hour_bold_text | No | Put time in bold | false
| show_seconds | No | Show seconds | false
| date_font_size | No | Define date font size | 2em
| date_capitalize | No | Capitalize date (day and month) | false
| show_year | No | Show year | false
| locale_date | No | Define locale for date | en-US

