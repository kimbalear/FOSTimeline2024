$(document).ready(function () {
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

  var urlOrgUnits = "http://localhost:3001/getOrgUnits";
  loadData(urlOrgUnits, function (data) {
    handleSuccess(data, "#orgUnitsOptions", "ou");
  });

  var urlTypeNeeds = "http://localhost:3001/getTypeNeeds";
  loadData(urlTypeNeeds, function (data) {
    handleSuccess(data, "#needsOptions", "nd");
  });

  var urlYears = "http://localhost:3001/getYears";
  loadData(urlYears, function (data) {
    handleSuccess(data, "#yearsOptions", "year");
  });
  // ----------------------------------------------------------------------
  function existingElement(ElementId) {
    if ($(ElementId).length > 0) {
      console.log("Element exists: " + ElementId);
      return true;
    } else {
      console.log("No element exists: " + ElementId);
      return false;
    }
  }
  // ----------------------------------------------------------------------

  // Panel
  // Función para mostrar/ocultar opciones
  function toggleOptions(selectId, optionsDivId) {
    $(document).on("click", selectId, function (e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $(optionsDivId).toggle();
    });
  }

  // Función para manejar la selección de opciones
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
        updateIrunButtonStatus();
      }
    });
  }

  // Función para eliminar la opción seleccionada
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
        $(optionsDivId).hide();
        $(textHeaderId).text(placeholderText);
        updateIrunButtonStatus();
      }
    });
  }

  // Función para cerrar opciones al hacer clic fuera
  function closeOptionsOnClickOutside(selectId, optionsDivId) {
    $(document).on("click", function (e) {
      if (!$(e.target).closest(`${selectId}, ${optionsDivId} .option`).length) {
        $(optionsDivId).hide();
        $(selectId).removeClass("active");
      }
    });
  }

  // Evitar que se cierren las opciones al hacer clic dentro de ellas
  $(document).on("click", ".option", function (e) {
    e.stopPropagation();
  });

  // Implementación de las funciones
  toggleOptions("#orgUnitsSelect", "#orgUnitsOptions");
  toggleOptions("#NeedsSelect", "#needsOptions");
  toggleOptions("#YearsSelect", "#yearsOptions");

  selectOption("ou", "#orgUnitsSelectd", "#txtHdrOrgUnits", "O.Unit");
  selectOption("nd", "#NeedsSelectd", "#txtHdrNeeds", "Needs");
  selectOption("year", "#YearsSelectd", "#txtHdrYears", "Year/s");

  removeSelectedOption(
    ".del_pill",
    "#orgUnitsSelectd",
    "#orgUnitsOptions",
    "#txtHdrOrgUnits",
    "O.Unit"
  );
  removeSelectedOption(
    ".del_pill",
    "#NeedsSelectd",
    "#needsOptions",
    "#txtHdrNeeds",
    "Needs"
  );
  removeSelectedOption(
    ".del_pill",
    "#YearsSelectd",
    "#yearsOptions",
    "#txtHdrYears",
    "Year/s"
  );

  closeOptionsOnClickOutside("#orgUnitsSelect", "#orgUnitsOptions");
  closeOptionsOnClickOutside("#NeedsSelect", "#needsOptions");
  closeOptionsOnClickOutside("#YearsSelect", "#yearsOptions");

  function updateIrunButtonStatus() {
    const orgUnitsHasPills = $("#orgUnitsSelectd .pill").length > 0;
    const needsHasPills = $("#NeedsSelectd .pill").length > 0;
    const yearsHasPills = $("#YearsSelectd .pill").length > 0;

    if (orgUnitsHasPills && needsHasPills && yearsHasPills) {
      $("#irun").removeClass("disabled");
    } else {
      $("#irun").addClass("disabled");
    }
  }

  if ($(".ipdf").hasClass(".disabled")) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({ delay: { show: 500, hide: 100 } });
    });
  } else {
    $(".cnt_ipanel").on("click", function () {
      $("#search-menu").toggleClass("open");
      $("#panel_sh").toggleClass("open");
    });

    $(document).on("click", "#irun", function (e) {
      e.preventDefault();
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

      showTimeline(years, orgUnitsNames);

      if (years.length > 0) {
        $.ajax({
          url: "http://localhost:3001/api/needsByYears",
          type: "GET",
          data: {
            years: years.join(","),
          },
          success: function (data) {
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
          },
          error: function (error) {
            console.error("Error obtaining the needs for years:", error);
          },
        });

        $.ajax({
          url: "http://localhost:3001/api/contributionsByYears",
          type: "GET",
          data: {
            years: years.join(","),
          },
          success: function (data) {
            console.log("contributionsByYears data received:", data);
            const contributionsByMonth = data.reduce((acc, contribution) => {
              const { month } = contribution;
              if (!acc[month]) {
                acc[month] = [];
              }
              acc[month].push(contribution);
              return acc;
            }, {});

            for (let month in contributionsByMonth) {
              const contrib_month = contributionsByMonth[month];
              let monthNr;

              contrib_month.forEach((contribution) => {
                let orgUnitName = contribution.orgUnitName;
                let cardCntr = `<div class='card_contr'>
                  <div class="partner">${orgUnitName}</div>
                  <div class="title">${contribution.title}</div>
                  <div class="cont">${contribution.description}</div>
                </div>`;

                // Determinar el número del mes basado en la cadena "month"
                switch (month) {
                  case "jan":
                    monthNr = 1;
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
                    console.log(`paso: ${year}cntr${monthNr}`);
                    $(cardCntr).appendTo(`#${year}lstcontr${monthNr}`);
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
          },
          error: function (error) {
            console.error("Error obtaining contributions for years::", error);
          },
        });
      } else {
        console.log("No years selected");
      }
    });
  }
  //--panel

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
          <div id="${year}yrstart" class="yr_start"></div>
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
        <div id="${year}${month}tl" class="tl_${month}">
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

      var tlineYear = `${year}${month}tl`;
      if (!existingElement(`#${tlineYear}`)) {
      $(`#${year}tline`).append(monthHtml);
      }
    });

    // Maneja la etiqueta del año si es necesario
    if (year.length > 4) {
      var dateArray = year.split(",");
      dateArray.forEach((date, x) => {
        $(`#${year}tline .child`).eq(dateArray[x]);
      });
    } else {
      $(`<div id="${year}lbl_yr" class="lbl"></div>`)
        .appendTo(`#${year}yrstart`)
        .html(year);
    }
  }

  function showTimeline(years, orgUnitsNames) {
    if (years.length === 1) {
      //console.log("years: " + years[0]);
      year = years[0];
      yearConstruct(year);
    } else if (years.length > 1) {
      //console.log("years: " + years);
      // todo contruir año
    }

    $(".top_timeline").css({
      visibility: "visible",
    });

    if (orgUnitsNames.length === 1) {
      $("#timelineTitle").text(orgUnitsNames);
    } else if (orgUnitsNames.length > 1) {
      timelineTitleOrgUnit = "Hay más de una OrgUnit";
      $("#timelineTitle").text(timelineTitleOrgUnit);
    }
  }
});
