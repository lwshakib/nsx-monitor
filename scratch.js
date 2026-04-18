const si = require('systeminformation');

async function check() {
  const defaultIface = await si.networkInterfaceDefault();
  console.log('Default iface:', defaultIface);

  setInterval(async () => {
    const stats = await si.networkStats();
    let totalRx = 0;
    let totalTx = 0;
    let totalRxSec = 0;
    let totalTxSec = 0;

    for (const stat of stats) {
        totalRxSec += stat.rx_sec || 0;
        totalTxSec += stat.tx_sec || 0;
    }

    console.log(
        stats.map(s => `${s.iface}: ${s.rx_bytes} bytes, ${s.rx_sec} B/s`).join(' | ')
    );
  }, 500);
}

check();
