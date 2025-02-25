

get()

async function get() {
    try {
        const res = await fetch('https://api.directual1.com/good/api/v5/data/3_schedule/getAllSchedule?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=17424864001&dfinish=1742572800', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await res.json();
        let len = json.payload.length
        console.log('len=',len);

        if (len > 0) {
            console.log('есть инфа');
        } else {
            console.log('пустой');
        }
    } catch (error) {
        console.error('Ошибка:');
    }
}

   