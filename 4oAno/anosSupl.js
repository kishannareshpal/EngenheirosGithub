var cadeiras2oSemIDS_obras = ["grh", "hidrurbana", "irrigacaodrenagem", "ofm", "praticas", "projecto"]
var cadeiras1oSemIDS_edificios = ["betao2", "edificacoes", "estruturas", "gqc", "instalacoes1", "antropologia"]
var cadeiras1oSemNAMES_obras = ["Betão II", "Engenharia de Recursos Hídricos", "Gestão da Qualidade na Construção", "Hidrogeologia", "Hidrometria", "Hidroquímica", "TT: Antropologia Cultural de Moçambique"]
var cadeiras2oSemNAMES_obras = ["Gestão de Recursos Hídricos", "Hidráulica Urbana", "Irrigação e Drenagem", "Obras Fluviais e Marítimas", "Práticas de Campo, Laboratório e Obras", "Projecto em Construção Hidráulicas"]
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
};


function tr(e){
  var troncosel = document.getElementById('up_troncoSelect').value;
  document.getElementById('disciplinasSelect').length = 1;
  for (var ni = 0, nii = 0; ni < cadeirasObject["1oSem"][troncosel]["names"].length, nii < cadeirasObject["2oSem"][troncosel]["names"].length; ni++, nii++) {
      document.getElementById('1s').insertAdjacentHTML('beforeEnd', "<option value='" + cadeirasObject["1oSem"][troncosel]["id"][ni] + "'>" + cadeirasObject["1oSem"][troncosel]["names"][ni] + "</option>");
      document.getElementById('2s').insertAdjacentHTML('beforeEnd', "<option value='" + cadeirasObject["2oSem"][troncosel]["id"][nii] + "'>" + cadeirasObject["2oSem"][troncosel]["names"][nii] + "</option>");
  }
}


var tronco__;


function tronco(){
  tronco__ = document.getElementById('troncoSelect').value;
  document.cookie = "tronco=" + tronco__ + "; expires=Thu, 25 Dec 2025 12:00:00 UTC; path=/4oAno";
  changed();
}


function changed(){
  var currSemestre = document.getElementById('semestreSelect').value;
  tronco__ = document.getElementById('troncoSelect').value;

//SIMPLIFIED VERSION
  cadeirasButton.innerHTML="";
  for (var n=0; n < cadeirasObject[currSemestre][tronco__]["id"].length; n++){
    cadeirasButton.insertAdjacentHTML('beforeEnd', "<button style='width: 100%; cursor: pointer' name='" + cadeirasObject[currSemestre][tronco__]["id"][n] + "' type='button' class='btn btn-mdb'>" + cadeirasObject[currSemestre][tronco__]["names"][n] + "</button>");
  }
}

// tronco();
changed();
