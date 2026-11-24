import { useEffect, useState } from 'react';

// Where is the visitor? Everyone can browse, but orders are only taken from
// New Zealand (checked again on the server). The exact Tauranga check is the
// delivery postcode, because IP-based city detection is not reliable.
let cached = null;
let pending = null;

function load() {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetch('/api/location')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('location'))))
      .then((d) => { cached = d; return d; })
      .catch(() => { cached = { allowed: true, country: '', unknown: true }; return cached; });
  }
  return pending;
}

// status: 'loading' | 'allowed' | 'blocked'
export function useOrderLocation() {
  const [data, setData] = useState(cached);
  useEffect(() => {
    let live = true;
    load().then((d) => { if (live) setData(d); });
    return () => { live = false; };
  }, []);
  const status = !data ? 'loading' : data.allowed ? 'allowed' : 'blocked';
  return { status, country: data?.country || '', blocked: status === 'blocked' };
}
