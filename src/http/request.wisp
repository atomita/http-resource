(ns atomita.http.request
  "http request module"
  (:require [superagent]
            [bluebird]
            [lodash]))

(defn- request
  [method url params options clazz]
  (set! options (or options {}))
  (set! clazz (or clazz Object))
  (->
   (bluebird.resolve)
   (.then (fn call-api []
            (bluebird. (fn [resolve reject]
                         (let [api (superagent (method.to-lower-case) url)]
                           (if (lodash.has options :query)
                             (api.query options.query))
                           (if (lodash.has options :header)
                             (api.set options.header))
                           (->
                            (api.send params)
                            (.end (fn [err response]
                                    (if (or err (not response.ok))
                                      (reject (or err (new-error "undefined error." response err)))
                                      (resolve response))
                                    ))))
                         ))))
   (.then (fn object? [response]
            (bluebird. (fn [resolve reject]
                         (if options.is-array
                           (if (lodash.is-array response.body)
                             (resolve response)
                             (reject (new-error "Is not Array." response)))
                           (if (lodash.is-object response.body)
                             (resolve response)
                             (reject (new-error "Is not Object." response))))
                         ))))
   (.then (fn to-resource [response]
            (bluebird. (fn [resolve reject]
                         (if options.is-array
                           (resolve (lodash.map (fn [record] (clazz. record response))))
                           (resolve (clazz. response.body response)))
                         ))))
   ))

(set! module.exports request)



(defn- new-error [msg response err]
  (let [new-err (Error. msg)]
    (lodash.extend new-err
                   {original err
                    response response
                    status (if response response.status null)})
    ))

(defmacro ->
  [& operations]
  (reduce
   (fn [form operation]
     (cons (first operation)
           (cons form (rest operation))))
   (first operations)
   (rest operations)))
