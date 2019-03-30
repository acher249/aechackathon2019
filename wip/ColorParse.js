var Vibrant = require('node-vibrant');
const ntc = require('./ntc');

class ColorParse {
  constructor() {}

  static BuildRequest(lat, long, heading) {
    // let location = 'location=46.414382,10.013988&';
    // let heading = 'heading=151.78&';
    let base = 'https://maps.googleapis.com/maps/api/streetview?';
    let size = 'size=800x400&'
    let location = 'location=' + String(lat) + ',' + String(long) + '&';
    let headingStr = 'heading=' + heading + '&' || 'heading=0.0&';
    let pitch = 'pitch=-0.76&'
    let key = 'key=AIzaSyBiwsS0P3PVv4dr2sTs61i_9d-ICOsmSgw';

    return base + size + location + headingStr + pitch + key;
  }

  static GetPalette(lat, long, heading) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = self.BuildRequest(lat, long, heading);
      Vibrant.from(url).getPalette()
        .then(palette => {
          resolve(palette);
        }).catch(err => console.error(err));
    })
  }

  static GetPaletteName() {
    let result = ntc.name('#6195ed');

    let rgb_value = result[0];
    let specific_name = result[1];
    let is_exact_match = result[2];
  }

}

module.exports = ColorParse;