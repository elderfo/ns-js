(function() {

    function Ns() {};

    /***
     * Creates or returns the object for the specified namespace. If the namespace has not yet been created, it will
     * be created
     * @param namespace namespace to return
     * @returns {object} the object stored in the namespace or a new empty object
     */
    Ns.prototype.namespace = function(namespace) {
        var parts = namespace.split("."),
            object = this,
            i,
            len;

        for (i = 0, len = parts.length; i < len; i++) {
            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }

        return object;
    }

    /***
     * A nodejs like require statement for a namespace to exist. Throws an error if the namespace has not been
     * configured.
     * @param namespace Namespace to lookup.
     * @returns {object} namespace object if found.
     */
    Ns.prototype.require = function(namespace) {
        var actual = getNamespace(namespace, this);

        if (!isValidNamespaceObject(actual)) {
            throw "The namespace '" + namespace + "' has not yet been configured. Please ensure the namespace is imported prior to requiring it.";
        }

        return actual;
    }

    function getNamespace(namespace, ns) {
        var parts = namespace.split(".");
        var object = ns;
        var i;
        var len;

        for (i = 0, len = parts.length; i < len; i++) {
            if (!object[parts[i]]) {
                return null;
            }
            object = object[parts[i]];
        }

        return object;
    }

    function isValidNamespaceObject(value) {
        return value != null;
    }


    // on nodejs platform export as module
    if(typeof module !== 'undefined')
    {
        module.exports = namespace;
    }
    else // on browser environment add to window
    {
        window.namespace = namespace;
    }

})();