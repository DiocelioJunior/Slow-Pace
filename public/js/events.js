import { events } from "./data/eventsDate.js";

function converterData(dataString) {
  const meses = {
    "jan.": 0,
    "fev.": 1,
    "mar.": 2,
    "abr.": 3,
    "mai.": 4,
    "jun.": 5,
    "jul.": 6,
    "ago.": 7,
    "set.": 8,
    "out.": 9,
    "nov.": 10,
    "dez.": 11
  };

  const partes = dataString.split(" ");
  const dia = parseInt(partes[0]);
  const mes = meses[partes[2]];
  const ano = parseInt(partes[4]);

  return new Date(ano, mes, dia);
}

const eventList = document.getElementById("event-list");
const filterName = document.getElementById("filter-name");
const filterCity = document.getElementById("filter-city");
const filterMonth = document.getElementById("filter-month");

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

// 🔥 Ordena por data
events.sort((a, b) => converterData(a.data) - converterData(b.data));

// Define mês atual como padrão
filterMonth.value = hoje.getMonth();

function renderEvents() {
  eventList.innerHTML = "";

  const nomeBusca = filterName.value.toLowerCase();
  const cidadeBusca = filterCity.value.toLowerCase();
  const mesSelecionado = filterMonth.value;

  const eventosFiltrados = events.filter(event => {
    const dataEvento = converterData(event.data);

    const matchNome = event.nome.toLowerCase().includes(nomeBusca);
    const matchCidade = event.cidade.toLowerCase().includes(cidadeBusca);
    const matchMes = mesSelecionado === "" || dataEvento.getMonth() == mesSelecionado;

    return matchNome && matchCidade && matchMes;
  });

  if (eventosFiltrados.length === 0) {
    eventList.innerHTML = "<p>Nenhum evento encontrado.</p>";
    return;
  }

  eventosFiltrados.forEach(event => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-card");

    const dataEvento = converterData(event.data);
    const eventoPassado = dataEvento < hoje;

    if (eventoPassado) {
      eventDiv.classList.add("evento-passado");
    }

    eventDiv.innerHTML = `
      <h3>
        ${event.nome}
        ${eventoPassado ? '<span class="badge">ENCERRADO</span>' : ''}
      </h3>
      <p><strong>Cidade:</strong> ${event.cidade}</p>
      <p><strong>Distâncias:</strong> ${event.distancias}</p>
      <p><strong>Organização:</strong> ${event.organizacao}</p>
      <p><strong>Data:</strong> ${event.data}</p>
      ${
        eventoPassado
          ? '<button disabled>Inscrições Encerradas</button>'
          : `<a href="${event.link}" target="_blank"><button>Ver mais</button></a>`
      }
    `;

    eventList.appendChild(eventDiv);
  });
}

// Eventos de filtro
filterName.addEventListener("input", renderEvents);
filterCity.addEventListener("input", renderEvents);
filterMonth.addEventListener("change", renderEvents);

// Render inicial (mostra mês atual)
renderEvents();