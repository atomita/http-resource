{
    var _ns_ = {
        id: 'atomita.http.resource',
        doc: 'base of the resource class.'
    };
    var lodash = require('lodash');
    var atomita_http_request = require('./request');
    var request = atomita_http_request;
}
var defaults = {
    params: {},
    actions: {
        'get': { 'method': 'GET' },
        'save': { 'method': 'POST' },
        'query': {
            'method': 'GET',
            'isArray': true
        },
        'update': { 'method': 'PUT' },
        'remove': { 'method': 'DELETE' },
        'delete': { 'method': 'DELETE' }
    },
    options: { 'mergeActions': true }
};
var resource = function resource(url, vars) {
    return function () {
        var resourceø1 = function resource() {
            var args = Array.prototype.slice.call(arguments, 0);
            return Resource.apply(this, args);
        };
        var varsø2 = lodash.defaults(vars, defaults);
        var paramsø1 = varsø2.params || defaults.params;
        var optionsø1 = lodash.defaults(varsø2.options || {}, defaults.options);
        var actionsø1 = lodash.defaults(varsø2.actions || {}, optionsø1.mergeActions ? defaults.actions : {});
        var urlBuilderø1 = buildUrl(url, paramsø1);
        resourceø1.prototype = lodash.create(Resource.prototype, {
            value: resourceø1,
            enumerable: false,
            writable: true,
            configurable: true
        });
        defineActions(resourceø1.prototype, actionsø1, urlBuilderø1, paramsø1);
        defineActions(resourceø1, actionsø1, urlBuilderø1, paramsø1);
        return resourceø1;
    }.call(this);
};
module.exports = resource;
var buildUrl = function buildUrl(url, params) {
    return function () {
        var builderø1 = function urlBuilder(url, params) {
            return url;
        };
        url.replace(RegExp('(?::)([^:/]+)', 'g'), function (place, k, i) {
            return function () {
                var orgBuilderø1 = builderø1;
                return builderø1 = function urlBuilder(url, params) {
                    return orgBuilderø1(url.slice(0, i) + (lodash.has(params, k) ? lodash.get(params, k) : place) + url.slice(i + place.length), params);
                };
            }.call(this);
        });
        return function (params) {
            return builderø1(url, params);
        };
    }.call(this);
};
var defineActions = function defineActions(resource, actions, urlBuilder, classParams) {
    return function loop() {
        var recur = loop;
        var keysø1 = lodash.keysIn(actions);
        do {
            recur = keysø1.length ? function () {
                var methodNameø1 = lodash.first(keysø1);
                var actionø1 = actions[methodNameø1];
                resource[methodNameø1] = function actionMethod(params, options) {
                    return function () {
                        var paramsø2 = lodash.defaults(params || {}, this instanceof Resource ? this : {}, actionø1.params || {}, classParams);
                        var optionsø2 = lodash.defaults(options || {}, actionø1);
                        0 <= lodash.indexOf([
                            'GET',
                            'HEAD'
                        ], actionø1.method.toUpperCase()) ? optionsø2.query = lodash.defaults(optionsø2.query || {}, paramsø2) : void 0;
                        return request(actionø1.method, urlBuilder(paramsø2), paramsø2, optionsø2, this instanceof Resource ? this.constructor : this);
                    }.call(this);
                };
                return loop[0] = lodash.slice(keysø1, 1), loop;
            }.call(this) : void 0;
        } while (keysø1 = loop[0], recur === loop);
        return recur;
    }.call(this);
};
var Resource = function Resource(propeties, response) {
    return function () {
        var propetiesø2 = propeties || {};
        var responseø2 = response || {};
        var resourceø1 = function resource() {
            return lodash.extend(this, propetiesø2);
        };
        this.response = responseø2;
        resourceø1.prototype = this;
        return new resourceø1();
    }.call(this);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFub255bW91cy53aXNwIl0sIm5hbWVzIjpbIl9uc18iLCJpZCIsImRvYyIsImRlZmF1bHRzIiwicmVzb3VyY2UiLCJ1cmwiLCJ2YXJzIiwicmVzb3VyY2XDuDEiLCJhcmdzIiwiUmVzb3VyY2UiLCJhcHBseSIsInRoaXMiLCJ2YXJzw7gyIiwibG9kYXNoIiwicGFyYW1zw7gxIiwicGFyYW1zIiwib3B0aW9uc8O4MSIsIm9wdGlvbnMiLCJhY3Rpb25zw7gxIiwiYWN0aW9ucyIsIm1lcmdlQWN0aW9ucyIsInVybEJ1aWxkZXLDuDEiLCJidWlsZFVybCIsInByb3RvdHlwZSIsImNyZWF0ZSIsImRlZmluZUFjdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIiwiYnVpbGRlcsO4MSIsInVybEJ1aWxkZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwicGxhY2UiLCJrIiwiaSIsIm9yZ0J1aWxkZXLDuDEiLCJzbGljZSIsImhhcyIsImdldCIsImxlbmd0aCIsImNsYXNzUGFyYW1zIiwia2V5c8O4MSIsImtleXNJbiIsIm1ldGhvZE5hbWXDuDEiLCJmaXJzdCIsImFjdGlvbsO4MSIsImFjdGlvbk1ldGhvZCIsInBhcmFtc8O4MiIsIm9wdGlvbnPDuDIiLCJpbmRleE9mIiwibWV0aG9kLnRvVXBwZXJDYXNlIiwicXVlcnkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiY29uc3RydWN0b3IiLCJwcm9wZXRpZXMiLCJyZXNwb25zZSIsInByb3BldGllc8O4MiIsInJlc3BvbnNlw7gyIiwiZXh0ZW5kIl0sIm1hcHBpbmdzIjoiO0lBQUEsSUFBQ0EsSSxHQUFEO0FBQUEsUUFBQUMsRSxFQUFJLHVCQUFKO0FBQUEsUUFBQUMsRyxFQUNFLDZCQURGO0FBQUEsTTs7Ozs7QUEwQ0EsSUFBZUMsUUFBQSxHQUNiO0FBQUEsSSxRQUFRLEVBQVI7QUFBQSxJLFNBQ1M7QUFBQSxRLE9BQVMsRSxVQUFTLEtBQVQsRUFBVDtBQUFBLFEsUUFDUyxFLFVBQVMsTUFBVCxFQURUO0FBQUEsUSxTQUVTO0FBQUEs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LEdBQXlCWixJQUF6QixDQUxJO0FBQUEsUUFNSixXQUpJSixVQUlKLEdBTkk7QUFBQSxLLEtBQU4sQyxJQUFBO0FBQUEsQ0FGRiIsInNvdXJjZXNDb250ZW50IjpbIihucyBhdG9taXRhLmh0dHAucmVzb3VyY2VcbiAgXCJiYXNlIG9mIHRoZSByZXNvdXJjZSBjbGFzcy5cIlxuICAoOnJlcXVpcmUgW2xvZGFzaF1cbiAgICAgICAgICAgIFthdG9taXRhLmh0dHAucmVxdWVzdCA6YXMgcmVxdWVzdF1cbiAgICAgICAgICAgICkpXG5cbjs7XG47OyByZXNvdXJjZVxuOztcbjs7XG47OyBleGFtcGxlOlxuOztcbjs7IGBgYGpzXG47OyBpbXBvcnQgaHR0cFJlc291cmNlIGZyb20gXCJodHRwLXJlc291cmNlXCI7XG47O1xuOzsgdmFyIFVzZXJSZXNvdXJjZSA9IGh0dHBSZXNvdXJjZShcIi9hcGkvdXNlci86aWQvOmVkaXRcIiwge1xuOzsgICAgIGFjdGlvbnM6IHtcbjs7ICAgICAgICAgc2F2ZTogeyBtZXRob2Q6IFwiUFVUXCIgfSxcbjs7ICAgICAgICAgZWRpdDogeyBtZXRob2Q6IFwiR0VUXCIsIHBhcmFtczoge1wiZWRpdFwiOiBcImVkaXRcIn0gfVxuOzsgICAgIH0sXG47OyAgICAgcGFyYW1zOiB7XG47OyAgICAgICAgIGVkaXQ6IFwiXCJcbjs7ICAgICB9XG47OyB9KTtcbjs7XG47OyAvLyBtZXRob2Qgb3ZlcnJpZGVcbjs7IGNsYXNzIFVzZXIgZXh0ZW5kcyBVc2VyUmVzb3VyY2Uge1xuOzsgICAgIHNhdmUocGFyYW1zID0ge30sIG9wdGlvbnMgPSB7fSl7XG47OyAgICAgICAgIG9wdGlvbnNbXCJoZWFkZXJcIl0gPSB7IFwiWC1GT09cIjogXCJmb29cIiB9O1xuOzsgICAgICAgICByZXR1cm4gc3VwZXIuc2F2ZShwYXJhbXMsIG9wdGlvbnMpO1xuOzsgICAgIH1cbjs7IH1cbjs7XG47O1xuOzsgVXNlci5nZXQoe1wiaWRcIjoxfSkudGhlbigodXNlcik9Pntcbjs7ICAgICB1c2VyLm5hbWUgPSBcImZvb1wiO1xuOzsgICAgIHVzZXIuc2F2ZSgpO1xuOzsgfSk7XG47OyBgYGBcbjs7XG5cblxuKGRlZiBeOnByaXZhdGUgZGVmYXVsdHNcbiAge3BhcmFtcyB7fVxuICAgYWN0aW9ucyB7OmdldCAgICB7Om1ldGhvZCBcIkdFVFwifVxuICAgICAgICAgICAgOnNhdmUgICB7Om1ldGhvZCBcIlBPU1RcIn1cbiAgICAgICAgICAgIDpxdWVyeSAgezptZXRob2QgXCJHRVRcIiA6aXNBcnJheSB0cnVlfVxuICAgICAgICAgICAgOnVwZGF0ZSB7Om1ldGhvZCBcIlBVVFwifVxuICAgICAgICAgICAgOnJlbW92ZSB7Om1ldGhvZCBcIkRFTEVURVwifVxuICAgICAgICAgICAgOmRlbGV0ZSB7Om1ldGhvZCBcIkRFTEVURVwifVxuICAgICAgICAgICAgfVxuICAgb3B0aW9ucyB7Om1lcmdlQWN0aW9ucyB0cnVlfVxuICAgfSlcblxuKGRlZm4tIHJlc291cmNlXG4gIFwiY3JlYXRlIHJlc291cmNlIGNsYXNzXCJcbiAgW3VybCB2YXJzXVxuICAobGV0IFtyZXNvdXJjZSAoZm4gcmVzb3VyY2UgWyYgYXJnc10gKFJlc291cmNlLmFwcGx5IHRoaXMgYXJncykpXG4gICAgICAgIHZhcnMgKGxvZGFzaC5kZWZhdWx0cyB2YXJzIGRlZmF1bHRzKVxuICAgICAgICBwYXJhbXMgKG9yIHZhcnMucGFyYW1zIGRlZmF1bHRzLnBhcmFtcylcbiAgICAgICAgb3B0aW9ucyAobG9kYXNoLmRlZmF1bHRzIChvciB2YXJzLm9wdGlvbnMge30pIGRlZmF1bHRzLm9wdGlvbnMpXG4gICAgICAgIGFjdGlvbnMgKGxvZGFzaC5kZWZhdWx0cyAob3IgdmFycy5hY3Rpb25zIHt9KSAoaWYgb3B0aW9ucy5tZXJnZS1hY3Rpb25zIGRlZmF1bHRzLmFjdGlvbnMge30pKVxuICAgICAgICB1cmwtYnVpbGRlciAoYnVpbGQtdXJsIHVybCBwYXJhbXMpXG4gICAgICAgIF1cbiAgICAoc2V0ISByZXNvdXJjZS5wcm90b3R5cGVcbiAgICAgICAgICAobG9kYXNoLmNyZWF0ZSBSZXNvdXJjZS5wcm90b3R5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHJlc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGUgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGUgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGUgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcblxuICAgIChkZWZpbmUtYWN0aW9ucyByZXNvdXJjZS5wcm90b3R5cGUgYWN0aW9ucyB1cmwtYnVpbGRlciBwYXJhbXMpXG4gICAgKGRlZmluZS1hY3Rpb25zIHJlc291cmNlIGFjdGlvbnMgdXJsLWJ1aWxkZXIgcGFyYW1zKVxuICAgIHJlc291cmNlXG4gICAgKSlcblxuKHNldCEgbW9kdWxlLmV4cG9ydHMgcmVzb3VyY2UpXG5cbihkZWZuLSBidWlsZC11cmxcbiAgXCJjcmVhdGUgdXJsIGJ1aWxkZXJcIlxuICBbdXJsIHBhcmFtc11cbiAgKGxldCBbYnVpbGRlciAoZm4gdXJsLWJ1aWxkZXIgW3VybCBwYXJhbXNdIHVybCldXG4gICAgKHVybC5yZXBsYWNlIChSZWdFeHAgXCIoPzo6KShbXjovXSspXCIgXCJnXCIpXG4gICAgICAgICAgICAgICAgIChmbiBbcGxhY2UsIGssIGldXG4gICAgICAgICAgICAgICAgICAgKGxldCBbb3JnLWJ1aWxkZXIgYnVpbGRlcl1cbiAgICAgICAgICAgICAgICAgICAgIChzZXQhIGJ1aWxkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChmbiB1cmwtYnVpbGRlciBbdXJsIHBhcmFtc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9yZy1idWlsZGVyICgrICh1cmwuc2xpY2UgMCBpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlmIChsb2Rhc2guaGFzIHBhcmFtcyBrKSAobG9kYXNoLmdldCBwYXJhbXMgaykgcGxhY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodXJsLnNsaWNlICgrIGkgcGxhY2UubGVuZ3RoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpKSkpXG4gICAgKGZuIFtwYXJhbXNdIChidWlsZGVyIHVybCBwYXJhbXMpKVxuICAgICkpXG5cbihkZWZuLSBkZWZpbmUtYWN0aW9uc1xuICBcImRlZmluZSBhY3Rpb24gbWV0aG9kc1wiXG4gIFtyZXNvdXJjZSBhY3Rpb25zIHVybC1idWlsZGVyIGNsYXNzLXBhcmFtc11cbiAgKGxvb3AgW2tleXMgKGxvZGFzaC5rZXlzSW4gYWN0aW9ucyldXG4gICAgKGlmIGtleXMubGVuZ3RoXG4gICAgICAobGV0IFttZXRob2QtbmFtZSAobG9kYXNoLmZpcnN0IGtleXMpXG4gICAgICAgICAgICBhY3Rpb24gKGFnZXQgYWN0aW9ucyBtZXRob2QtbmFtZSldXG4gICAgICAgIChzZXQhIChhZ2V0IHJlc291cmNlIG1ldGhvZC1uYW1lKVxuICAgICAgICAgICAgICAoZm4gYWN0aW9uLW1ldGhvZCBbcGFyYW1zIG9wdGlvbnNdXG4gICAgICAgICAgICAgICAgKGxldCBbcGFyYW1zIChsb2Rhc2guZGVmYXVsdHMgKG9yIHBhcmFtcyB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaWYgKGluc3RhbmNlPyBSZXNvdXJjZSB0aGlzKSB0aGlzIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvciBhY3Rpb24ucGFyYW1zIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzLXBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIChsb2Rhc2guZGVmYXVsdHMgKG9yIG9wdGlvbnMge30pIGFjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAoaWYgKDw9IDAgKGxvZGFzaC5pbmRleC1vZiBbOkdFVCA6SEVBRF0gKGFjdGlvbi5tZXRob2QudG8tdXBwZXItY2FzZSkpKVxuICAgICAgICAgICAgICAgICAgICAoc2V0ISBvcHRpb25zLnF1ZXJ5IChsb2Rhc2guZGVmYXVsdHMgKG9yIG9wdGlvbnMucXVlcnkge30pIHBhcmFtcykpKVxuICAgICAgICAgICAgICAgICAgKHJlcXVlc3QgYWN0aW9uLm1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHVybC1idWlsZGVyIHBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlmIChpbnN0YW5jZT8gUmVzb3VyY2UgdGhpcykgdGhpcy5jb25zdHJ1Y3RvciB0aGlzKSkpKSlcbiAgICAgICAgKHJlY3VyIChsb2Rhc2guc2xpY2Uga2V5cyAxKSlcbiAgICAgICAgKSkpKVxuXG5cbihkZWZuLSBSZXNvdXJjZVxuICBbcHJvcGV0aWVzIHJlc3BvbnNlXVxuICAobGV0IFtwcm9wZXRpZXMgKG9yIHByb3BldGllcyB7fSlcbiAgICAgICAgcmVzcG9uc2UgIChvciByZXNwb25zZSB7fSlcbiAgICAgICAgcmVzb3VyY2UgIChmbiByZXNvdXJjZSBbXSAobG9kYXNoLmV4dGVuZCB0aGlzIHByb3BldGllcykpXG4gICAgICAgIF1cbiAgICAoc2V0ISB0aGlzLnJlc3BvbnNlIHJlc3BvbnNlKVxuICAgIChzZXQhIHJlc291cmNlLnByb3RvdHlwZSB0aGlzKVxuICAgIChyZXNvdXJjZS4pXG4gICAgKVxuICApXG4iXX0=