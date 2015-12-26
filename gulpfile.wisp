(defmacro gulp-line
  ""
  [& commandline]
  (let [symbol-value
        (fn [symbl]
          (if (symbol? symbl) (get symbl :name) ""))
        
        chunk
        (fn [commandline]
          (loop [backs commandline
                 front nil]
            (if (empty? backs)
              (list front)
              (let [fst (first backs)
                    fst-val (symbol-value fst)
                    ;dd (print "???")
                    ;dd (print f)
                    ;dd (print (symbol? f))
                    ;dd (print (keyword? f))
                    ;dd (print (list? f))
                    ;dd (print (vector? f))
                    ;dd (print (string? f))
                    ;dd (print (dictionary? f))
                    ;dd (print "!!!")
                    fst* (if (dictionary? fst)
                           [fst]
                           fst)
                    ]
                (if (or (= fst-val "|") (= fst-val ">"))
                  (if (symbol? front)
                    (list (list front) backs)
                    (list front backs))
                  (recur (rest backs) (if front (cons front fst*) fst*)))))))

        chunked (chunk commandline)
        
        pipe
        (fn [command form]
          `(.pipe ~form (~@command)))

        dest
        (fn [command form]
          `(.pipe ~form (gulp.dest ~command)))

        firsts
        ((fn [commandline]
           (let [fst (first commandline)
                 fst-val (symbol-value fst)
                 rst (rest commandline)
                 ]
             (if (and fst-val (= "gulp." (fst-val.slice 0 5)))
               commandline
               (if (= (get fst-val 0) ".")
                 `(~fst gulp ~rst)
                 (do
                   (set! (aget (first commandline) :name) (+ "." fst-val))
                   `(~fst gulp ~rst)
                   ))))
           ) (first chunked))
        ]
    (loop [commandline (second chunked)
           form firsts]
      (if commandline
        (let [fname (symbol-value (first commandline))
              chunked (chunk (rest commandline))
              segment (first chunked)
              command (if (= fname "|") (pipe segment form) (dest segment form))
              ]
          (recur (second chunked) command))
        form
        ))))




(ns app.tasks
  "tasks"
  (:require [gulp]
            [gulp-load-plugins]
            ))

(let [
      plugins (gulp-load-plugins)
      no-convert "!./**/{node_modules|jspm_packages}/**"
      src {
           :wisp ["src/**/*.wisp" no-convert]
           }
      ]


  (gulp.task :default [:wisp :watch])

  (gulp.task
   :watch (fn [] (do
                   (.watch gulp (.-wisp src) [:wisp])
                   )))

  (gulp.task
   :wisp (fn [] (gulp-line
                   src (.-wisp src)
                   | plugins.plumber {:errorHandler
                                      (plugins.notify.onError
                                       {:title "task: wisp"
                                        :message "Error: <%= error.message %>"})
                                      }
                   | plugins.newer {:dest "./dist" :ext ".min.js"}
                   | plugins.wisp
                   > "./dist"
                   | plugins.uglify
                   | plugins.rename {:extname ".min.js"}
                   > "./dist"
                   )))
  )
