export { getData };

async function getData(url, method, data){
    let response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}