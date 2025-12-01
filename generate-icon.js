import fs from 'fs';
import pngToIco from 'png-to-ico';

pngToIco('public/assets/tomato_idle.png')
    .then(buf => {
        fs.writeFileSync('public/assets/icon.ico', buf);
        console.log('Created icon.ico');
    })
    .catch(console.error);
