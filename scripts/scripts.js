const inputEl = document.getElementsByClassName('input-el')
let arrValue = []
for(i = 0; i < inputEl.length; i++)
{
    let input = inputEl[i]
    inputEl[i].addEventListener('input', (e) =>{
        if(input.value.length > input.maxLength)
        {
            input.value = input.value.slice(0, input.maxLength)
        }
        
     
    })
}

function getTotal(number){
    let total = 0;
    for(i = 0; i < inputEl.length; i++)
    {
        let input = inputEl[i]
        let valor = number == 1 ? input.getAttribute('data-parceria') : input.getAttribute('data-s-parceria')
        total += (input.value / input.getAttribute('data-parcela')) * valor
        setValue(total)

    }

}


function setValue(total){
    const brutoEl = document.getElementById('valor-bruto')
    const comissaoEl = document.getElementById('valor-comissao')
    let comissao = total * 0.1
    const liquidoEl = document.getElementById('valor-liquido')
    let liquido = total - comissao
   



    brutoEl.innerText = total
    comissaoEl.innerText = comissao
    liquidoEl.innerText = liquido

}