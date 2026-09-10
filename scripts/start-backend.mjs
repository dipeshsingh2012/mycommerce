import { spawn } from 'node:child_process';

const pythonBin = '/home/dipes/projects/fleet-cortex/.venv/bin/python';

const services = [
  { name: 'counter-check-service', port: 8000, dir: '/home/dipes/projects/counter-check-service' },
  { name: 'product-catalog-service', port: 8001, dir: '/home/dipes/projects/product-catalog-service' },
  { name: 'homepage-service', port: 8002, dir: '/home/dipes/projects/homepage-service' },
  { name: 'cart-service', port: 8003, dir: '/home/dipes/projects/cart-service' },
  { name: 'order-service', port: 8004, dir: '/home/dipes/projects/order-service' },
  { name: 'search-service', port: 8005, dir: '/home/dipes/projects/search-service' },
];

const children = [];

for (const s of services) {
  const child = spawn(
    pythonBin,
    ['-m', 'uvicorn', 'src.main:app', '--host', '0.0.0.0', '--port', String(s.port)],
    {
      cwd: s.dir,
      env: {
        ...process.env,
        PYTHONPATH: s.dir,
      },
      stdio: 'inherit',
    }
  );
  children.push({ ...s, child });
  console.log(`[Backend] Started ${s.name} on port ${s.port}`);
}

const cleanup = () => {
  console.log('\n[Backend] Stopping all backend services...');
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
