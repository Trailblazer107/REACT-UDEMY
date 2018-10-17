import { _trim } from "./util"
/* eslint-disable no-useless-escape, no-param-reassign */
export function urlPrettify(input) {
    if (input) {
        return input.toLowerCase().replace(/ /g, "-")
    }
    return input
}
export function urlUnPrettify(input) {
    if (input) {
        return input.replace(/(?!-$)-|_/g, " ").replace(/\w\S*/g, txt =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    }
    return input
}
/**
 * function toSeoUrl
 * Producing SEO friendly URL
 * @export
 * @param {string} url
 * @returns {string}
 */
export function toSeoUrl(url) {
    // make the url lowercase
    if (typeof url === "undefined") {
        return ""
    }
    let encodedUrl = url.toString().toLowerCase()
    // replace & with and
    encodedUrl = encodedUrl.split(/\&+/).join("and")
    // remove invalid characters
    encodedUrl = encodedUrl.split(/[^()a-z0-9]/).join("-")
    // remove duplicates
    // encodedUrl = encodedUrl.split(/-+/).join("-")
    // trim leading & trailing characters
    encodedUrl = _trim(encodedUrl.replace(/\-{2,5}/g, "-"), "-")
    return encodedUrl
}
export function htmlEntityDecode(str) {
    return str
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&quot;/g, "\"")
}

export function isEqualUriSeo(param1, param2) {
    return (
        toSeoUrl(htmlEntityDecode(decodeURIComponent(param1))).toUpperCase()
        === toSeoUrl(htmlEntityDecode(decodeURIComponent(param2))).toUpperCase()
    )
}
export function pad(no, length) {
    let zeros = ""
    // create zeros for the required length
    for (let i = 0; i < length; i += 1) {
        zeros += "0"
    }
    no = "" + no
    return zeros.substring(0, zeros.length - no.length) + no
}
export function safe(input) {
    if (input) {
        return input.replace(/\W/g, "")
    }
    return input
}

export function convertCurrency(from, to, amount, precisions, InitData) {
    const exchangeRates = InitData.exchangeRates
    if (from === to || !exchangeRates[from] || !exchangeRates[to]) {
        return amount
    }

    if (precisions === "undefined" || isNaN(parseInt(precisions, 10))) {
        precisions = 2
    }

    const fromAmount = parseFloat(amount / exchangeRates[from]).toFixed(4)
    const toAmount = parseFloat(fromAmount * exchangeRates[to])
    // this is becahse rounding used by toFixed method
    // In server side amount is output without rounding
    // also to avoid javascript edge cases in floatint point numbers
    const re = new RegExp("^-?\\d+(?:\.\\d{0," + (precisions || -1) + "})?")
    const finalAmount = toAmount.toString().match(re)[0]
    return finalAmount
}

export function convertToUSD(from, amount) {
    return this.convertCurrency(from, "USD", amount)
}

export function formatCurrency(amount) {
    return parseFloat(amount).toFixed(2)
}
/**
 * function dateFormater
 * convert date string into date formate for reviews
 * @export
 * @param {string} dateVal
 * @param {bool} arrFormate
 * @returns {string}
 */
export function dateFormater(dateVal, arrFormate = false) {
    const d = new Date(dateVal)
    const day = ("0" + d.getUTCDate()).slice(-2)
    const year = d.getUTCFullYear()
    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ]
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    const month = months[d.getUTCMonth()]
    const dayString = days[d.getUTCDay()]
    if (arrFormate) {
        const result = [dayString, day, month, year]
        return result
    }
    return (`${month} ${day}, ${year}`)
}

/**
 * function dateFormater
 * convert date string into date formate for reviews
 * @export
 * @param {string} price
 * @returns {string}
 */
export function priceFormat(price) {
    let p = String(price)
    if (!/,/.test(p)) {
        p = p.replace(/(\d)(?=(\d{3})+(\.\d+)?$)/g, "$1,")
    }
    return p.replace(/\.00$/, "")
}
/* eslint-enable no-useless-escape, no-param-reassign */
