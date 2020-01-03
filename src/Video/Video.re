[@bs.val] external document: Js.t({..}) = "document";
[@bs.val] [@bs.scope "document"]
external getElementById: string => Dom.element = "getElementById";

[@react.component]
let make = () => {
  let src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  // using intersectionObserver
  let io =
    BsIntersectionObserver.Create.intersectionObserver(
      ~cb=
        (entries, _) => {
          Belt.Array.map(entries, entry =>
            if (entry.intersectionRatio > 0.) {
              // Visible Element
              if (document##pictureInPictureElement) {
                document##exitPictureInPicture()##catch(error =>
                  Js.log(error)
                );
              };
            } else if
              // Not Visible Element
              (document##pictureInPictureEnabled) {
              document##getElementById("video")##requestPictureInPicture()##catch(
                error =>
                Js.log(error)
              );
            }
          )
          ->ignore;
          ();
        },
      ~options=None,
    );

  React.useEffect(() => {
    let current = getElementById("video");
    io.observe(current);
    Some(() => io.unobserve(current));
  });

  <video
    id="video"
    controls=true
    src
    // ref={ReactDOMRe.Ref.domRef(vidRef)}
    // bs-intersectionObserver not support with react ref
  />;
};
