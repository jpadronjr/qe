var bg = new Trianglify({
    noiseIntensity: 0,
    cellsize: 40,
    cellpadding: 1,
    fillOpacity: 0.8,
    strokeOpacity: 0.5
  });
  
  var pattern = bg.generate(document.body.clientWidth, document.body.clientHeight);
  document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);