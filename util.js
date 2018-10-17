import { pad, toSeoUrl } from "./Formatter"
import configs from "../../../config/index"
import { get } from "../api"

/* eslint-disable */
/**
 * function debounce
 *
 * @export
 * @param {any} fn
 * @param {any} wait
 * @param {any} immediate
 * @returns
 */
 export function debounce(fn, wait, immediate) {
     wait || (wait = 250)
     let timeout
     let args
     let context
     let timestamp
     let result

     const later = function later() {
        //  console.log("_TimeStamp", timestamp)
         const last = +(new Date()) - timestamp
         if (last < wait && last >= 0) {
             timeout = setTimeout(later, wait - last)
         } else {
             timeout = null
             if (!immediate) {
                //  console.log("_result1", result)
                 result = fn.apply(context, args)
                 if (!timeout) {
                     context = args = null
                    }
                }
         }
        }
        
        return function debounced() {
            context = this
            // console.log("_Context_This", this)
            args = arguments
            // console.log("_arguments", arg)
            timestamp = +(new Date())
            
            const callNow = immediate && !timeout
            
            if (!timeout) {
                timeout = setTimeout(later, wait)
            }
            if (callNow) {
                result = fn.apply(context, args)
                context = args = null
            }
            
         return result
     }
 }

/**
 * function throttle
 *
 * @export
 * @param {any} fn      fn which will be executed
 * @param {any} wait    timeout time
 * @param {any} scope
 * @returns {function}
 */
export function throttle(fn, wait, scope) {
    console.log("throttle arguments", fn, wait, scope)
    wait || (wait = 250)
    let last,
        deferTimer
    return function() {
        let context = scope || this

        let now = +new Date,
            args = arguments
        if (last && now < last + wait) {
            // hold on to it
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                fn.apply(context, args)
            }, wait)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
/**
 * function get style of element
 *
 * @export
 * @param {obj} obj object
 * @returns string
 */
export function getObjType(obj) { 
    console.log("get Object called", Object.prototype.toString.call(obj).slice(8, -1))
    return Object.prototype.toString.call(obj).slice(8, -1)
}
/**
 * function get style of element
 *
 * @export
 * @param {DOM} obj    dom element
 * @param {string} attr    attribute which wanna get
 * @returns string
 */
export function getStyle(obj, attr) {
    //Gets style of a passed attrubute
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    }
    return document.defaultView.getComputedStyle(obj, null)[attr]
    // mdn .getComputedStyle(obj, null)[attr];
}


/**
* function offlineStore
* return nothing storeData in localStorage
*
* @export
* @param {string} name
* @param {array} data
* @param {boolean} isSessionStorage false=localStorage else sessionStore
* @returns {boolean}
*/
export function offlineStore(name, data, isSessionStorage=false) {
    if (typeof (Storage) !== "undefined") {
        // Store user details in local storage
        if (isSessionStorage) {
            sessionStorage.setItem(name, JSON.stringify(data))
        } else {
            localStorage.setItem(name, JSON.stringify(data))
        }
        return true
    }
    return false
}

/**
* function offlineRetrive
* return data or null
*
* @export
* @param {string} name
* @param {boolean} isSessionStorage false=localStorage else sessionStore
* @returns {array}
*/
export function offlineRetrive(name, isSessionStorage=false) {
    if (typeof (Storage) !== "undefined") {
        // Retrive User data from local storage
        if (isSessionStorage && sessionStorage.getItem(name) !== null) {
            return JSON.parse(sessionStorage.getItem(name))
        } else if (localStorage.getItem(name) !== null) {
            return JSON.parse(localStorage.getItem(name))
        }
    }
    return null
}

/**
* function removeStorage
* remove from localStorage
*
* @export
* @param {string} name
* @param {boolean} isSessionStorage false=localStorage else sessionStore
* @returns {boolean}
*/
export function removeFromStorage(name, isSessionStorage=false) {
    if (typeof (Storage) !== "undefined") {
        if (isSessionStorage) {
            sessionStorage.removeItem(name)
        } else {
            localStorage.removeItem(name)
        }
        return true
    }
    return false
}

/**
* function recentlyViewed
* use to add product into recently viewed
* return true or false
*
* @author palakt.bipl@gmail.com
* @export @param {time} time
* @param {string} id
* @returns {boolean}
*/
export function addToRecentlyViewed(id) {
    if (id == 0 || _isNil(id)) {
        return false
    }
    id = id + ""
    const data = {
        id,
        time: _now()
    }
    let retriveData = offlineRetrive("recentlyViewed")
    if(!retriveData) {
        return offlineStore("recentlyViewed", [data])
    }
    _remove(retriveData, item => item.id === data.id)
    retriveData.unshift(data)
    if(retriveData.length > 5) {
        retriveData = retriveData.slice(0, 5)
    }
    return offlineStore("recentlyViewed", retriveData)
}


/**
* function recentlyViewed
* use to remove product from recently viewed
* return true or false
*
* @author palakt.bipl@gmail.com
* @export @param {time} time
* @param {string} id
* @returns {boolean}
*/
export function removeFromRecentlyViewed(id) {
    if (_isNil(id)) {
        return false
    }
    id = id +""
    let retriveData = offlineRetrive("recentlyViewed")
    if(!retriveData) {
        return false
    }
    _remove(retriveData, item => item.id === id)
    return offlineStore("recentlyViewed", retriveData)
}

/**
* function offlineStore
* return nothing storeData in localStorage
*
* @export
* @param {string} name
* @param {array} data
* @returns {boolean}
*/
export function sessionStore(name, data) {
    if (typeof (Storage) !== "undefined") {
        // Store user details in local storage
        sessionStorage.setItem(name, JSON.stringify(data))
        return true
    }
    return false
}

/**
* function offlineRetrive
* return data or null
*
* @export
* @param {string} name
* @param {array} data
* @returns {array}
*/
export function sessionRetrive(name) {
    if (typeof (Storage) !== "undefined") {
        // Retrive User data from local storage
        const Data = sessionStorage.getItem(name)
        return JSON.parse(Data)
    }
}

/**
* function removeStorage
* remove from localStorage
*
* @export
* @param {string} name
* @returns {boolean}
*/
export function sessionFromStorage(name) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.removeItem(name)
        return true
    }
    return false
}

/**
 * @depricated Use asyncScriptLoad instead
 *
 * @param {*} url
 * @param {*} cb
 */
export function loadScript(url, cb) {
    const scr = document.createElement("script")
    scr.type = "text/javascript"
    if (scr.readyState) {
        scr.onreadystatechange = () => {
            if (scr.readyState === "loaded" || scr.readyState ==="complete") {
                scr.onreadystatechange = null
                cb()
            }
        }
    } else {
        scr.onload = cb
    }
    scr.src = url
    document.getElementsByTagName("head")[0].appendChild(scr)
}

/**
 * Load script asynchronously
 * @todo Need to replace loadScript with this function
 * @todo Test callback parameter
 *
 * @param {string}   r  Script URL
 * @param {string}   i  Script ID
 * @param {function} cb Callback function
 *
 * @author Gihan S <gihanshp@gmail.com>
 */
export function asyncScriptLoad(r, i, cb) {
    let d = document
    let s = "script"
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(i)){
      if(cb && typeof cb === "function") {
        cb();
      }
      return;
    }
    js = d.createElement(s); js.id = i;
    js.async = true;
    js.src = r;
    if(cb && typeof cb === "function") {
        js.addEventListener(
            'load',
            (e) => {
                cb.call()
            },
            false
        );
    }
    fjs.parentNode.insertBefore(js, fjs);
}

export const addToBookingStore = (name, data) => {
    let retriveData = offlineRetrive(name, true)
    if(!retriveData) retriveData = {}
    retriveData[data.product_id] = data
    offlineStore(name, retriveData, true)
}

export const initFilterData = () => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    const checkIn = d.getFullYear() + "-" + pad(d.getMonth() + 1, 2) + "-" + pad(d.getDate(), 2)
    d.setDate(d.getDate() + 1)
    const checkOut = d.getFullYear() + "-" + pad(d.getMonth() + 1, 2) + "-" + pad(d.getDate(), 2)
    
    console.log("_padded", pad(d.getMonth() + 1, 2))
    return {
        keywords: "",
        pageSize: 15,
        page: 1,
        img_size: "674x",
        product_entity_type: "",
        start_date: checkIn,
        checkout_date: checkOut, // "2017-05-20"
        room_adult_total: 2,
        room_child_total: 0,
        latitude: 34.0521019,
        longitude: -118.2436196,
        count: 0,
        advancedSearch: {}
    }

}

export const initTabData = () => [{
    entity: "All",
    entityId: "",
    isEnabled: true
},
{
    entity: "Things to Do",
    entityId: 0,
    isEnabled: false
},
{
    entity: "MultiDay Tours",
    entityId: 1,
    isEnabled: false
},
{
    entity: "Transportation",
    entityId: 4,
    isEnabled: false
},
{
    entity: "Hotels",
    entityId: 3,
    isEnabled: true
},
{
    entity: "Cruises",
    entityId: 2,
    isEnabled: false
}]

export const getSortingFilter = (entityId,algoliaInd) => {
    console.log("_algoliaInd", entityId, algoliaInd)
    let filterObj
    if(parseInt(entityId,10) === 3){
        filterObj = [{
            title:"Hotel Best Value",
            t:"TEXT_HOTEL_BEST_VALUE",
            key:"best-asc",
            algoliaInd,
        },{
            title:"Hotel Star",
            t:"TEXT_HOTEL_STAR",
            key:"star-asc",
            algoliaInd,
        },{
            title:"Hotel Distance",
            t:"TEXT_HOTEL_DISTANCE",
            key:"distance-asc",
            algoliaInd,
        },{
            title:"Price: low to high",
            t:"TXT_SORT_PRICE_ASC",
            key:"price-asc",
            algoliaInd,
        },{
            title:"Price: high to low",
            t:"TXT_SORT_PRICE_DESC",
            key:"price-desc",
            algoliaInd,
        }]
    }else{
        filterObj = [{
            title:"Popularity: high to low",
            t:"TXT_SORT_POPULARITY_DESC",
            key:"",
            algoliaInd,
        },{
            title:"Avg. Customer Review",
            t:"TXT_SORT_RATING_DESC",
            key:"rating-desc",
            algoliaInd:"t4f_rating_desc",
            algoliaIndEs:"t4fes_rating_desc",
        },{
            title:"Price: low to high",
            t:"TXT_SORT_PRICE_ASC",
            key:"price-asc",
            algoliaInd:"t4f_price_asc",
        },{
            title:"Price: high to low",
            t:"TXT_SORT_PRICE_DESC",
            key:"price-desc",
            algoliaInd:"t4f_price_desc",
        },{
            title:"Duration: short to long",
            t:"TXT_SORT_DURATION_ASC",
            key:"duration-asc",
            algoliaInd:"t4f_duration_asc",
        },{
            title:"Duration: long to short",
            t:"TXT_SORT_DURATION_DESC",
            key:"duration-desc",
            algoliaInd:"t4f_duration_desc",
        }]
    }
    return filterObj
}
/**
 * formate date to DD-MM-YYYY
 *
 * @param {date}   tdate  date Object
 *
 * @author Pratik B <pratikb.bipl@gmail.com>
 */
export function reFormateDate(tdate) {
    
    const mm = tdate.getMonth() + 1 // getMonth() is zero-based
    const dd = tdate.getDate()

    console.log("__Date format", mm, dd)
    return [tdate.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd].join("-")
}

/**
 * function to check value isEmpty
 *
 * @export
 * @param val  The value to check.
 * @returns boolean Returns true if value is empty, else false
 */
export function _isEmpty(val) {
    if(
        !val
        || (typeof (val.length) !== "undefined" && val.length === 0)
        || (typeof val === "object" && Object.keys(val).length === 0)
    ) {
      return true
    }
    return false
}

/**
 * Creates a shallow clone of value.
 *
 * @export
 * @param val (*): The value to clone.
 * @returns *  Returns the cloned value.
 */
export function _clone(val) {
    if (null == val || "object" != typeof val) return val
    var copy = val.constructor()
    for (var attr in val) {
      if (val.hasOwnProperty(attr)) copy[attr] = val[attr]
    }
    return copy
}

/**
 * function to craete clone
 *
 * @export
 * @param val (*): The value to clone.
 * @returns *  Returns the cloned value.
 */
export function _round(val, precision= 0) {
    return parseFloat(val).toFixed(precision)
}

/**
 * Removes all elements from array/Object that predicate returns truth
 *
 * @param val (*): value
 * @param (Function): The function invoked per iteration
 * @returns  Returns the new val of removed elements
 */
export function _remove(val,cb) {
  let isDeleted = false
  if(Array.isArray(val)){
      val.map((item,key) => {
        if (cb(item)) {
           val.splice(key, 1)
           isDeleted =true
         }
       })
    } else{
      Object.keys(val).map(key => {
        if(cb(val[key])) {
          delete val[key]
          isDeleted =true
        }
      })
  }
  return isDeleted
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @returns  (number): Returns the timestamp
 */
export function _now() {
    return new Date().getTime()
}

/**
 * Checks if value is null or undefined.
 *
 * @param val (*): value
 * @returns (boolean): Returns true if value is nullish, else false.
 */
export function _isNil(val) {
    if (val === null || typeof val === "undefined") {
      return true
    }
    return false
}


/**
 * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 *
 * @param arr (Array): The array to modify.
 * @returns (Array): Returns array.
 */
export function _reverse(arr) {
    return arr.reverse()
}

/**
 * Checks if value is classified as a Function object.
 *
 * @param fun (*): The value to check.
 * @returns (boolean): Returns true if value is a function, else false.
 */
export function _isFunction(fun) {
    if (typeof fun === "function") {
        return true
    }
    return false
}

/**
 * Removes leading and trailing whitespace or specified characters from string
 *
 * @param [str=''] (string): The string to trim.
 * @param [chars] (string): The characters to trim.
 * @returns (string): Returns the trimmed string.
 */
export function _trim(str="", chars=null) {
    let result = str
    if (chars !== null) {
        while (~chars.indexOf(result[0])) {
          result = result.slice(1);
        }
        while (~chars.indexOf(result[result.length - 1])) {
          result = result.slice(0, -1);
        }
    }
    return result.trim()
}

/**
 * Checks if value is classified as an Array object.
 *
 * @param val (*): The value to check.
 * @returns (boolean): Returns true if value is an array, else false.
 */
export function _isArray(val) {
    if (Array.isArray(val)) {
      return true
    }
    return false
}

/**
 * Checks if value is classified as a object.
 *
 * @param val (*): The value to check.
 * @returns (boolean): Returns true if value is an object, else false.
 */
export function _isObject(val) {
    return (!!val) && (val.constructor === Object)
}

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 *
 * @param collection (Array|Object): The collection to inspect.
 * @param [predicate=_.identity] (Function): The function invoked per iteration.
 * @returns (*): Returns the matched element, else undefined.
 */
  export function _find(collection, predicate) {
    if (collection !== null && _isFunction(predicate)) {
        return collection.find(predicate)
    }
    return undefined
}

/**
 * This method is like _find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
 *
 * @param arr (Array): The array to inspect.
 * @param [predicate=_.identity] (Function): The function invoked per iteration.
 * @returns (number): Returns the index of the found element, else -1.)
 */
  export function _findIndex(arr, predicate) {
    if (_isArray(arr)) {
      return arr.indexOf(_find(arr, predicate))
    }
    return -1
}

/**
 * Gets the last element of array.
 *
 * @param array (Array): The array to query.
 * @returns (*): Returns the last element of array.
 */
export function _last(arr) {
    return arr[arr.length - 1]
}

/**
 * Splits string by separator.
 *
 * @param [str=''] (string): The string to split.
 * @param separator (string): The separator pattern to split by.
 * @param [limit] (number): The length to truncate results to.
 * @returns (Array): Returns the string segments.
 */
export function _split(str="", separator, limit) {
    return str.split(separator, limit)
}

/**
 * Creates an array of values by running each element in collection thru iteratee.
 *
 * @param collection (Array|Object): The collection to iterate over.
 * @param [iteratee=_.identity] (Function): The function invoked per iteration.
 * @returns (Array): Returns the new mapped array.
 */
export function _map(collection, iteratee) {
    if (_isArray(collection)) {
      return collection.map((item, key) => iteratee(item, key))
    } else if (_isObject(collection)) {
        const result = Object.keys(collection)
        return result.map(key => iteratee(collection[key], key))
    }
    return []
}

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * @param val (*): The value to compare.
 * @param oval (*): The other value to compare.
 * @returns (boolean): Returns true if the values are equivalent, else false.
 */
export function _isEqual(val, oval) {
    return (JSON.stringify({a: val}) === JSON.stringify({a: oval}))
}

/**
 * Checks if `string` starts with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 */
export function _startsWith(string, target, position) {
  const { length } = string
  position = position == null ? 0 : position
  if (position < 0) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  target = `${target}`
  return string.slice(position, position + target.length) == target
}

/**
 * Checks if `string` ends with the given target string.
 *
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 */
export function _endsWith(string, target, position) {
    const { length } = string
    position = position === undefined ? length : +position
    if (position < 0 || position != position) {
      position = 0
    }
    else if (position > length) {
      position = length
    }
    const end = position
    position -= target.length
    return position >= 0 && string.slice(position, end) == target
}

/**
 * Gets the index at which the first occurrence of value is found in array
 *
 * @param arr (Array): The array to inspect.
 * @param val (*): The value to search for.
 * @param {number} [position=0] The position to search from.
 * @returns (number): Returns the index of the matched value, else -1.
 */
export function _indexOf(arr, val, position = 0) {
  if (_isArray(arr)) {
    return arr.indexOf(val, position)
  }
  return -1
}

/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
 export function _filter(array, predicate) {
  let index = -1
  let resIndex = 0
  const length = array == null ? 0 : array.length
  const result = []

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result[resIndex++] = value
    }
  }
  return result
}

/**
 * Get user agent string
 *
 * @returns {String} Returns user agent string.
 */
 export function getuserAgent() {
   if (navigator) {
     const userAgent = navigator.userAgent || navigator.vendor || window.opera
     if (/windows phone/i.test(userAgent)) {
       return "Windows Phone"
     }
     if (/android/i.test(userAgent)) {
       return "Android"
     }
     // iOS detection from: http://stackoverflow.com/a/9039885/177710
     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       return "iOS"
     }
     return "unknown"
   }
   return "unknown"
}

/**
 * Is safari browser?
 */
export function isSafari() {
    if (!navigator) {
        return false
    }
    return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
}
/**
 * Get user agent string
 *
 * @author tony <tonys9204@gmail.com>
 * @param {obj} document
 * @returns {String} Returns user agent string.
 */
export function getUsefulDocObj(document) {
    return document.scrollingElement
}

/**
 * Get user agent string
 *
 * @author tony <tonys9204@gmail.com>
 * @param {boolen} open status of popup or modal
 * @param {number} currentScrollingPosition current scrollTop Position when popup or modal open
 * @returns {none}
 */
export function configPopup(open, currentScrollingPosition) {
    if (open) {
        document.body.classList.add("prevent_scroll")
        document.body.style.top = -currentScrollingPosition + "px"
    } else {
        document.body.classList.remove("prevent_scroll")
        document.scrollingElement.scrollTop = currentScrollingPosition
        document.body.style.top = ""
    }
}

/**
 * Is browser cabpable of handling webp images
 * 
 * @returns {boolean} Returns true if browser support, otherwise false
 * 
 * @author Gihan S <gihanshp@gmail.com>
 */
export function isWebpCapable() {
    // this function only works for browser environment
    if (typeof window === "undefined") {
        return false
    }
    // window.isWebpCapable set from the server side
    if (typeof window.isWebpCapable !== "boolean") {
        return false
    }
    return window.isWebpCapable
}

/**
 * Remove image resizing parameters from url
 * 
 * @param {string} url Image url
 * 
 * @return {string} Image url after removing resize parameters
 * 
 * @author Gihan S <gihanshp@gmail.com>
 */
function removeImageResizingParams(url) {
    return url.replace(/\?imageView2\/\d\/.*$/, '')
}

/**
 * Parse image url to resizing params
 * 
 * @param {string} Image url
 * 
 * @return {Object} Image resizing parameters
 * 
 * @author Gihan S <gihanshp@gmail.com>
 */
function getParsedImageResizingParams(url) {
    if (!/\?imageView2\/\d\/.*$/.test(url)) {
        return {}
    }

    const matches = url.match(/\?imageView2\/\d\/.*$/)
    const parts = matches[0].split("/")
    const params = {}
    for (let i = 0; i < parts.length; i += 1) {
        switch (parts[i]) {
            case "w":
            case "h":
            case "q":
            case "format":
                params[parts[i]] = parts[i + 1]
        }
    }
    return params
}

/**
 * Fix image url resizing params and protocol
 * 
 * @param {string} url Image url to fix
 * @param {number} width   Image width
 * @param {number} height  Image height
 * @param {number} quality Image Quality
 * @param {number} mode    Crop mode, possible values are [1-5]
 * @param {string} format  [auto] Image format
 *
 * @return {string} Image url
 * 
 * @author Tony <tonys9204@gmail.com>, Gihan S <gihanshp@gmail.com>
 */
export function fixImageUrl(url, width, height, quality, mode, format = "auto") {
    if (!url) {
        return ""
    }
    const isT4fCdn = _startsWith(url, configs.cdn.url) || _startsWith(url, configs.cdn.sslUrl)
    if (isT4fCdn) {
        const parsedParams = getParsedImageResizingParams(url)
        const overrideParams = {}
        url = removeImageResizingParams(url) + "?imageView2"
        // build new image url
        if (
            (
                width
                && height
                && typeof mode == "undefined"
            )
            || (
                parsedParams.width
                && parsedParams.height
            )
        ) {
            url += `/5` // crop and scale
        } else if (mode) {
            url += `/${mode}`
        } else {
            url += `/2` // default mode is 2
        }

        if (width) {
            overrideParams["w"] = width
        }
        if (height) {
            overrideParams["h"] = height
        }
        if (quality) {
            overrideParams["q"] = quality
        }
        if (format) {
            overrideParams["format"] = format
        }
        // add format as auto
        else {
            overrideParams["format"] = "auto"
        }
        const params = { ...parsedParams, ...overrideParams }
        Object.keys(params).map((key) => {
            url += `/${key}/${params[key]}`
        })

        // remove auto for Qiniu urls
        if (/\/\w{2}\/\w{2}\/\w{3}\/\w{3}\/.*.(jpg|jpeg|png|gif|webp)/.test(url)) {
            const format = isWebpCapable() ? "webp" : "jpg"
            url = url.replace(/format\/auto/, "format/" + format)
        }
    }

    // fix for https
    url = url.replace(/^http:\/\//, "https://").replace(" ", "%20")
    return url
}

/** Used to map HTML entities to characters. */
const htmlUnescapes = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&#39;": "'"
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 */

 export function _unescape(string) {
     return (string && reHasEscapedHtml.test(string))
     ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity])
     : string
 }

/**
* function addCookie
* return true/false
*
* @export
* @param {string} name
* @param {any} value
* @param {time} time
* @param {boolean} stringify true=use JSON.stringify to store value
* @returns {boolean}
*/
export function addCookie(name, value, time = (24 * 60 * 60 * 1000), stringify = true) {
    if(typeof document !== "undefined") {
        const d = new Date()
        d.setTime(d.getTime() + time)
        const expires = "expires="+d.toUTCString()
        stringify ?
            document.cookie = name+ "=" + JSON.stringify(value) + "; " + expires
            :
            document.cookie = name + "=" + value + "; " + expires
        if(document.cookie)
            return true
    }
    return false
}

/**
* function readCookie
* return match value/false
*
* @export
* @param {string} name
* @param {boolean} stringify true=use JSON.stringify to read value
* @returns {any}
*/
export function readCookie(name, stringify = true) {
    if (typeof document !== "undefined") {
        let result = document.cookie.match(new RegExp(name + '=([^;]+)'))
        stringify ?
            result && (result = JSON.parse(result[1]))
            :
            result && (result = result[1])
        return result
    }
    return false
}


/**
 * Validate email address
 * 
 * @param {string} email Email address to validate
 */
export function isEmail(email) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

/**
 * Get Rounded Price 
 *
 * @param {number}   price  Price
 * @param {string}   flag  conversion flag
 * @param {string}   currency  currency code
 *
 * @author Pratik B <pratikb@gmail.com>
 */
export function getRoundedPrice(price, flag=false, currency="USD") {
    if (flag === "down" && currency !== "USD") {
        return Math.floor(price)
    } else if (flag === "up" && currency !== "USD") {
        return Math.ceil(price)
    } else {
        return parseFloat(price).toFixed(2)
    }
}

/**
 * Get Increment / Decrement index
 *
 * @param {number}   totaIndex  Count of total available index
 * @param {number}   curValuePos  Current position
 * @param {number}   incDecFlag  For increment pass 1 for decrement -1
 *
 * @author Pratik B <pratikb@gmail.com>
 */
export function getIndexIncDec(totaIndex, curValuePos, incDecFlag) {
    let newIndex = curValuePos + incDecFlag
    if (newIndex >= totaIndex) {
        newIndex = totaIndex - 1
    } else if (newIndex < 0){
        newIndex = 0
    }
    return newIndex
}

/**
 * Process history queue
 * 
 * @author Gihan S <gihanshp@gmail.com>
 */
export function processHistoryQueue() {
    // ensure this run in window environment and has somethig to process
    if (
        !window
        || !window.historyQueue
        || window.historyQueue.length === 0
        || window.historyQueueProcessing
    ) {
        return
    }

    // start processing and avoid duplicate triggers
    window.historyQueueProcessing = true
    // use timeout to give react time to set the page title and settle down
    window.setTimeout(() => {
        while (window.historyQueue.length > 0) {
            const action = window.historyQueue.shift()
            switch (typeof action) {
                case "object":
                    if (action.type === "function") {
                        action.exec(...action.args)
                    }
                    break
                case "function":
                    action()
                    break
            }
        }
        window.historyQueueProcessing = false
    }, 200)
}

/* eslint-enable */

function checkForCloseMatch(longString, shortString, isDomain) {
    // too many false positives with very short strings
    if (shortString.length < 3) {
        return ""
    }

    if (typeof longString === "undefined") {
        return ""
    }

    // test if the shortString is in the string (so everything is fine)
    if (longString.includes(shortString)) {
        // Added to check the domain like : agmail.com / gmaill.com
        if (isDomain) {
            const [domain] = longString.split(".")
            return longString.replace(domain, shortString)
        }
        return ""
    }

    // split the shortString string into two at each postion e.g. g|mail gm|ail gma|il gmai|l
    // and test that each half exists with one gap
    let newLongString = ""
    for (let i = 1; i < shortString.length; i += 1) {
        const firstPart = shortString.substring(0, i)
        const secondPart = shortString.substring(i)

        // test for wrong letter
        const wrongLetterRegEx = new RegExp(firstPart + "." + secondPart.substring(1))
        if (wrongLetterRegEx.test(longString)) {
            newLongString = longString.replace(wrongLetterRegEx, shortString)
            // eslint-disable-next-line
            longString = newLongString
            if (!isDomain && longString.includes(shortString)) {
                return longString
            }
        }

        // test for extra letter
        const extraLetterRegEx = new RegExp(firstPart + "." + secondPart)
        if (extraLetterRegEx.test(longString)) {
            newLongString = longString.replace(extraLetterRegEx, shortString)
            // eslint-disable-next-line
            longString = newLongString
            if (!isDomain && longString.includes(shortString)) {
                return longString
            }
        }

        // test for missing letter
        if (secondPart !== "mail") {
            const missingLetterRegEx = new RegExp(firstPart + "{0}" + secondPart)
            if (missingLetterRegEx.test(longString)) {
                newLongString = longString.replace(missingLetterRegEx, shortString)
                // eslint-disable-next-line
                longString = newLongString
                if (!isDomain && longString.includes(shortString)) {
                    return longString
                }
            }
        }

        // test for switched letters
        const switchedLetters = [
            shortString.substring(0, i - 1),
            shortString.charAt(i),
            shortString.charAt(i - 1),
            shortString.substring(i + 1),
        ].join("")
        if (longString.includes(switchedLetters)) {
            newLongString = longString.replace(switchedLetters, shortString)
            // eslint-disable-next-line
            longString = newLongString
            if (!isDomain && longString.includes(shortString)) {
                return longString
            }
        }
    }

    // Added to check the domain cases like : hotmali,com / gmali.com
    if (newLongString !== "" && newLongString.includes(shortString)) {
        if (isDomain) {
            const domain = longString.split(".")
            newLongString = longString.replace(domain[0], shortString)
        }
    }
    return newLongString
}

function checkForDomainTypo(userEmail) {
    const domains = ["gmail", "hotmail", "outlook", "yahoo", "icloud", "mail", "zoho"]
    const [leftPart, rightPart] = userEmail.split("@")

    for (let i = 0; i < domains.length; i += 1) {
        const domain = domains[i]
        const result = checkForCloseMatch(rightPart, domain, true)
        if (result) {
            return `${leftPart}@${result}`
        }
    }

    return ""
}

function checkForNameTypo(userEmail, name) {
    const [leftPart, rightPart] = userEmail.split("@")
    const result = checkForCloseMatch(leftPart, name, false)

    if (result) {
        return `${result}@${rightPart}`
    }

    return ""
}

function checkForCommonTypos(userInput) {
    const commonTypos = [
        {
            pattern: /,com$/,
            fix: str => str.replace(/,com$/, ".com"),
        },
        {
            pattern: /,co\.\w{2}$/,
            fix: str => str.replace(/,(co\.\w{2}$)/, ".$1"),
        },
        {
            pattern: /@\w*$/,
            fix: str => str + ".com",
        },
    ]

    const typo = commonTypos.find(typ => typ.pattern.test(userInput))

    if (typo) {
        return typo.fix(userInput)
    }

    return ""
}

/**
 * userInput {object} {email, firstName, lastName}
 *
 * @param {*} userInput
 *
 * @see https://hackernoon.com/how-to-reduce-incorrect-email-addresses-df3b70cb15a9
 */
export function checkForEmailTypo(userInput) {
    let email = userInput.email.trim().toLowerCase()

    let fixedEmail = ""
    let suggestion = ""
    fixedEmail = checkForCommonTypos(email)
    if (fixedEmail) {
        suggestion = fixedEmail
        email = fixedEmail
    }
    fixedEmail = checkForDomainTypo(email)
    if (fixedEmail) {
        suggestion = fixedEmail
        email = fixedEmail
    }

    fixedEmail = checkForCommonTypos(email)
    if (fixedEmail) {
        suggestion = fixedEmail
        email = fixedEmail
    }

    fixedEmail = checkForNameTypo(email, userInput.firstName.trim().toLowerCase())
    if (fixedEmail) {
        suggestion = fixedEmail
        email = fixedEmail
    }
    fixedEmail = checkForNameTypo(email, userInput.lastName.trim().toLowerCase())
    if (fixedEmail) {
        suggestion = fixedEmail
        email = fixedEmail
    }
    return suggestion
}

/**
 * Map old mobile site path to new
 *
 * @param {string} pathx
 *
 * @author Gihan S <gihanshp@gmail.com>
 */
export const mapOldPathToNew = pathx => new Promise((resolve, reject) => {
    if (/^\/(find|search)\//.test(pathx)) {
        let path = pathx.replace(/^\/(find|search)/, "/tours")
            .replace("multi-day-tours", "multiday-tours")
            .replace("/all", "")
        const startCity = pathx.match(/\/start-city\/([^/]+)/)
        if (startCity) {
            const sc = decodeURIComponent(decodeURIComponent(startCity[1]))
            path = path.replace(/\/start-city\/([^/]+)/, `/from-${toSeoUrl(sc)}`)
        }
        const endCity = pathx.match(/\/end-city\/([^/]+)/)
        if (endCity) {
            const ec = decodeURIComponent(decodeURIComponent(endCity[1]))
            path = path.replace(/\/end-city\/([^/]+)/, (startCity ? "-" : "/") + "to-" + toSeoUrl(ec))
        }
        const departure = pathx.match(/\/departure\/([^/]+)/)
        if (departure) {
            const dep = decodeURIComponent(decodeURIComponent(departure[1]))
            path = path.replace(/\/departure\/([^/]+)/, ((startCity || endCity) ? "-" : "/") + "departure-" + toSeoUrl(dep))
        }
        const visitCity = pathx.match(/\/attraction\/([^/]+)/)
        if (visitCity) {
            const vc = decodeURIComponent(decodeURIComponent(visitCity[1]))
            path = path.replace(/\/attraction\/([^/]+)/, ((startCity || endCity || departure) ? "-" : "/") + "visit-" + toSeoUrl(vc))
        }
        resolve(path)
    } else if (pathx.startsWith("/easy-book-start-date/")) {
        const matches = pathx.match(/^\/easy-book-start-date\/\w+\/(\d+)/)
        resolve(`/easy-book/${matches[1]}`)
    } else if (pathx.startsWith("/easy-book-location/")) {
        const matches = pathx.match(/^\/easy-book-location\/\w+\/(\d+)/)
        resolve(`/easy-book/${matches[1]}`)
    } else if (pathx.startsWith("/login") || pathx.startsWith("/forgot-password")) {
        resolve("/login")
    } else if (pathx.startsWith("/sign-up")) {
        resolve("/signup")
    } else if (pathx.startsWith("/near-me")) {
        resolve("/tours/near-me")
    } else if (pathx.startsWith("/wish-list")) {
        resolve("/wishlist")
    } else if (pathx.startsWith("/about") || pathx.startsWith("/help")) {
        resolve("/help")
    } else if (pathx.startsWith("/pay-now")) {
        resolve("/paynow")
    } else if (pathx.startsWith("/shopping-cart")) {
        resolve("/shopping_cart")
    } else if (
        /^\/(recently-viewed|easy-book)\//.test(pathx)
    ) {
        resolve(pathx)
    } else if (
        pathx.startsWith("/product/")
        || pathx.startsWith("/hotels/")
        || pathx.startsWith("/map/")
    ) {
        // extract product id from url
        let matches = pathx.match(/^\/product\/\w+\/\w+\/(\d+)/)
        let productId = 0
        if (matches) {
            productId = parseInt(matches[1], 10)
        } else if (pathx.match(/^\/(product|hotels|map)\/(\d+)/)) {
            matches = pathx.match(/^\/(product|hotels|map)\/(\d+)/)
            productId = parseInt(matches[2], 10)
        }
        if (productId > 0) {
            // resolve product Id to url
            get("/product/getUrl", { product_id: productId }).then(response => {
                if (response.ok) {
                    resolve("/" + response.data.url_path)
                } else {
                    const msg = response.ok === false && response.message
                        ? response.message
                        : "Error from /product/getUrl"
                    const error = new Error(msg)
                    console.log(error)
                    reject(error)
                }
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        } else {
            const error = new Error("No product id found")
            console.log(error)
            reject(error)
        }
    } else {
        const error = new Error("Unknown path")
        reject(error)
    }
})

/**
 * Track Criteo event
 *
 * @param {object} eventObj
 *
 * @author Pratik B <pratikb.bipl@gmail.com>
 */
export const criteoTrackEvent = (eventObj = {}, email = "") => {
    // { event: "trackTransaction", id: orderId, item: items }
    const deviceType = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? "m" : "d"
    window.criteo_q.push(
        {
            event: "setAccount",
            account: [
                54011,
                configs.criteo.id,
            ],
        },
        { event: "setSiteType", type: deviceType },
        {
            event: "setHashedEmail",
            email: [email],
        },
        eventObj,
    )
}
