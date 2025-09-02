function calcularPreco() {
    
    // --- 1. Obter os valores dos inputs da página ---
    const precoRolo = parseFloat(document.getElementById('precoRolo').value);
    const pesoRolo = parseFloat(document.getElementById('pesoRolo').value);
    const pesoPeca = parseFloat(document.getElementById('pesoPeca').value);
    const tempoImpressao = parseFloat(document.getElementById('tempoImpressao').value);
    const taxaPreparacao = parseFloat(document.getElementById('taxaPreparacao').value);
    const margemLucro = parseFloat(document.getElementById('margemLucro').value);
    const consumoWatts = parseFloat(document.getElementById('consumoWatts').value);
    const valorKwh = parseFloat(document.getElementById('valorKwh').value);
    const custoDesgasteHora = parseFloat(document.getElementById('custoDesgasteHora').value);

    // --- NOVO: Obter custos de embalagem ---
    let custoEmbalagem = 0;
    const itensExtras = document.querySelectorAll('.extra-item'); // Seleciona todos os checkboxes
    
    itensExtras.forEach(item => { // Percorre cada checkbox
        if (item.checked) { // Verifica se está marcado
            custoEmbalagem += parseFloat(item.value); // Soma o valor ao custo de embalagem
        }
    });

    // --- 2. Validar os dados ---
    if (isNaN(precoRolo) || isNaN(pesoRolo) || isNaN(pesoPeca) || isNaN(tempoImpressao) || 
        isNaN(taxaPreparacao) || isNaN(margemLucro) || isNaN(consumoWatts) || isNaN(valorKwh) || isNaN(custoDesgasteHora)) {
        alert("Por favor, preencha todos os campos com valores numéricos válidos.");
        return;
    }

    // --- 3. Fazer os cálculos conforme a fórmula ---
    const custoMaterial = (pesoPeca / pesoRolo) * precoRolo;
    const custoEletricidade = (consumoWatts / 1000) * tempoImpressao * valorKwh;
    const custoDesgaste = tempoImpressao * custoDesgasteHora;
    const custosTotais = custoMaterial + custoEletricidade + custoDesgaste + taxaPreparacao + custoEmbalagem;
    const valorLucro = custosTotais * (margemLucro / 100);
    const precoFinal = custosTotais + valorLucro;

    // --- 4. Exibir o resultado na página ---
    // A única alteração é aqui: o resultado é injetado diretamente.
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <span class="label">Valor Sugerido</span>
        <span class="preco">R$ ${precoFinal.toFixed(2).replace('.', ',')}</span>
    `;
}