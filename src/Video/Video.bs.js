'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Create$BsIntersectionObserver = require("bs-intersection-observer/src/Create.bs.js");

function Video(Props) {
  var io = Create$BsIntersectionObserver.intersectionObserver((function (entries, param) {
          Belt_Array.map(entries, (function (entry) {
                  if (entry[/* intersectionRatio */3] > 0) {
                    if (document.pictureInPictureElement) {
                      return document.exitPictureInPicture().catch((function (error) {
                                    console.log(error);
                                    return /* () */0;
                                  }));
                    } else {
                      return 0;
                    }
                  } else if (document.pictureInPictureEnabled) {
                    return document.getElementById("video").requestPictureInPicture().catch((function (error) {
                                  console.log(error);
                                  return /* () */0;
                                }));
                  } else {
                    return 0;
                  }
                }));
          return /* () */0;
        }), undefined);
  React.useEffect((function () {
          var current = document.getElementById("video");
          Curry._1(io[/* observe */0], current);
          return (function (param) {
                    return Curry._1(io[/* unobserve */1], current);
                  });
        }));
  return React.createElement("video", {
              id: "video",
              controls: true,
              src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            });
}

var make = Video;

exports.make = make;
/* react Not a pure module */
