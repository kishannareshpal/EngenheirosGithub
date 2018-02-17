var cadeirasObject = {
  "1oSem": {
    "edificios": {
      "names": ["Betão II", "Edificações", "Estruturas Metálicas e de Madeira", "Gestão de Qualidade na Construção", "Instalações em Edifícios I", "TT: Antropologia Cultural de Moçambique"],
      "id": ["betao2", "edificacoes", "estruturas", "gqc", "instalacoes1", "antropologia"]
    },

    "obrashidraulicas": {
      "names": ["Betão II", "Engenharia de Recursos Hídricos", "Gestão da Qualidade na Construção", "Hidrogeologia", "Hidrometria", "Hidroquímica", "TT: Antropologia Cultural de Moçambique"],
      "id": ["betao2", "recursoshidricos", "gqc", "hidrogeologia", "hidrometria", "hidroquimica", "antropologia"]
    },

    "viasdecomunicacao": {
      "names": ["Betão II", "Estruturas Metálicas e de Madeira", "Gestão de Qualidade na Construção", "Vias Férreas", "Vias Rodoviárias I", "TT: Antropologia Cultural de Moçambique"],
      "id": ["betao2", "estruturas", "gqc", "viasferreas", "viasrodoviarias1", "antropologia"]
    }
  },

  "2oSem": {
    "edificios": {
      "names": ["Instalações em Edifícios II", "Patologia em Edifícios", "Práticas de Estaleiro e Obras de Edifícios", "Projecto de Construção de Edifícios", "Reabilitação de Estruturas e Materiais", "Técnica de Construçõa Não-Convencional"],
      "id": ["instalacoes2", "patologia", "praticas", "projconstrucao", "reabilitacao", "tecnicanaoconvecional"]
    },

    "obrashidraulicas": {
      "names": ["Gestão de Recursos Hídricos", "Hidráulica Urbana", "Irrigação e Drenagem", "Obras Fluviais e Marítimas", "Práticas de Campo, Laboratório e Obras", "Projecto em Construção Hidráulicas"],
      "id": ["grh", "hidrurbana", "irrigacaodrenagem", "ofm", "praticas", "projecto"]
    },

    "viasdecomunicacao": {
      "names": ["Drenagem Viária", "Engenharia de Tráfego", "Pontes", "Projecto Viário", "Práticas de Estaleiro e de Obras de Vias", "Vias Rodoviárias II"],
      "id": ["drenagemviaria", "trafego", "pontes", "projecto", "praticas", "viasrodoviarias2"]
    }
  }
}

var troncosel;
function tr(e){
  troncosel = document.getElementById('up_troncoSelect').value;
  document.getElementById('disciplinasSelect').length = 1;
  for (var ni = 0, nii = 0; ni < cadeirasObject["1oSem"][troncosel]["names"].length, nii < cadeirasObject["2oSem"][troncosel]["names"].length; ni++, nii++) {
      document.getElementById('1s').insertAdjacentHTML('beforeEnd', "<option value='" + cadeirasObject["1oSem"][troncosel]["id"][ni] + "'>" + cadeirasObject["1oSem"][troncosel]["names"][ni] + "</option>");
      document.getElementById('2s').insertAdjacentHTML('beforeEnd', "<option value='" + cadeirasObject["2oSem"][troncosel]["id"][nii] + "'>" + cadeirasObject["2oSem"][troncosel]["names"][nii] + "</option>");

  }
}


function tronco(){
  var tronco = document.getElementById('troncoSelect').value;
  document.cookie = "tronco=" + tronco + "; expires=Thu, 25 Dec 2025 12:00:00 UTC; path=/4oAno";
  changed();
}

function changed(){
  var currSemestre = document.getElementById('semestreSelect').value;
  var tronco = document.getElementById('troncoSelect').value;

  // 1o Semestre and Stuff
  if (currSemestre == "1oSem" && tronco == "edificios") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras1oSemNAMES_edificios.length, i < cadeiras1oSemIDS_edificios.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras1oSemIDS_edificios[i] + "' type='button' class='btn btn-mdb'>" + cadeiras1oSemNAMES_edificios[n] + "</button>");
    }

  } else if (currSemestre == "1oSem" && tronco == "obrashidraulicas") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras1oSemNAMES_obras.length, i < cadeiras1oSemIDS_obras.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras1oSemIDS_obras[i] + "' type='button' class='btn btn-mdb'>" + cadeiras1oSemNAMES_obras[n] + "</button>");
    }

  } else if (currSemestre == "1oSem" && tronco == "viasdecomunicacao") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras1oSemNAMES_vias.length, i < cadeiras1oSemIDS_vias.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras1oSemIDS_vias[i] + "' type='button' class='btn btn-mdb'>" + cadeiras1oSemNAMES_vias[n] + "</button>");
    }


  // 2o Semestre and stuff
  } else if (currSemestre == "2oSem" && tronco == "edificios") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras2oSemNAMES_edificios.length, i < cadeiras2oSemIDS_edificios.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras2oSemIDS_edificios[i] + "' type='button' class='btn btn-mdb'>" + cadeiras2oSemNAMES_edificios[n] + "</button>");
    }

  } else if (currSemestre == "2oSem" && tronco == "obrashidraulicas") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras2oSemNAMES_obras.length, i < cadeiras2oSemIDS_obras.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras2oSemIDS_obras[i] + "' type='button' class='btn btn-mdb'>" + cadeiras2oSemNAMES_obras[n] + "</button>");
    }

  } else if (currSemestre == "2oSem" && tronco == "viasdecomunicacao") {
    cadeirasButton.innerHTML="";
    for (var n = 0, i = 0; n < cadeiras2oSemNAMES_vias.length, i < cadeiras2oSemIDS_vias.length; n++, i++) {
        cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeiras2oSemIDS_vias[i] + "' type='button' class='btn btn-mdb'>" + cadeiras2oSemNAMES_vias[n] + "</button>");
    }
  }


}

changed();
