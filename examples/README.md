For å kjøre normalt

`k6 run myscript.js`

For å få lokalt dashboard (Linux/WSL2)

`K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_PERIOD=1s k6 run myscript.js`

For å få lokalt dashboard (Powershell)

`$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_PERIOD="1s"; k6 run myscript.js`

Installasjon Windows

`winget install k6 --source winget`
