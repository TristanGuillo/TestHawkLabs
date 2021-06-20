function GenerateCreative() {
  console.log("===== Generate Creative ====");

  //Check if form is complete

  // Get input Url video
  const UrlVideo = document.getElementById('InputUrlVideo').value;

  // Get size iframe
  const iframeWidth = document.getElementById('inputIframeWidth').value;
  const iframeHeight = document.getElementById('inputIframeHeight').value;

  //Generate script in TextArea
  var TextAreaScript = document.getElementById("TextScript");
  TextAreaScript.value = "<script> \n const videoUrl = '" + UrlVideo + "';\n</script> \n <script src='creativeFullscreen.js'></script>";

  // Create Iframe
  var iframe = document.createElement("iframe");
  //Pass data Url video to index.html which waits for the data
  iframe.setAttribute("src", "./index.html?videoUrl="+UrlVideo+"");
  // Custom Size
  iframe.height = iframeHeight;
  iframe.width = iframeWidth;
  iframe.style.border="none";
  iframe.scrolling="no";

  // Append child iframe to the div
  document.getElementById('divIframe').innerHTML = "";
  document.getElementById('divIframe').appendChild(iframe);
}

// ../videos/ads.mp4