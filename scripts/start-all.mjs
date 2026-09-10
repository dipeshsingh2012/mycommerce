import { spawn } from 'node:child_process';

const services = [
  { name: 'counter-check', port: 5173, dir: '/home/dipes/projects/counter-check', cmd: ['vite', 'preview', '--port', '5173'] },
  { name: 'homepage-ui', port: 5174, dir: '/home/dipes/projects/homepage-ui', cmd: ['vite', 'preview', '--port', '5174'] },
  { name: 'product-page-ui', port: 5175, dir: '/home/dipes/projects/product-page-ui', cmd: ['vite', 'preview', '--port', '5175'] },
  { name: 'cart-ui', port: 5176, dir: '/home/dipes/projects/cart-ui', cmd: ['vite', 'preview', '--port', '5176'] },
  { name: 'discovery-ui', port: 5177, dir: '/home/dipes/projects/discovery-ui', cmd: ['vite', 'preview', '--port', '5177'] },
  { name: 'checkout-ui', port: 5178, dir: '/home/dipes/projects/checkout-ui', cmd: ['vite', 'preview', '--port', '5178'] },
  { name: 'search-ui', port: 5179, dir: '/home/dipes/projects/search-ui', cmd: ['vite', 'preview', '--port', '5179'] },
  { name: 'mycommerce (host)', port: 5170, dir: '/home/dipes/projects/mycommerce', cmd: ['vite', '--port', '5170'] },
];

const children = [];

for (const s of services) {
  const child = spawn('npx', s.cmd, {
    cwd: s.dir,
    stdio: 'inherit',
  });
  children.push({ ...s, child });
  console.log(`[mycommerce] Started ${s.name} on port ${s.port}`);
}

const cleanup = () => {
  console.log('\n[mycommerce] Shutting down all processes...');
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
