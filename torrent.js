const WebTorrent = require('webtorrent-hybrid');
const fs = require('fs')
const torrentId = 'magnet:?xt=urn:btih:16BC4370F696F2D9ACCEFB635D36E3B2A8908E7E&dn=River.2021.720p.WEBRip.800MB.x264-GalaxyRG&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ffasttracker.foreverpirates.co%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.uw0.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce';
const client = new WebTorrent()
const cli_progress = require('cli-progress');
console.log('torrentId:\t', torrentId)

const bar = new cli_progress.SingleBar({}, cli_progress.Presets.shades_classic);
client.add(torrentId, torrent => {
  const files = torrent.files
  let length = files.length
  console.log('Number of files : '+length);
  bar.start(100,0);
  const interval = setInterval(() => {
    bar.update((torrent.progress * 100));
  }, 2000);
  // Stream each file to the disk
  files.forEach(file => {
    const source = file.createReadStream()
    console.log(file.name);
    const destination = fs.createWriteStream(file.name);
    source.on('end', () => {
      console.log('\n\tfile:\t\t', file.name)
      // close after all files are saved
      length -= 1
      if (!length){ 
        bar.stop();
        clearInterval(interval);
        process.exit()
      }
    }).pipe(destination)
  });
})

