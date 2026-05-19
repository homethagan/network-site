(async () => {
  try {
    const res = await fetch('http://localhost:3000/blog/understanding-dns-and-domain-names');
    console.log('STATUS', res.status);
    const body = await res.text();
    console.log(body.slice(0, 400));
  } catch (err) {
    console.error('FETCH ERROR', err);
    process.exit(2);
  }
})();