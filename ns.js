(function() {

    function Ns() {};

    /***
     * Creates or returns the object for the specified namespace. If the namespace has not yet been created, it will
     * be created
     * @param namespace namespace to return
     * @param obj (object) optional - the object to store in the namespace
     * @returns {object} the object stored in the namespace or a new empty object
     */
    Ns.prototype.namespace = function(namespace, obj) {

        validateNamespace(namespace);

        var parts = namespace.split("."),
            object = this,
            i;

        for (i = 0; i < parts.length; i++) {
            if (!object[parts[i]]) {
                if ( i == (parts.length - 1) && obj) {
                    object[parts[i]] = obj;
                } else {
                    object[parts[i]] = {};
                }
            } else if (i == (parts.length - 1) && obj) {
                object[parts[i]] = obj;
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
        validateNamespace(namespace);

        var actual = getNamespace(namespace, this);

        if (!isValidNamespaceObject(actual)) {
            throw "The namespace '" + namespace + "' has not yet been configured. Please ensure the namespace is imported prior to requiring it.";
        }

        return actual;
    }

    function validateNamespace(namespace) {
        if ( !namespace || namespace.length == 0) {
            throw new Error("A namespace is required");
        }
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

    if(typeof window !== "undefined"){
        window.Ns = Ns
        window.ns = new Ns();
    }

    if(typeof module !== "undefined" && module.exports){
        module.exports = new Ns();
    }

})();