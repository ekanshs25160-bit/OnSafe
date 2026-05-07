/**
 * Site Utilities and Helpers
 */

/**
 * Formats numbers into human-readable strings (e.g. 2500 -> 2.5k)
 * @param {number} num 
 * @returns {string}
 */
export const formatStat = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k+';
    }
    return num.toString();
};

/**
 * Truncates text with ellipsis
 * @param {string} str 
 * @param {number} length 
 * @returns {string}
 */
export const truncate = (str, length) => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
};

/**
 * Debounce function for scroll/resize performance
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
