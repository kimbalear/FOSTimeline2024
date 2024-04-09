$.ajax({
  url: "http://localhost:3001/api/contributionsByYears",
  type: "GET",
  data: {
    years: years.join(","),
  },
  success: function (data) {
    console.log("contributionsByYears data received:", data);
    // El resto de tu código previo...
    for (let month in contributionsByMonth) {
      const contrib_month = contributionsByMonth[month];
      console.log(`Contributions in ${month} !!!!:`, contrib_month);
      let pTop, contrib;
      // Ejemplo para enero:
      if(month === "jan") {
        monthNr = 1;
        pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
        contrib = `<div id='${year}cntrs${monthNr}' class='contributions'></div>`;
        $(pTop).appendTo(`#${year}tp_${monthNr}`);
        $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
        // Agregar las contribuciones específicamente para enero
        contrib_month.forEach((contribution, index) => {
          // Define y construye cardCntr aquí dentro del forEach
          let orgUnitName = contribution.orgUnitName; // Asume que ya tienes orgUnitName
          let cardCntr = `<div class='card_contr'>
            <div class="partner">${orgUnitName}</div>
            <div class="title">${contribution.title}</div>
            <div class="cont">${contribution.description}</div>
          </div>`;
          // Ahora puedes utilizar cardCntr sin problemas
          $(cardCntr).appendTo(`#${year}cntrs${monthNr}`);
        });
      }
      // Debes replicar la lógica ajustada para los otros meses en sus respectivos casos.
    }
    // Continúa con el resto de tu código...
  },
  error: function (error) {
    console.error("Error obtaining contributions for years::", error);
  },
});


success: function (data) {
  const needsByYears = data.reduce((acc, needs) => {
    const { year } = needs;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(needs);
    return acc;
  }, {});

  const needsByMonth = data.reduce((acc, needs) => {
    const { month } = needs;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(needs);
    return acc;
  }, {});

  for (let month in needsByMonth) {
    const needs_month = needsByMonth[month];
    console.log(`Needs in ${month}:`, needs_month);
    let pBtm, needs;

    switch (month) {
      case "jan":
        monthNr = 1;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "feb":
        monthNr = 2;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "mar":
        monthNr = 3;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "apr":
        monthNr = 4;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "may":
        monthNr = 5;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "jun":
        monthNr = 6;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "jul":
        monthNr = 7;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "aug":
        monthNr = 8;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "sep":
        monthNr = 9;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "oct":
        monthNr = 10;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "nov":
        monthNr = 11;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
      case "dec":
        monthNr = 12;
        pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
        needs = `<div id='${year}need${monthNr}' class='needs'></div>`;
        line = `<div id='${year}l${monthNr}bt' class='line'></div>`;
        $(pBtm).appendTo(`#${year}bt_${monthNr}`);
        $(needs).appendTo(`#${year}pnl_btm${monthNr}`);
        $(line).appendTo(`#${year}pnl_btm${monthNr}`);
        needBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
        needBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impact</div>`;
        $(needBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
        $(needBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
        break;
    }
  }
}


