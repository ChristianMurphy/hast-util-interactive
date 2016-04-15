/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:util:interactive
 * @fileoverview Check if a node is interactive.
 */

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var has = require('hast-util-has-property');

/*
 * Always interactive nodes.
 */

var INTERACTIVE = [
    'button',
    'details',
    'embed',
    'iframe',
    'keygen',
    'label',
    'select',
    'textarea'
];

/**
 * Check if `node` is _interactive_.
 *
 * @param {Node} node - Node to check.
 * @return {boolean} - Whether `node` is categorised as
 *   interactive.
 */
function interactive(node) {
    var name;

    if (!node || typeof node !== 'object' || node.type !== 'element') {
        return false;
    }

    name = node.tagName;

    return (name === 'a' && has(node, 'href')) ||
        (name === 'audio' && has(node, 'controls')) ||
        (name === 'video' && has(node, 'controls')) ||
        (name === 'object' && has(node, 'useMap')) ||
        (name === 'img' && has(node, 'useMap')) ||
        (name === 'input' && (node.properties || {}).type !== 'hidden') ||
        has(node, 'tabIndex') ||
        INTERACTIVE.indexOf(name) !== -1;
}

/*
 * Expose.
 */

module.exports = interactive;
