import { spawn } from 'node:child_process';
import fs from 'node:fs';

const resolvePython = (serviceDir) => {
  const localVenv = `${serviceDir}/.venv/bin/python`;
  if (fs.existsSync(localVenv)) {
    return localVenv;
  }
  return 'python3';
};

const backends = [
  { name: 'counter-check-service', port: 8000, dir: '/home/dipes/projects/counter-check-service' },
  { name: 'product-catalog-service', port: 8001, dir: '/home/dipes/projects/product-catalog-service' },
  { name: 'homepage-service', port: 8002, dir: '/home/dipes/projects/homepage-service' },
  { name: 'cart-service', port: 8003, dir: '/home/dipes/projects/cart-service' },
  { name: 'order-service', port: 8004, dir: '/home/dipes/projects/order-service' },
  { name: 'search-service', port: 8005, dir: '/home/dipes/projects/search-service' },
];

const frontends = [
  { name: 'counter-check', port: 5173, dir: '/home/dipes/projects/counter-check', cmd: ['vite', 'preview', '--port', '5173'] },
  { name: 'homepage-ui', port: 5174, dir: '/home/dipes/projects/homepage-ui', cmd: ['vite', 'preview', '--port', '5174'] },
  { name: 'product-page-ui', port: 5175, dir: '/home/dipes/projects/product-page-ui', cmd: ['vite', 'preview', '--port', '5175'] },
  { name: 'cart-ui', port: 5176, dir: '/home/dipes/projects/cart-ui', cmd: ['vite', 'preview', '--port', '5176'] },
  { name: 'discovery-ui', port: 5177, dir: '/home/dipes/projects/discovery-ui', cmd: ['vite', 'preview', '--port', '5177'] },
  { name: 'checkout-ui', port: 5178, dir: '/home/dipes/projects/checkout-ui', cmd: ['vite', 'preview', '--port', '5178'] },
  { name: 'search-ui', port: 5179, dir: '/home/dipes/projects/search-ui', cmd: ['vite', 'preview', '--port', '5179'] },
  { name: 'pim-ui', port: 5180, dir: '/home/dipes/projects/pim-ui', cmd: ['vite', '--port', '5180'] },
  { name: 'mycommerce (host)', port: 5170, dir: '/home/dipes/projects/mycommerce', cmd: ['next', 'dev', '-p', '5170'] },
];

const children = [];

for (const b of backends) {
  const pythonBin = resolvePython(b.dir);
  const child = spawn(
    pythonBin,
    ['-m', 'uvicorn', 'src.main:app', '--host', '0.0.0.0', '--port', String(b.port)],
    {
      cwd: b.dir,
      env: { ...process.env, PYTHONPATH: b.dir },
      stdio: 'inherit',
    }
  );
  children.push({ ...b, child });
  console.log(`[Suite] Started backend ${b.name} on port ${b.port}`);
}

for (const f of frontends) {
  const child = spawn('npx', f.cmd, {
    cwd: f.dir,
    stdio: 'inherit',
  });
  children.push({ ...f, child });
  console.log(`[Suite] Started frontend ${f.name} on port ${f.port}`);
}

const cleanup = () => {
  console.log('\n[Suite] Shutting down all processes...');
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
