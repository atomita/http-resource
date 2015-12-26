(ns atomita.http.resource
  "base of the resource class."
  (:require [lodash]
            [atomita.http.request :as request]
            ))

;;
;; resource
;;
;;
;; example:
;;
;; ```js
;; import httpResource from "http-resource";
;;
;; var UserResource = httpResource("/api/user/:id/:edit", {
;;     actions: {
;;         save: { method: "PUT" },
;;         edit: { method: "GET", params: {"edit": "edit"} }
;;     },
;;     params: {
;;         edit: ""
;;     }
;; });
;;
;; // method override
;; class User extends UserResource {
;;     save(params = {}, options = {}){
;;         options["header"] = { "X-FOO": "foo" };
;;         return super.save(params, options);
;;     }
;; }
;;
;;
;; User.get({"id":1}).then((user)=>{
;;     user.name = "foo";
;;     user.save();
;; });
;; ```
;;


(def ^:private defaults
  {params {}
   actions {:get    {:method "GET"}
            :save   {:method "POST"}
            :query  {:method "GET" :isArray true}
            :update {:method "PUT"}
            :remove {:method "DELETE"}
            :delete {:method "DELETE"}
            }
   options {:mergeActions true}
   })

(defn- resource
  "create resource class"
  [url vars]
  (let [resource (fn resource [& args] (Resource.apply this args))
        vars (lodash.defaults vars defaults)
        params (or vars.params defaults.params)
        options (lodash.defaults (or vars.options {}) defaults.options)
        actions (lodash.defaults (or vars.actions {}) (if options.merge-actions defaults.actions {}))
        url-builder (build-url url params)
        ]
    (set! resource.prototype
          (lodash.create Resource.prototype
                         {
                          value resource
                          enumerable false
                          writable true
                          configurable true
                          }))

    (define-actions resource.prototype actions url-builder params)
    (define-actions resource actions url-builder params)
    resource
    ))

(set! module.exports resource)

(defn- build-url
  "create url builder"
  [url params]
  (let [builder (fn url-builder [url params] url)]
    (url.replace (RegExp "(?::)([^:/]+)" "g")
                 (fn [place, k, i]
                   (let [org-builder builder]
                     (set! builder
                           (fn url-builder [url params]
                             (org-builder (+ (url.slice 0 i)
                                             (if (lodash.has params k) (lodash.get params k) place)
                                             (url.slice (+ i place.length)))
                                          params)
                             )))))
    (fn [params] (builder url params))
    ))

(defn- define-actions
  "define action methods"
  [resource actions url-builder class-params]
  (loop [keys (lodash.keysIn actions)]
    (if keys.length
      (let [method-name (lodash.first keys)
            action (aget actions method-name)]
        (set! (aget resource method-name)
              (fn action-method [params options]
                (let [params (lodash.defaults (or params {})
                                              (if (instance? Resource this) this {})
                                              (or action.params {})
                                              class-params)
                      options (lodash.defaults (or options {}) action)
                      ]
                  (if (<= 0 (lodash.index-of [:GET :HEAD] (action.method.to-upper-case)))
                    (set! options.query (lodash.defaults (or options.query {}) params)))
                  (request action.method
                           (url-builder params)
                           params
                           options
                           (if (instance? Resource this) this.constructor this)))))
        (recur (lodash.slice keys 1))
        ))))


(defn- Resource
  [propeties response]
  (let [propeties (or propeties {})
        response  (or response {})
        resource  (fn resource [] (lodash.extend this propeties))
        ]
    (set! this.response response)
    (set! resource.prototype this)
    (resource.)
    )
  )
