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
          <div class="cnt"><div class="lbl">${month}</div></div>
          <div id="${year}nds_btm${index + 1}" class="nds_btm${
        index + 1
      }"></div>
        </div>`;

      $(`#${year}tline`).append(monthHtml);
    });
  }

  function showTimeline(years) {
    if (years.length === 1) {
      year = years[0];
      yearConstruct(years);
    } else if (years.length > 1) {
      for (i = 0; i < years.length; i++) {
        console.log("i: " + i + " years[i]:" + years[i]);
        yearConstruct(years[i]);
      }
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
    $(".year").remove();

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
      showTimeline(years);
      $.ajax({
        url: "http://localhost:3001/api/needsByYears",
        type: "GET",
        data: {
          years: years.join(","),
        },
        success: function (data) {
          console.log("Necesidades por años:", data);
          displayNeeds(data, orgUnitsNames);
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
    var lgnd1Cnt,
      lgnd2Cnt,
      lgnd3Cnt,
      lgnd4Cnt,
      lgnd5Cnt,
      lgnd6Cnt,
      lgnd7Cnt,
      lgnd8Cnt = 0;

    for (let month in needsByMonth) {
      const needMonth = needsByMonth[month];
      let monthNr = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;

      needMonth.forEach((need) => {
        var lgnd = need.lgnd;
        let year = need.year;
        let cardNeed = `
        <div class='card_lgn${lgnd}'>
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

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "feb":
            monthNr = 2;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "mar":
            monthNr = 3;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "apr":
            monthNr = 4;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "may":
            monthNr = 5;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "jun":
            monthNr = 6;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "jul":
            monthNr = 7;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "aug":
            monthNr = 8;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "sep":
            monthNr = 9;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "oct":
            monthNr = 10;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "nov":
            monthNr = 11;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
          case "dec":
            monthNr = 12;
            var pnlBtm = `${year}pnl_btm${monthNr}`;
            if (!existingElement(`#${pnlBtm}`)) {
              var pBtm = `<div id='${year}pnl_btm${monthNr}' class='pnl_btm'></div>`;
              var need = `<div id='${year}needs${monthNr}' class='needs'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntBtmMonthDots = `<div id='${year}dtsBtm${monthNr}' class='dots_need${monthNr}'></div>`;
              var cntBtmDotsTitle = `<div id='${year}dtsTtBtm${monthNr}' class='lbl'>Impacts</div>`;
              var listCards = `<div id='${year}lstneeds${monthNr}' class='listcards'>`;

              $(pBtm).appendTo(`#${year}bt${monthNr}`);
              $(line).appendTo(`#${year}pnl_btm${monthNr}`);
              $(need).appendTo(`#${year}pnl_btm${monthNr}`);

              $(listCards).appendTo(`#${year}needs${monthNr}`);
              $(cntBtmMonthDots).appendTo(`#${year}nds_btm${monthNr}`);
              $(cntBtmDotsTitle).appendTo(`#${year}dtsBtm${monthNr}`);
            }
            $(cardNeed).appendTo(`#${year}lstneeds${monthNr}`);

            switch (lgnd) {
              case 1:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd1Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd1Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd1Cnt = lgnd1Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd1Cnt);
                }
                break;
              case 2:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd2Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd2Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd2Cnt = lgnd2Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd2Cnt);
                }
                break;
              case 3:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd3Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd3Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd3Cnt = lgnd3Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd3Cnt);
                }
                break;
              case 4:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd4Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd4Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd4Cnt = lgnd4Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd4Cnt);
                }
                break;
              case 5:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd5Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd5Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd5Cnt = lgnd5Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd5Cnt);
                }
                break;
              case 6:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd6Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd6Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd6Cnt = lgnd6Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd6Cnt);
                }
                break;
              case 7:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd7Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd7Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd7Cnt = lgnd7Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd7Cnt);
                }
                break;
              case 8:
                if (!existingElement(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`)) {
                  lgnd8Cnt = 1;
                  var cntBtmDotLgn = `<div id='${year}dtTtBtm${monthNr}lgnd${lgnd}' class='dot${monthNr} lgnd${lgnd}_p'>${lgnd8Cnt}</div>`;
                  $(cntBtmDotLgn).appendTo(`#${year}dtsBtm${monthNr}`);
                } else {
                  lgnd8Cnt = lgnd8Cnt + 1;
                  $(`#${year}dtTtBtm${monthNr}lgnd${lgnd}`).html(lgnd8Cnt);
                }
                break;
            }
            break;
        }
      });
    }
  }

  function displayContributions(data, selectedOrgUnits) {
    // Filtra los datos basado en las unidades organizativas seleccionadas
    const filteredData = data.filter((contribution) =>
      selectedOrgUnits.includes(contribution.orgUnitName)
    );

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
    var ContributionsCnt = 0;
    // Itera sobre `contributionsByMonth` para mostrar las contribuciones
    for (let month in contributionsByMonth) {
      const contribMonth = contributionsByMonth[month];
      let monthNr = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;
      ContributionsCnt = contribMonth.length;
      console.log(`Contributions: ${ContributionsCnt} for month:  ${month}`);

      contribMonth.forEach((contribution) => {
        let year = contribution.year;
        let cardCntr = `
          <div class='card_contr'>
            <div class="partner">${contribution.orgUnitName}</div>
            <div class="title">${contribution.title}</div>
            <div class="cont">${contribution.description}</div>
          </div>`;

        if (orgUnrs === 1) {
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
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "feb":
            monthNr = 2;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "mar":
            monthNr = 3;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "apr":
            monthNr = 4;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "may":
            monthNr = 5;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "jun":
            monthNr = 6;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "jul":
            monthNr = 7;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "aug":
            monthNr = 8;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "sep":
            monthNr = 9;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "oct":
            monthNr = 10;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "nov":
            monthNr = 11;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
            }
            $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
            break;
          case "dec":
            monthNr = 12;
            var pnlTop = `${year}pnl_top${monthNr}`;
            if (!existingElement(`#${pnlTop}`)) {
              var pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
              var contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
              var line = `<div id='${year}l${monthNr}bt' class='line'></div>`;

              var cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
              var cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
              var listCards = `<div id='${year}lstcontr${monthNr}' class='listcards'>`;
              var cntVontributionsDot = `<div id="${year}dot${monthNr}" class="dot${monthNr}">${ContributionsCnt}</div>`;

              $(pTop).appendTo(`#${year}tp${monthNr}`);
              $(line).appendTo(`#${year}pnl_top${monthNr}`);
              $(contrib).appendTo(`#${year}pnl_top${monthNr}`);

              $(listCards).appendTo(`#${year}cntr${monthNr}`);
              $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
              $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
              $(cntVontributionsDot).appendTo(`#${year}dtsTop${monthNr}`);
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

  // Legends cta
  $("#lgnd0").click(function () {
    $(".card_contr").toggle(this.checked);
    $(".card_contr").parent().parent().parent().toggle(this.show);
  });

  $("#lgnd1").click(function () {
    $(".card_lgn1").toggle(this.checked);;
    listcardsChildren()
  });

  $("#lgnd2").click(function () {
    $(".card_lgn2").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd3").click(function () {
    $(".card_lgn3").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd4").click(function () {
    $(".card_lgn4").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd5").click(function () {
    $(".card_lgn5").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd6").click(function () {
    $(".card_lgn6").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd7").click(function () {
    $(".card_lgn7").toggle(this.checked);
    listcardsChildren()
  });

  $("#lgnd8").click(function () {
    $(".card_lgn8").toggle(this.checked);
    listcardsChildren()
  });

  // Do items with class "listcards" have children?
  function listcardsChildren() {
    
    $('.pnl_btm').each(function() {
      var $thisPnlBtm = $(this);
      var hasVisibleCards = $thisPnlBtm.find('.listcards > div').filter(function() {
          return $(this).css('display') !== 'none';
      }).length > 0;
  
      if (hasVisibleCards) {
          $thisPnlBtm.show();
          console.log($thisPnlBtm.attr('id') + " visible");
      } else {
          $thisPnlBtm.hide();
          console.log($thisPnlBtm.attr('id') + " oculto");
      }
  });
  
  }

  //-- Legends cta
  function contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle, imgs) {
    var imgs = ["1.jpg", "2.jpg", "3.jpg"];
    var url = "https://knowtechture.com/timeline/src/assets/imgs/";
    $('<div class="scrim">').appendTo(".wrapper");

    $('<div class="dlg ' + dlgtype + '">').appendTo(".scrim");
    $('<div class="dlg_bar ' + groupStyle + '">').appendTo(".dlg");
    $('<div class="dlg_title">').appendTo(".dlg_bar");
    $('<div class="dlg_cta ' + groupStyle + '">').appendTo(".dlg_bar");
    $('<div class="btn-sys-edit">').appendTo(".dlg_cta");
    $('<div class="btn-sys-close">').appendTo(".dlg_cta");
    $('<div class="dlg_cnt">').appendTo(".dlg");

    $('<div class="cnt_header">').appendTo(".dlg_cnt");
    $('<div class="cnt_sections">').appendTo(".dlg_cnt");
    $('<div class="sections">').appendTo(".cnt_sections");

    $('<div class="wrapper-dlg">').appendTo(".cnt_header");
    $('<div class="header-dlg">').appendTo(".wrapper-dlg");
    $('<div class="top-l-dlg">').appendTo(".header-dlg");
    $('<div class="top-c-dlg">').appendTo(".header-dlg");
    $('<div class="top-r-dlg">').appendTo(".header-dlg");

    $('<div class="toggle-btn-dlg ' + groupStyle + '" id="button1">').appendTo(
      ".top-r-dlg"
    );
    $('<div class="i_dlg_doc">').appendTo("#button1");
    $('<span class="label" id="label1">').appendTo("#button1");

    $('<div class="toggle-btn-dlg ' + groupStyle + '" id="button2">').appendTo(
      ".top-r-dlg"
    );
    $('<div class="i_dlg_imgs">').appendTo("#button2");
    $('<span class="label" id="label2">').appendTo("#button2");

    $('<div class="cnt-dlg">').appendTo(".header-dlg");

    $(".top-l-dlg").html("<label>Advocacy Tracker</label>");
    $(".dlg_title").html(dlgNeed);
    $(".top-c-dlg").html("##/##/####");
    $(".cnt-dlg").html("[ Advocacy Stage ]");
    $("#label1").html("Documents");
    $("#label2").html("Images");

    $('<div class="sec1">').appendTo(".sections");
    $('<div class="dl2">').appendTo(".sec1");

    $('<div class="dl1_title">').appendTo(".dl1");
    $('<div class="dl1_end_d">').appendTo(".dl1");
    $('<div class="dl1_cont">').appendTo(".dl1");

    $(".dl2").html(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel blandit libero, non suscipit ligula. Maecenas molestie finibus scelerisque. Curabitur luctus vel orci sed pulvinar. Suspendisse potenti. Donec orci velit, mollis eget arcu a, feugiat aliquam nunc. Morbi a consectetur ligula. Nunc mattis, metus sed dictum venenatis, quam felis placerat odio, at vulputate mauris eros sed mi. Aenean ut augue vestibulum, sollicitudin arcu tincidunt, ultrices sem. Suspendisse quis lobortis felis. Etiam tincidunt congue viverra. Pellentesque sapien nisl, condimentum sit amet diam at, finibus consectetur sapien. Quisque pretium suscipit felis et laoreet. Quisque tincidunt lectus leo, et aliquam arcu pretium vel. Cras finibus tincidunt tincidunt. Praesent eu luctus urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;Duis elit nisi, commodo et ornare eget, ultricies et turpis. Curabitur ullamcorper lacinia urna at mollis. Duis accumsan, mauris vitae posuere pulvinar, tortor ligula facilisis ex, at ultricies justo neque in dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan ante vitae neque imperdiet, a maximus nulla cursus. Nam facilisis scelerisque purus, vitae ornare neque placerat non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vel ante eget arcu pulvinar vehicula at at nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.Aenean mattis ultricies imperdiet. Nulla rhoncus, est sit amet commodo ullamcorper, augue arcu laoreet dolor, tristique dictum velit orci in dui. Nulla ut libero ut tellus porta convallis ut ultrices odio. Ut non volutpat risus, et consectetur justo. Aliquam consequat ut erat vitae tincidunt. Donec fringilla posuere quam, sed aliquet quam rutrum quis. Aenean euismod nulla non sem pharetra, sit amet luctus tortor pulvinar. Quisque consectetur lectus vitae hendrerit euismod. Sed non lobortis eros. Sed accumsan eget justo eu varius. Curabitur consequat, orci eget interdum luctus, turpis purus dictum ipsum, at egestas magna dui sit amet eros. Suspendisse quis sollicitudin sem.Phasellus mi turpis, posuere eget justo quis, maximus laoreet lectus. Praesent tempor urna orci, in auctor nunc porttitor id. Vivamus imperdiet odio non ultricies auctor."
    );

    $('<div class="sec2">').appendTo(".sections").css({
      visibility: "hidden",
      height: "0px",
    });
    $('<div class="dl3">').appendTo(".sec2");

    $('<div class="dl3title">').appendTo(".dl3");
    $(".dl3title").html(
      "Documents => Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum."
    );

    $('<div id="file1" class="dl3files">').appendTo(".dl3");

    $('<div id="f_icon1" class="f_icon">').appendTo("#file1");
    $('<div class="doc_file">').appendTo("#f_icon1");
    $('<div id="f_name1" class="f_name">').appendTo("#file1");

    $("#f_name1").html(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum."
    );

    //--------------------------
    $('<div id="file2" class="dl3files">').appendTo(".dl3");
    $('<div id="f_icon2" class="f_icon">').appendTo("#file2");
    $('<div class="pdf_file">').appendTo("#f_icon2");
    $('<div id="f_name2" class="f_name">').appendTo("#file2");
    $("#f_name2").html(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum."
    );

    $('<div id="file3" class="dl3files">').appendTo(".dl3");
    $('<div id="f_icon3" class="f_icon">').appendTo("#file3");
    $('<div class="xls_file">').appendTo("#f_icon3");
    $('<div id="f_name3" class="f_name">').appendTo("#file3");
    $("#f_name3").html(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum."
    );

    $('<div class="sec3">').appendTo(".sections").css({
      visibility: "hidden",
      height: "0px",
    });
    $('<div class="dl4">').appendTo(".sec3");
    $('<div class="dl4title">').appendTo(".dl4");
    $('<div class="dl4cont">').appendTo(".dl4");
    $('<div class="i1">').appendTo(".dl4cont");
    $('<div class="i2">').appendTo(".dl4cont");
    $('<div class="i3">').appendTo(".dl4cont");
    $(".dl4title").html("Images");
    $(".i1").html(
      "<img src='" + url + imgs[0] + "' style='width:100%; height:auto;'>"
    );
    $(".i2").html(
      "<img src='" + url + imgs[1] + "' style='width:100%; height:auto;'>"
    );
    $(".i3").html(
      "<img src='" + url + imgs[2] + "' style='width:100%; height:auto;'>"
    );
  }
});
