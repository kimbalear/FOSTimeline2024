$(document).ready(function () {
  // Initial data loading for filter options.
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
    // Create the base structure of the year
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

    // Attaches the base structure to the parent element
    var lineYear = `${year}yr`;
    if (!existingElement(`#${lineYear}`)) {
      $(".timeline").append(baseHtml);
    }
    // Generate the month divs at both the top and bottom
    for (let i = 1; i <= 12; i++) {
      let monthUpper = `<div id="${year}tp${i}" class="tp${i}"></div>`;
      let monthLower = `<div id="${year}bt${i}" class="bt${i}"></div>`;
      $(`#${year}yr`).append(monthUpper, monthLower);
    }

    // Add months to the timeline

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
        //console.log("i: " + i + " years[i]:" + years[i]);
        yearConstruct(years[i]);
      }
    }

    $(".top_timeline").css({
      visibility: "visible",
    });
  }

  // Data loading implementation
  loadData("http://localhost:3001/getOrgUnits", function (data) {
    handleSuccess(data, "#orgUnitsOptions", "ou");
  });
  loadData("http://localhost:3001/getTypeNeeds", function (data) {
    handleSuccess(data, "#needsOptions", "nd");
  });
  loadData("http://localhost:3001/getYears", function (data) {
    handleSuccess(data, "#yearsOptions", "year");
  });

  // Feature to show/hide filter options
  function toggleOptions(selectId, optionsDivId) {
    $(document).on("click", selectId, function (e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $(optionsDivId).toggle();
    });
  }

  // Function to select a filter option and display it as a "pill"
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

  // Function to delete a selected "pill"
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

  // Feature to close options when clicking outside
  function closeOptionsOnClickOutside(selectId, optionsDivId) {
    $(document).on("click", function (e) {
      if (!$(e.target).closest(`${selectId}, ${optionsDivId}`).length) {
        $(optionsDivId).hide();
        $(selectId).removeClass("active");
      }
    });
  }

  // Prevent options from closing when clicking within them
  $(document).on("click", ".option", function (e) {
    e.stopPropagation();
  });

  // Implementation of UI functions
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

  // Handling #irun button click to run logic based on filter selections
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
          console.log("Needs by years:", data);
          displayNeeds(data, orgUnitsNames);
        },
        error: function (error) {
          console.error("Error obtaining needs for years:", error);
        },
      });

      $.ajax({
        url: "http://localhost:3001/api/contributionsByYears",
        type: "GET",
        data: {
          years: years.join(","),
        },
        success: function (data) {
          console.log("Contributions by year:", data);
          displayContributions(data, orgUnitsNames);
        },
        error: function (error) {
          console.error("Error al obtener las contribuciones por años:", error);
        },
      });
    } else {
      console.log("No years selected");
    }
  });

  function displayNeeds(data) {
    // Group needs by month
    const needsByMonth = data.reduce((acc, need) => {
      const month = need.month;
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(need);
      return acc;
    }, {});

    // Iterate over `needsByMonth` to display needs
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
    // Filter data based on selected organizational units
    const filteredData = data.filter((contribution) =>
      selectedOrgUnits.includes(contribution.orgUnitName)
    );

    // Process filtered data to group it by month
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
    // Iterate over `contributionsByMonth` to show contributions
    for (let month in contributionsByMonth) {
      const contribMonth = contributionsByMonth[month];
      let monthNr = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;
      ContributionsCnt = contribMonth.length;
      //console.log(`Contributions: ${ContributionsCnt} for month:  ${month}`);

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
    $(".card_lgn1").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd2").click(function () {
    $(".card_lgn2").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd3").click(function () {
    $(".card_lgn3").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd4").click(function () {
    $(".card_lgn4").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd5").click(function () {
    $(".card_lgn5").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd6").click(function () {
    $(".card_lgn6").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd7").click(function () {
    $(".card_lgn7").toggle(this.checked);
    listcardsChildren();
  });

  $("#lgnd8").click(function () {
    $(".card_lgn8").toggle(this.checked);
    listcardsChildren();
  });

  // Do items with class "listcards" have children?
  function listcardsChildren() {
    $(".pnl_btm").each(function () {
      var $thisPnlBtm = $(this);
      var hasVisibleCards =
        $thisPnlBtm.find(".listcards > div").filter(function () {
          return $(this).css("display") !== "none";
        }).length > 0;

      if (hasVisibleCards) {
        $thisPnlBtm.show();
      } else {
        $thisPnlBtm.hide();
      }
    });
  }

  // cards actions
  // Selector that searches for any element whose class starts with 'card_lgn'
  $(document).on("click", "[class^='card_lgn']", function () {
    // Extract number from class name using a regular expression
    var classList = $(this).attr("class").split(/\s+/); // Split classes into an array
    var cardNumber;
    $.each(classList, function (index, className) {
      var match = className.match(/^card_lgn(\d+)/);
      if (match) {
        cardNumber = match[1]; // Save the number when you find a match
        return false;
      }
    });

    // Collect card information
    var partner = $(this).find(".partner").text();
    var title = $(this).find(".title").text();
    var subtitle = $(this).find(".subtitle").text();
    var content = $(this).find(".cont").text();

    // Mostrar la información recogida junto con el número del card
    alert(
      "Card Number: " +
        cardNumber +
        "\nPartner: " +
        partner +
        "\nTitle: " +
        title +
        "\nSubtitle: " +
        subtitle +
        "\nContent: " +
        content
    );
    contentCards_need(cardNumber, partner, title, subtitle, content);
  });

  //-- Legends cta
  function contentCards_need(cardNumber, partner, title, subtitle, content) {
    var imgs = ["1.jpg", "2.jpg", "3.jpg"];
    var url = "https://knowtechture.com/timeline/src/assets/imgs/";

    dialogsNeed = `
    <div class="dlg d_lgnd${cardNumber}">
      <div class="dlg_bar lgnd${cardNumber}_g">
      <div class="dlg_title">Promoting sexual and gender diversity - Regression Introduced</div>
      <div class="dlg_cta lgnd${cardNumber}_g">
        <div class="btn-sys-edit"></div>
        <div class="btn-sys-close"></div>
      </div>
    </div>
    <div class="dlg_cnt">
      <div class="cnt_header">
        <div class="wrapper-dlg">
          <div class="header-dlg">
            <div class="top-l-dlg"><label>Advocacy Tracker</label></div>
            <div class="top-c-dlg">2024 Jan 02</div>
            <div class="top-r-dlg">
              <div class="toggle-btn-dlg lgnd${cardNumber}_g">
                <div class="i_dlg_doc"></div>
                <span class="label">File Upload</span>
              </div>
              <div class="toggle-btn-dlg lgnd${cardNumber}_g">
                <div class="i_dlg_imgs"></div>
                <span class="label">Images</span>
              </div>
            </div>
            <div class="cnt-dlg">Regression Introduced</div>
          </div>
        </div>
      </div>
      <div class="cnt_sections">
        <div class="sections">
          <div class="sec1">
            <div class="dl2">
              <div class="bxtext">
                <div class="lbl">Brief Description</div>
                <div class="content">ewwertert</div>
                <div class="lbl">Additional Details</div>
                <div class="content">34534</div>
                <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
                <div class="content">Sub-national</div>
                <div class="lbl">Advocacy Win Type</div>
                <div class="content">Approval of new or revised CSE curriculum or curricular guidelines</div>
              </div>
            </div>
          </div>
        <div class="sec2">
          <div class="dl3">
            <div class="dl3title">File Upload</div>
            <div class="dl3files">
              <div class="f_icon">
                <div class="f_icon">
                  <div class="xls_file"></div>
                </div>
              </div>
              <div class="f_name">ic_launcher_background.xml</div>
            </div>
          </div>
        </div>
        <div class="sec3">
          <div class="dl4">
            <div class="dl4title">Images</div>
            <div class="dl4cont">
              <div class="i1">
                <img src="${url}${imgs[0]}"">
              </div>
              <div class="i2">
              <img src="${url}${imgs[1]}"">
              </div>
              <div class="i3">
              <img src="${url}${imgs[2]}"">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    $('<div class="scrim">').appendTo(".wrapper");
    $(dialogsNeed).appendTo(".scrim");
  }

  //New Advocacy Tracking Tool
  $(document).on("click", ".btn_addnew", function (e) {
    e.preventDefault();
    var id = $(this).attr("id");

    var addNewBase = `
    <div class="dlg_bar">
      <div class="dlg_title">New Advocacy Tracking Tool</div>
        <div class="dlg_cta">
          <div class="btn-sys-close"></div>
        </div>
      </div>
      <div class="dlg_cnt">
        <div class="cnt_header">
          <div class="newAdvocayTrackingTool">
            <div class="newAttHeader">
              <div class="newAttHeader-left">
                <div class="fields">
                  <div class="lbl">Advocacy Stage</div>
                  <select id="advStage" class="form-select" aria-label="Default select example">
                    <option value="" disabled selected>Select your option</option>
                    <option value="Contribution">Contribution</option>
                    <option value="RegressionIntroduced">Regression Introduced</option>
                    <option value="Defended">Defended</option>
                    <option value="Loss">Loss</option>
                    <option value="ReformIntroduced">Reform Introduced</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Approved">Approved</option>
                    <option value="Implemented">Implemented</option>
                  </select>
                  <div class="helper_text">* A value is required</div>
                </div>
              </div>
            <div class="newAttHeader-right">
              <div class="fields">
                <div id="lblReportdate" class="lbl">Report date</div>
                  <div class="row form-group">
                    <div class="col-sm-6">
                      <div class="input-group date" id="reportdate">
                        <input type="text" class="form-control" />
                        <span class="input-group-append">
                          <span class="input-group-text bg-white">
                            <i class="fa fa-calendar"></i>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div class="helper_text">* A value is required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cnt_sections">
          <div class="sections">
            <div class="newAttContent">
              <div id='line1' class="fields">
                <div class="lbl">What SRHRJ need is this related to?</div>
                  <select class="form-select" aria-label="Default select example">
                    <option value="" disabled selected>Select your option</option>
                    <option value="psgd">Promoting sexual and gender diversity</option>
                    <option value="cseyp">Comprehensive sexuality education to young people</option>
                    <option value="msgv">Mitigating sexual and gender-based violence</option>
                    <option value="asla">Access to safe and legal abortion</option>
                    <option value="ac">Access to contraception</option>
                    <option value="pge">Promoting gender equality</option>
                    <option value="Other">Other</option>
                  </select>
                  <div class="helper_text">* A value is required</div>
                </div>
            <div id='line2' class="fields">
              <div id='lblBrief' class="lbl">Brief (120 ch)</div>
              <input class="form-control" type="text" aria-label="default input example">
              <div class="helper_text">* A value is required</div>
            </div>
            <div id='line3' class="fields">
              <div class="lbl">Brief Translations</div>
              <input class="form-control" type="text" aria-label="default input example">
              <div class="helper_text"></div>
            </div>
            <div id='line4' class="fields">
              <div id='lblDetail' class="lbl">Detail</div>
              <textarea class="form-control" id="exampleFormControlTextarea4" rows="3"></textarea>
              <div class="helper_text"></div>
            </div>
            <div id='line5'class="fields">
              <div class="lbl">Detail Translations</div>
              <textarea class="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
              <div class="helper_text"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dlg_cta_bttm"></div>`;

    var ctaBtnsBtm = `
    <div class="bttm-btns">
      <button type="button" class="btn btn-outline-secondary">Cancel</button>
      <button type="button" class="btn btn-outline-primary">Save and next</button>
      <button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true">Save and exit</button>
    </div>`;

    $(`<div class="scrim">`).appendTo(".wrapper");
    $(`<div id="${id}dlgNew" class="dlg_new">`).appendTo(".scrim");
    $(addNewBase).appendTo(`.dlg_new`);
    $(ctaBtnsBtm).appendTo(`.dlg_cta_bttm`);
  });

  $(document).on("click", ".btn-sys-close", function () {
    $("div.scrim").remove();
  });

  // Mapping values to functions
  const actionMap = {
    Contribution: advStageContribution,
    RegressionIntroduced: advStageRegressionIntroduced,
    Defended: advStageDefended,
    Loss: advStageLoss,
    ReformIntroduced: advStageReformIntroduced,
    Advanced: advStageAdvanced,
    Approved: advStageApproved,
    Implemented: advStageImplemented,
  };

  $(document).on("change", "#advStage", function () {
    var selectedValue = $(this).val();
    // Delete items before adding new ones
    removeElements();

    // Execute the function corresponding to the selected value if it exists
    if (
      actionMap[selectedValue] &&
      $("#" + getFirstId(selectedValue)).length === 0
    ) {
      actionMap[selectedValue]();
    }
  });

  // Function to remove elements
  function removeElements() {
    $(
      "#beforeLine1, #afterLine51, #afterLine52, #afterLine62, #afterLine72, #afterLine53, #afterLine63, #afterLine73, #afterLine54, #afterLine64, #afterLine74, #afterLine55, #afterLine65, #afterLine75, #afterLine56, #afterLine66, #afterLine76, #afterLine57, #afterLine67, #afterLine77"
    ).remove();
  }

  // Function to get first ID based on selected value
  function getFirstId(value) {
    const idMap = {
      Contribution: "beforeLine1",
      RegressionIntroduced: "afterLine51",
      Defended: "afterLine52",
      Loss: "afterLine53",
      ReformIntroduced: "afterLine54",
      Advanced: "afterLine55",
      Approved: "afterLine56",
      Implemented: "afterLine57",
    };
    return idMap[value] || "defaultId";
  }

  function advStageContribution() {
    var beforeLine1 = `<div id="beforeLine1" class="lineTwoFields">
        <div class="lineTwoFields-lbl">
          <div class="lbl">Did this advocacy activity take place over an extended period of time? If so, please indicate the end date or, if it is not yet complete, indicate that it is on-going</div>
        </div>
        <div class="lineTwoFields-left">
          <select
            class="form-select"
            aria-label="Default select example">
            <option value="" disabled selected>
              Select your option
            </option>
            <option value="Completed">Completed</option>
            <option value="On_going">On-going</option>
          </select>
        </div>
        <div class="lineTwoFields-right">
          <div class="row form-group">
            <div class="col-sm-7">
              <div class="input-group date" id="dateadvactivity">
                <input type="text" class="form-control" />
                <span class="input-group-append">
                  <span class="input-group-text bg-white">
                    <i class="fa fa-calendar"></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    $(".newAttHeader").css({
      "grid-template-columns": "auto 1fr",
      "grid-template-rows": "1fr",
      "grid-template-areas": '"newAttHeader-left newAttHeader-right"',
    });

    $("#line1").before(beforeLine1);
    $("#lblReportdate").html(
      "On what date did you conduct an advocacy activity?"
    );

    $("#lblBrief").html(
      "Please describe the advocacy activity your organization conducted (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about your advocacy activity."
    );
  }

  function advStageRegressionIntroduced() {
    var afterLine51 = `
    <div id="afterLine51" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageAfterLine5Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageAfterRight5" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine51);

    $(".newAttHeader").css({
      "grid-template-columns": "1fr",
      "grid-template-rows": "auto auto",
      "grid-template-areas": '"newAttHeader-left" "newAttHeader-right"',
    });

    $("#lblReportdate").html(
      "On what date was a regression or restriction against SRHRJ introduced by external actors in your context?"
    );

    $("#lblBrief").html(
      "Please describe the regression or restriction against SRHRJ that was introduced by external actors in your context (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the regression or restriction on SRHRJ that was introduced."
    );
  }

  function advStageDefended() {
    var afterLine52 = `
    <div id='afterLine52'class="fields">
      <div class="lbl">What worked in your defense of SRHRJ that will be a lesson for the future?.</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine62 = `
    <div id='afterLine62'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine72 = `
    <div id="afterLine72" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine52);
    $("#afterLine52").after(afterLine62);
    $("#afterLine62").after(afterLine72);

    $("#lblReportdate").html(
      "On what date were you successful in defending SRHRJ against regression or restriction?"
    );

    $("#lblBrief").html(
      "Please describe the successful defense of SRHRJ against policy, legislative, protocol or judicial regression that your organization contributed to (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the successful defense of SRHRJ against policy, legislative, protocol or judicial regression/restriction that your organization contributed to."
    );
  }

  function advStageLoss() {
    var afterLine53 = `
    <div id='afterLine53'class="fields">
      <div class="lbl">What did not work and why?</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine63 = `
    <div id='afterLine63'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine73 = `
    <div id="afterLine72" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine53);
    $("#afterLine53").after(afterLine63);
    $("#afterLine63").after(afterLine73);

    $("#lblReportdate").html(
      "On what date did a policy, legislative, protocol or judicial loss related to SRHRJ occur?"
    );

    $("#lblBrief").html(
      "Please describe the policy, legislative, protocol or judicial loss related to SRHRJ (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the loss or rejection related to SRHRJ."
    );
  }

  function advStageReformIntroduced() {
    var afterLine54 = `
    <div id='afterLine54'class="fields">
      <div class="lbl">What did not work and why?</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine64 = `
    <div id='afterLine64'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine74 = `
    <div id="afterLine74" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine54);
    $("#afterLine54").after(afterLine64);
    $("#afterLine64").after(afterLine74);

    $("#lblReportdate").html(
      "On what date was a policy, law, protocol, or judicial initiative in support of SRHRJ introduced thanks to the contribution of your organization?"
    );

    $("#lblBrief").html(
      "Please describe the policy, law, protocol, or judicial reform that was introduced in support of SRHRJ to which your organization contributed (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the policy, law, protocol, or judicial reform that was introduced in support of SRHRJ to which your organization contributed."
    );
  }

  function advStageAdvanced() {
    var afterLine55 = `
    <div id='afterLine55'class="fields">
      <div class="lbl">What did not work and why?</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine65 = `
    <div id='afterLine65'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine75 = `
    <div id="afterLine75" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine55);
    $("#afterLine55").after(afterLine65);
    $("#afterLine65").after(afterLine75);

    $("#lblReportdate").html(
      "On what date was a policy, law, protocol, or judicial initiative in support of SRHRJ advanced thanks to the contribution of your organization?"
    );

    $("#lblBrief").html(
      "Please describe the advancement in a policy, law, protocol, or judicial reform in support of SRHRJ to which your organization contributed (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the advancement in a policy, law, protocol, or judicial reform in support of SRHRJ to which your organization contributed."
    );
  }

  function advStageApproved() {
    var afterLine56 = `
    <div id='afterLine56'class="fields">
      <div class="lbl">What did not work and why?</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine66 = `
    <div id='afterLine66'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine76 = `
    <div id="afterLine76" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine56);
    $("#afterLine56").after(afterLine66);
    $("#afterLine66").after(afterLine76);

    $("#lblReportdate").html(
      "On what date was a policy, law, protocol, or judicial initiative in support of SRHRJ approved thanks to the contribution of your organization?"
    );

    $("#lblBrief").html(
      "Please describe the policy, law, protocol, or judicial reform that was approved/enacted in support of SRHRJ to which your organization contributed (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the policy, law, protocol, or judicial reform that was approved in support of SRHRJ to which your organization contributed."
    );
  }

  function advStageImplemented() {
    var afterLine57 = `
    <div id='afterLine57'class="fields">
      <div class="lbl">What did not work and why?</div>
      <textarea class="form-control" id="exampleFormControlTextarea6" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine67 = `
    <div id='afterLine67'class="fields">
      <div class="lbl">Lessons Learned Translations</div>
      <textarea class="form-control" id="exampleFormControlTextarea7" rows="3"></textarea>
      <div class="helper_text"></div>
    </div>`;
    var afterLine77 = `
    <div id="afterLine77" class="afterLine_bttm">
      <div class="afterLine_bttm-left">
        <div class="fields">
          <div class="lbl">Please state at which level (subnational, national, regional, global) did the change occur?</div>
          <select id="advStageafterLine7Left" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="subNational">Sub-national</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Global">Global</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
      <div class="afterLine_bttm-right">
        <div class="fields">
          <div class="lbl">Advocacy Win Type</div>
          <select id="advStageafterLine7Right" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Select your option</option>
            <option value="ApprovalCSEcurriculum">Approval of new or revised CSE curriculum or curricular guidelines</option>
            <option value="newNationalStrategy">New national/sub-national strategy</option>
            <option value="newNationalLegislation">New national/sub-national legislation</option>
            <option value="MoH">MoH official guidelines approval</option>
            <option value="newRevisedPolicy">New or revised policy / protocol</option>
            <option value="financialAppropriation">Financial appropriation</option>
            <option value="courtDecision">Court decision</option>
            <option value="nationalDevelopment">National development plan (if the plan includes positive change for SRHR as a result of MA advocacy)</option>
            <option value="nationalPlanSRHR">National (or subnational) plan for a SRHR related issue</option>
            <option value="creationNewProgram">Creation of a new program</option>
            <option value="inclusionSpecificMedication">Inclusion of a specific medication on the Essential Medicines List</option>
            <option value="Other">Other</option>
          </select>
          <div class="helper_text"></div>
        </div>
      </div>
    </div>`;

    $("#line5").after(afterLine57);
    $("#afterLine57").after(afterLine67);
    $("#afterLine67").after(afterLine77);

    $("#lblReportdate").html(
      "On what date was the implementation of a policy, law, protocol, or judicial ruling in support of SRHRJ advanced thanks to the contribution of your organization?"
    );

    $("#lblBrief").html(
      "Please describe the advancement in the implementation of a policy, law, protocol, or judicial ruling in support of SRHRJ to which your organization contributed (in 100 characters or less)."
    );

    $("#lblDetail").html(
      "(Optional) If desired, provide additional information about the advancement in the implementation of a policy, law, protocol, or judicial ruling in support of SRHRJ to which your organization contributed."
    );
  }

  $(document).on("click", ".toggle-btn-dlg", function () {
    var numElementosActivos = $(".toggle-btn-dlg.active").length;
    var labelContent = $(this).children(".label").html();

    if (numElementosActivos == 1) {
      if ($(this).hasClass("active")) {
        $(".toggle-btn-dlg").removeClass("active").css("width", "36px");
        if (labelContent == "Documents") {
          $(".sec1").css({
            visibility: "visible",
            height: "100%",
          });
          $(".sec2").css({
            visibility: "hidden",
            height: "0px",
          });
          $(".sec3").css({
            visibility: "hidden",
            height: "0px",
          });
        } else {
          $(".sec1").css({
            visibility: "visible",
            height: "100%",
          });
          $(".sec2").css({
            visibility: "hidden",
            height: "0px",
          });
          $(".sec3").css({
            visibility: "hidden",
            height: "0px",
          });
        }
      } else {
        $(".toggle-btn-dlg").removeClass("active").css("width", "36px");
        $(this).addClass("active").css("width", "max-content");
        if (labelContent == "Documents") {
          $(".sec1").css({
            visibility: "hidden",
            height: "0px",
          });
          $(".sec2").css({
            visibility: "visible",
            height: "100%",
          });
          $(".sec3").css({
            visibility: "hidden",
            height: "0px",
          });
        } else if (labelContent == "Images") {
          $(".sec1").css({
            visibility: "hidden",
            height: "0px",
          });
          $(".sec2").css({
            visibility: "hidden",
            height: "0px",
          });
          $(".sec3").css({
            visibility: "visible",
            height: "100%",
          });
        }
      }
    } else {
      $(this).addClass("active").css("width", "max-content");
      if (labelContent == "Documents") {
        $(".sec1").css({
          visibility: "hidden",
          height: "0px",
        });
        $(".sec2").css({
          visibility: "visible",
          height: "100%",
        });
        $(".sec3").css({
          visibility: "hidden",
          height: "0px",
        });
      } else {
        $(".sec1").css({
          visibility: "hidden",
          height: "0px",
        });
        $(".sec2").css({
          visibility: "hidden",
          height: "0px",
        });
        $(".sec3").css({
          visibility: "visible",
          height: "100%",
        });
      }
    }
  });
});
