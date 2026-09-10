import { spawn } from 'node:child_process';
import path from 'node:path';

const remotes = [
  { name: 'counter-check', port: 5173, dir: '/home/dipes/projects/counter-check' },
  { name: 'homepage-ui', port: 5174, dir: '/home/dipes/projects/homepage-ui' },
  { name: 'product-page-ui', port: 5175, dir: '/home/dipes/projects/product-page-ui' },
  { name: 'cart-ui', port: 5176, dir: '/home/dipes/projects/cart-ui' },
  { name: 'discovery-ui', port: 5177, dir: '/home/dipes/projects/discovery-ui' },
  { name: 'checkout-ui', port: 5178, dir: '/home/dipes/projects/checkout-ui' },
  { name: 'search-ui', port: 5179, dir: '/home/dipes/projects/search-ui' },
];

const children = [];

for (const remote of remotes) {
  const child = spawn('npx', ['vite', 'preview', '--port', String(remote.port)], {
    cwd: remote.dir,
    stdio: 'inherit',
  });
  children.push({ ...remote, child });
  console.log(`[Host] Started ${remote.name} on port ${remote.port}`);
}

const cleanup = () => {
  console.log('\n[Host] Stopping all remote servers...');
  for (const { child } of children) {
    try {
      child.kill('SIGTERM');
    } catch {}
  }
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
