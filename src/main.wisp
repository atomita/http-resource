(ns example.main
  ""
  (:require [vue]
            [http-resource]))


(def ^:private User (http-resource "/api/user/:id:ext" {params {ext ".json" }}))

(let [vm (vue.
          {
           el "#example"
           data {
                  id ""
                  name ""
                  }
           methods {
                    user-load (fn []
                                (def  self this)
                                (->
                                 (User.get {id 1})
                                 (.then (fn [user]
                                          (self.$set :id   user.id)
                                          (self.$set :name user.name)
                                          ))
                                 )
                                )
                    }
           })
      ]
  )


(defmacro ->
  [& operations]
  (reduce
   (fn [form operation]
     (cons (first operation)
           (cons form (rest operation))))
   (first operations)
   (rest operations)))
