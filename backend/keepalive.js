#!/usr/bin/env node
const https = require('https');
const http = require('http');

const rawArgs = process.argv.slice(2);
const parsedArgs = rawArgs.reduce((acc, cur) => {
  const match = cur.match(/^--([^=]+)(=(.*))?$/);
  if (match) acc[match[1]] = match[3] === undefined ? true : match[3];
  return acc;
}, {});

const targetUrl = parsedArgs.url || process.env.KEEP_ALIVE_URL || process.env.APP_URL || `http://localhost:${process.env.PORT || 3001}/api/ping`;
const timeoutMs = parseInt(parsedArgs.timeout || process.env.KEEP_ALIVE_TIMEOUT_MS || '10000', 10);
const intervalMs = parseInt(parsedArgs.interval || process.env.KEEP_ALIVE_INTERVAL_MS || '300000', 10); // 5 minutes
const loopMode = parsedArgs.loop || process.env.KEEP_ALIVE_LOOP === '1' || process.env.KEEP_ALIVE_LOOP === 'true';

function ping(targetUrl) {
  return new Promise((resolve, reject) => {
    try {
      const lib = targetUrl.startsWith('https') ? https : http;
      const req = lib.get(targetUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      }).on('error', (err) => reject(err));
      req.setTimeout(timeoutMs, () => {
        req.abort();
        reject(new Error('Request timed out'));
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  try {
    console.log(`Pinging ${targetUrl}`);
    const res = await ping(targetUrl);
    const ok = res.statusCode >= 200 && res.statusCode < 500;
    console.log(`Ping result: ${res.statusCode}`);
    if (!ok) {
      console.error('Ping returned non-success status:', res.statusCode);
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Ping failed:', error.message || error);
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused — asegúrate de que el backend esté ejecutándose con `npm start` o configura `KEEP_ALIVE_URL` a la URL pública de tu aplicación.');
    }
    process.exitCode = 1;
  }
}

async function mainLoop() {
  console.log(`Starting keepalive loop: pinging ${targetUrl} every ${intervalMs / 1000}s`);
  // Run an immediate ping, then scheduled pings
  await main();
  const id = setInterval(async () => {
    await main();
  }, intervalMs);
  process.on('SIGINT', () => {
    clearInterval(id);
    console.log('Stopping keepalive loop');
    process.exit(0);
  });
}

if (require.main === module) {
  if (loopMode) mainLoop();
  else main();
}

module.exports = { ping };
