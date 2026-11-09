let transacties =
JSON.parse(localStorage.getItem("transacties")) || [];

const ctx = document.getElementById('chart');

const chart = new Chart(ctx,{
    type:'doughnut',
    data:{
        labels:['Inkomsten','Uitgaven'],
        datasets:[{
            data:[0,0],
            backgroundColor:['#00c853','#ff5252']
        }]
    }
});

function voegToe(){

    const omschrijving =
    document.getElementById("omschrijving").value;

    const bedrag =
    Number(document.getElementById("bedrag").value);

    const type =
    document.getElementById("type").value;

    transacties.push({
        omschrijving,
        bedrag,
        type
    });

    localStorage.setItem(
        "transacties",
        JSON.stringify(transacties)
    );

    updateDashboard();
}

function updateDashboard(){

    let inkomsten = transacties
        .filter(t=>t.type==="inkomst")
        .reduce((a,b)=>a+b.bedrag,0);

    let uitgaven = transacties
        .filter(t=>t.type==="uitgave")
        .reduce((a,b)=>a+b.bedrag,0);

    document.getElementById("inkomsten")
        .innerText=`€${inkomsten}`;

    document.getElementById("uitgaven")
        .innerText=`€${uitgaven}`;

    document.getElementById("saldo")
        .innerText=`€${inkomsten-uitgaven}`;

    chart.data.datasets[0].data=
        [inkomsten,uitgaven];

    chart.update();

    document.getElementById("transacties")
    .innerHTML=
    transacties.map(t=>
        `<li>${t.omschrijving} -
        €${t.bedrag} (${t.type})</li>`
    ).join('');
}

updateDashboard();
