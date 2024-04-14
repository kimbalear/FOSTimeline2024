$(document).ready(function () {
  // Carga inicial de datos para las opciones de filtro.
  function loadData(url, successCallback) {
    $.ajax({
      url: url,
      type: "GET",
      success: successCallback,
      error: function (error) {
        console.error("Error loading data from: " + url, error);
      },
    });
  }

  function handleSuccess(data, optionsDivId, idPrefix) {
    var optionsDiv = $(optionsDivId);
    optionsDiv.empty();
    data.forEach(function (item) {
      $("<div></div>")
        .attr("id", idPrefix + item._id)
        .addClass("option")
        .attr("data-value", item._id || item.year)
        .text(item.name || item.year)
        .appendTo(optionsDiv);
    });
  }

  function yearConstruct(year) {
    // Crea la estructura base del año
    let baseHtml = `
    <div id="${year}yr" class="year">
    <div id="${year}tpyr" class="tp_yr"></div>
    <div id="${year}cebtn" class="ce_top">
      <div id="${year}topl" class="top_timeline">
        <div id="${year}titleou" class="title_ou"></div>
        <div id="${year}btnhs" class="btn_hs">Hide year</div>
        <div id="${year}btnaddnew" class="btn_addnew">Add New</div>
      </div>
    </div>
    <div id="${year}tp1" class="tp1"></div>
    <div id="${year}tp2" class="tp2"></div>
    <div id="${year}tp3" class="tp3"></div>
    <div id="${year}tp4" class="tp4"></div>
    <div id="${year}tp5" class="tp5"></div>
    <div id="${year}tp6" class="tp6"></div>
    <div id="${year}tp7" class="tp7"></div>
    <div id="${year}tp8" class="tp8"></div>
    <div id="${year}tp9" class="tp9"></div>
    <div id="${year}tp10" class="tp10"></div>
    <div id="${year}tp11" class="tp11"></div>
    <div id="${year}tp12" class="tp12"></div>
    <div id="${year}tline" class="t_line">
      <div id="${year}yrstart" class="yr_start">
        <div class="lbl">
          ${year}
          <div></div>
        </div>
      </div>
    </div>
    <div id="${year}btmyr" class="btm_yr"></div>
    <div id="${year}bt1" class="bt1"></div>
    <div id="${year}bt2" class="bt2"></div>
    <div id="${year}bt3" class="bt3"></div>
    <div id="${year}bt4" class="bt4"></div>
    <div id="${year}bt5" class="bt5"></div>
    <div id="${year}bt6" class="bt6"></div>
    <div id="${year}bt7" class="bt7"></div>
    <div id="${year}bt8" class="bt8"></div>
    <div id="${year}bt9" class="bt9"></div>
    <div id="${year}bt10" class="bt10"></div>
    <div id="${year}bt11" class="bt11"></div>
    <div id="${year}bt12" class="bt12"></div>
  </div>`;

    // Adjunta la estructura base al elemento principal
    var lineYear = `${year}yr`;
    if (!existingElement(`#${lineYear}`)) {
      $(".timeline").append(baseHtml);
    }
    // Genera los divs de los meses tanto en la parte superior como inferior
    for (let i = 1; i <= 12; i++) {
      let monthUpper = `<div id="${year}tp${i}" class="tp${i}"></div>`;
      let monthLower = `<div id="${year}bt${i}" class="bt${i}"></div>`;
      $(`#${year}yr`).append(monthUpper, monthLower);
    }

    // Añade los meses a la línea de tiempo

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    months.forEach((month, index) => {
      let monthHtml = `
        <div id="${year}tl" class="tl_${month}">
          <div id="${year}cnt_top${index + 1}" class="cnt_top${
        index + 1
      }"></div>
          <div class="cnt">
            <div class="lbl">${month}</div>
          </div>
          <div id="${year}nds_btm${index + 1}" class="nds_btm${
        index + 1
      }"></div>
        </div>`;

      $(`#${year}tline`).append(monthHtml);
    });


  }

  function showTimeline(years, orgUnitsNames) {
    if (years.length === 1) {
      //console.log("years: " + years[0]);
      year = years[0];
      yearConstruct(year);
    } else if (years.length > 1) {
      //console.log("years: " + years);
    }

    $(".top_timeline").css({
      visibility: "visible",
    });
  }

  // Implementación de carga de datos
  loadData("http://localhost:3001/getOrgUnits", function (data) {
    handleSuccess(data, "#orgUnitsOptions", "ou");
  });
  loadData("http://localhost:3001/getTypeNeeds", function (data) {
    handleSuccess(data, "#needsOptions", "nd");
  });
  loadData("http://localhost:3001/getYears", function (data) {
    handleSuccess(data, "#yearsOptions", "year");
  });

  // Función para mostrar/ocultar opciones de filtro
  function toggleOptions(selectId, optionsDivId) {
    $(document).on("click", selectId, function (e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $(optionsDivId).toggle();
    });
  }

  // Función para seleccionar una opción de filtro y mostrarla como una "píldora"
  function selectOption(
    optionPrefix,
    selectDivId,
    textHeaderId,
    placeholderText
  ) {
    $(document).on("click", `[id^='${optionPrefix}']`, function (e) {
      e.stopPropagation();
      var value = $(this).attr("data-value");
      if ($(selectDivId + ` div[data-value='${value}']`).length === 0) {
        $(textHeaderId).html("");
        $(this).addClass("option-selected");
        var pill = $("<div></div>").addClass("pill").attr("data-value", value);
        $("<div></div>").text($(this).text()).appendTo(pill);
        $("<div></div>").addClass("del_pill").appendTo(pill);
        pill.appendTo($(selectDivId));
      }
    });
  }

  // Función para eliminar una "píldora" seleccionada
  function removeSelectedOption(
    delPillClass,
    selectDivId,
    optionsDivId,
    textHeaderId,
    placeholderText
  ) {
    $(document).on("click", delPillClass, function (e) {
      e.stopPropagation();
      var value = $(this).closest(".pill").attr("data-value");
      $(this).closest(".pill").remove();
      $(`.option[data-value='${value}']`).removeClass("option-selected");
      if ($(selectDivId + " .pill").length === 0) {
        $(textHeaderId).text(placeholderText);
      }
    });
  }

  // Función para cerrar las opciones al hacer clic fuera
  function closeOptionsOnClickOutside(selectId, optionsDivId) {
    $(document).on("click", function (e) {
      if (!$(e.target).closest(`${selectId}, ${optionsDivId}`).length) {
        $(optionsDivId).hide();
        $(selectId).removeClass("active");
      }
    });
  }

  // Evitar que se cierren las opciones al hacer clic dentro de ellas
  $(document).on("click", ".option", function (e) {
    e.stopPropagation();
  });

  // Implementación de funciones de UI
  toggleOptions("#orgUnitsSelect", "#orgUnitsOptions");
  toggleOptions("#NeedsSelect", "#needsOptions");
  toggleOptions("#YearsSelect", "#yearsOptions");

  selectOption("ou", "#orgUnitsSelectd", "#txtHdrOrgUnits", "Select Org Unit");
  selectOption("nd", "#NeedsSelectd", "#txtHdrNeeds", "Select Needs");
  selectOption("year", "#YearsSelectd", "#txtHdrYears", "Select Year");

  removeSelectedOption(
    ".del_pill",
    "#orgUnitsSelectd",
    "#orgUnitsOptions",
    "#txtHdrOrgUnits",
    "Select Org Unit"
  );
  removeSelectedOption(
    ".del_pill",
    "#NeedsSelectd",
    "#needsOptions",
    "#txtHdrNeeds",
    "Select Needs"
  );
  removeSelectedOption(
    ".del_pill",
    "#YearsSelectd",
    "#yearsOptions",
    "#txtHdrYears",
    "Select Year"
  );

  closeOptionsOnClickOutside("#orgUnitsSelect", "#orgUnitsOptions");
  closeOptionsOnClickOutside("#NeedsSelect", "#needsOptions");
  closeOptionsOnClickOutside("#YearsSelect", "#yearsOptions");

  $(".cnt_ipanel").on("click", function () {
    $("#search-menu").toggleClass("open");
    $("#panel_sh").toggleClass("open");
  });

  // Manejo del clic en el botón #irun para ejecutar la lógica basada en las selecciones de filtros
  $(document).on("click", "#irun", function (e) {
    e.preventDefault();
    $('.year').remove()

    var pillsOrgUnits = $("#orgUnitsSelectd .pill");
    var pillsYears = $("#YearsSelectd .pill");

    var orgUnitsNames = [];
    var years = [];

    pillsOrgUnits.each(function () {
      orgUnitsNames.push($(this).find("div:first-child").text());
    });

    pillsYears.each(function () {
      years.push($(this).find("div:first-child").text());
    });

    if (years.length > 0) {
      showTimeline(years, orgUnitsNames);
      $.ajax({
        url: "http://localhost:3001/api/needsByYears",
        type: "GET",
        data: {
          years: years.join(","),
        },
        success: function (data) {
          console.log("Necesidades por años:", data);
          displayNeeds(data);
        },
        error: function (error) {
          console.error("Error al obtener las necesidades por años:", error);
        },
      });

      $.ajax({
        url: "http://localhost:3001/api/contributionsByYears",
        type: "GET",
        data: {
          years: years.join(","),
        },
        success: function (data) {
          console.log("Contribuciones por años:", data);
          displayContributions(data, orgUnitsNames);
        },
        error: function (error) {
          console.error("Error al obtener las contribuciones por años:", error);
        },
      });
    } else {
      console.log("No se seleccionaron años");
    }
  });

  function displayNeeds(data) {
  // Agrupar las necesidades por mes
  const needsByMonth = data.reduce((acc, need) => {
    const month = need.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(need);
    return acc;
  }, {});

  // Iterar sobre `needsByMonth` para mostrar las necesidades
  for (let month in needsByMonth) {
    const needMonth = needsByMonth[month];
    let monthNr = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;

    needMonth.forEach((need) => {
      console.log("need.title: " + need.lgnd);

      let year = need.year;
      let cardNeed = `
        <div class='card_lgn${need.lgnd}'>
          <div class="partner">${need.orgUnitName}</div>
          <div class="title">${need.title}</div>
          <div class="subtitle">${need.lgndName}</div>
          <div class="cont">${need.lgndName}</div>
        </div>`;

      switch (month) {
        case "jan":
          monthNr = 1;
          var pnlBtm = `${year}pnl_btm${monthNr}`;
          if (!existingElement(`#${pnlBtm}`)) {
            var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
            var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
            var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

            var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_cnt${monthNr}'></div>`;
            var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
            var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;
            
            $(pBtm).appendTo(`#${year}bt${monthNr}`);
            $(line).appendTo(`#${year}pnl_btm${monthNr}`);
            $(need).appendTo(`#${year}pnl_btm${monthNr}`);
            
            $(listCards).appendTo(`#${year}needs${monthNr}`);
            $(cntBtmMonthDots).appendTo(`#${year}cnt_Btm${monthNr}`);
            $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
          }
          $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);
          break;
        case "feb":
          monthNr = 2;
          break;
        case "mar":
          monthNr = 3;
          break;
        case "apr":
          monthNr = 4;
          break;
        case "may":
          monthNr = 5;
          break;
        case "jun":
          monthNr = 6;
          break;
        case "jul":
          monthNr = 7;
          break;
        case "aug":
          monthNr = 8;
          break;
        case "sep":
          monthNr = 9;
          break;
        case "oct":
          monthNr = 10; 
          break;
        case "nov":
          monthNr = 11;
          break;
        case "dec":
          monthNr = 12;
          break;
      }
    });
  }
}


  function displayContributions(data, selectedOrgUnits) {
    // Filtra los datos basado en las unidades organizativas seleccionadas
    const filteredData = data.filter(contribution => selectedOrgUnits.includes(contribution.orgUnitName));
  
    // Procesa los datos filtrados para agruparlos por mes
    const contributionsByMonth = filteredData.reduce((acc, contribution) => {
      const month = contribution.month;
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(contribution);
      return acc;
    }, {});
    var orgUnrs = selectedOrgUnits.length;
    
    // Itera sobre `contributionsByMonth` para mostrar las contribuciones
    for (let month in contributionsByMonth) {
      const contribMonth = contributionsByMonth[month];
      let monthNr = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;
  
      contribMonth.forEach((contribution) => {
        let year = contribution.year; 
        let cardCntr = `
          <div class='card_contr'>
            <div class="partner">${contribution.orgUnitName}</div>
            <div class="title">${contribution.title}</div>
            <div class="cont">${contribution.description}</div>
          </div>`;

          if(orgUnrs === 1){
            $(`#${year}titleou`).html(contribution.orgUnitName);
          }
  
          switch (month) {
            case "jan":
              monthNr = 1;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "feb":
              monthNr = 2;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "mar":
              monthNr = 3;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "apr":
              monthNr = 4;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "may":
              monthNr = 5;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "jun":
              monthNr = 6;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "jul":
              monthNr = 7;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "aug":
              monthNr = 8;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "sep":
              monthNr = 9;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "oct":
              monthNr = 10;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "nov":
              monthNr = 11;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
            case "dec":
              monthNr = 12;
              var pnlTop = `${year}pnl_top${monthNr}`;
              if (!existingElement(`#${pnlTop}`)) {
                var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                var line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
                $(pTop).appendTo(`#${year}tp${monthNr}`);
                $(line).appendTo(`#${year}pnl_top${monthNr}`);
                $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                $(listCards).appendTo(`#${year}cntr${monthNr}`);
                $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              }
              $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
              break;
          }
      });
    }
  }

  function existingElement(selector) {
    return $(selector).length > 0;
  }
});