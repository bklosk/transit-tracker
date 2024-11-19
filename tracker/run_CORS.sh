export PORT=8080
export CORSANYWHERE_WHITELIST=https://maps.googleapis.com,http://localhost:3000,http://maps.googleapis.com:8080
node node_modules/cors-anywhere/server.js