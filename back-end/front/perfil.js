async function procuraUsario (id){
    const res = await fetch("http://localhost:3000//usuario/:"+id, {
            method: "get", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),
    })
}