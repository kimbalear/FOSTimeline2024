$(document).ready(function () {
  // orgUnits
  $.ajax({
    url: "http://localhost:3001/getOrgUnits",
    type: "GET",
    success: function (data) {
      console.log("orgUnits received:", data);
      var optionsDiv = $("#orgUnitsOptions");
      optionsDiv.empty();
      data.forEach(function (orgUnit) {
        // Add each option dynamically
        $("<div></div>")
          .attr("id", "ou" + orgUnit._id)
          .addClass("option")
          .attr("data-value", orgUnit._id)
          .text(orgUnit.name)
          .appendTo(optionsDiv);
      });
    },
    error: function (error) {
      console.error("Error getting data:", error);
    },
  });

  // Show/hide options
  $(document).on("click", "#orgUnitsSelect", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $("#orgUnitsOptions").toggle();
  });

  // Select option and add it to the selected ones
  $(document).on("click", "[id^='ou']", function (e) {
    e.stopPropagation();
    var value = $(this).attr("data-value");
    // Check if the option is already in the selected list to avoid duplicates
    if ($("#orgUnitsSelectd div[data-value='" + value + "']").length === 0) {
      $("#txtHdrOrgUnits").html("");
      $(this).addClass("option-selected");
      // Create and add the selected option to the .selected list with the requested structure
      var pill = $("<div></div>").addClass("pill").attr("data-value", value);
      // Add the name of the OU in its own <div>
      $("<div></div>").text($(this).text()).appendTo(pill);
      // Add delete button after OU name
      $("<div></div>").addClass("del_pill").appendTo(pill);
      pill.appendTo($("#orgUnitsSelectd"));
      updateIrunButtonStatus();
    }
  });

  // Remove selected option and remove the selected visual state
  $(document).on("click", ".del_pill", function (e) {
    e.stopPropagation();
    var value = $(this).closest(".pill").attr("data-value");
    $(this).closest(".pill").remove();
    // I adjust the selector to correctly target individual options with the .option class
    $(".option[data-value='" + value + "']").removeClass("option-selected");

    // Check if there are any selected pills left after deleting one
    if ($("#orgUnitsSelectd .pill").length === 0) {
      // If there are no pills left, possibly hide the .options container and show placeholder
      $("#orgUnitsOptions").hide();
      $("#txtHdrOrgUnits").text("O.Unit");
      updateIrunButtonStatus();
    }
  });

  // Close options when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#orgUnitsSelect, .option").length) {
      $("#orgUnitsOptions").hide();
      $("#orgUnitsSelect").removeClass("active");
    }
  });

  // Prevent closing of .options container when clicking inside it
  $(document).on("click", ".option", function (e) {
    e.stopPropagation();
  });
  // |- orgUnits

  // typeNeeds
  $.ajax({
    url: "http://localhost:3001/getTypeNeeds",
    type: "GET",
    success: function (data) {
      console.log("typeNeeds received:", data);
      var optionsDiv = $("#needsOptions");
      optionsDiv.empty();
      data.forEach(function (needs) {
        // Add each option dynamically
        $("<div></div>")
          .attr("id", "nd" + needs._id)
          .addClass("option")
          .attr("data-value", needs._id)
          .text(needs.name)
          .appendTo(optionsDiv);
      });
    },
    error: function (error) {
      console.error("Error getting data:", error);
    },
  });

  // Show/hide options
  $(document).on("click", "#NeedsSelect", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $("#needsOptions").toggle();
  });

  // Select option and add it to the selected ones
  $(document).on("click", "[id^='nd']", function (e) {
    e.stopPropagation();
    var value = $(this).attr("data-value");
    // Check if the option is already in the selected list to avoid duplicates
    if ($("#NeedsSelectd div[data-value='" + value + "']").length === 0) {
      $("#txtHdrNeeds").html("");
      $(this).addClass("option-selected");
      // Create and add the selected option to the .selected list with the requested structure
      var pill = $("<div></div>").addClass("pill").attr("data-value", value);
      // Add the name of the OU in its own <div>
      $("<div></div>").text($(this).text()).appendTo(pill);
      // Add delete button after OU name
      $("<div></div>").addClass("del_pill").appendTo(pill);
      pill.appendTo($("#NeedsSelectd"));
      updateIrunButtonStatus();
    }
  });

  // Remove selected option and remove the selected visual state
  $(document).on("click", ".del_pill", function (e) {
    e.stopPropagation();
    var value = $(this).closest(".pill").attr("data-value");
    $(this).closest(".pill").remove();
    // I adjust the selector to correctly target individual options with the .option class
    $(".option[data-value='" + value + "']").removeClass("option-selected");

    // Check if there are any selected pills left after deleting one
    if ($("#NeedsSelectd .pill").length === 0) {
      // If there are no pills left, possibly hide the .options container and show placeholder
      $("#needsOptions").hide();
      $("#txtHdrNeeds").text("Needs");
      updateIrunButtonStatus();
    }
  });

  // Close options when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#NeedsSelect, .option").length) {
      $("#needsOptions").hide();
      $("#NeedsSelect").removeClass("active");
    }
  });

  // Prevent closing of .options container when clicking inside it
  $(document).on("click", ".option", function (e) {
    e.stopPropagation();
  });
  // |- typeNeeds

  // Years
  $.ajax({
    url: "http://localhost:3001/getYears",
    type: "GET",
    success: function (data) {
      console.log("Years received:", data);
      var optionsDiv = $("#yearsOptions");
      optionsDiv.empty();
      data.forEach(function (obj) {
        // Add each option dynamically
        $("<div></div>")
          .attr("id", "year" + obj.id)
          .addClass("option")
          .attr("data-value", obj.year)
          .text(obj.year)
          .appendTo(optionsDiv);
      });
    },
    error: function (error) {
      console.error("Error obteniendo los años:", error);
    },
  });

  // Show/hide options
  $(document).on("click", "#YearsSelect", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $("#yearsOptions").toggle();
  });

  $(document).on("click", "[id^='year']", function (e) {
    e.stopPropagation();
    var value = $(this).attr("data-value");
    if ($("#YearsSelectd div[data-value='" + value + "']").length === 0) {
      $("#txtHdrYears").html("");
      $(this).addClass("option-selected");
      var pill = $("<div></div>").addClass("pill").attr("data-value", value);
      $("<div></div>").text($(this).text()).appendTo(pill);
      $("<div></div>").addClass("del_pill").appendTo(pill);
      pill.appendTo($("#YearsSelectd"));
      updateIrunButtonStatus();
    }
  });

  // Remove selected option and remove the selected visual state
  $(document).on("click", ".del_pill", function (e) {
    e.stopPropagation();
    var value = $(this).closest(".pill").attr("data-value");
    $(this).closest(".pill").remove();
    // I adjust the selector to correctly target individual options with the .option class
    $(".option[data-value='" + value + "']").removeClass("option-selected");

    // Check if there are any selected pills left after deleting one
    if ($("#YearsSelectd .pill").length === 0) {
      // If there are no pills left, possibly hide the .options container and show placeholder
      $("#yearsOptions").hide();
      $("#txtHdrYears").text("Year/s");
      updateIrunButtonStatus();
    }
  });

  // Close options when clicking outside for years
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#YearsSelect, #yearsOptions .option").length) {
      $("#yearsOptions").hide();
      $("#YearsSelect").removeClass("active");
    }
  });

  // Prevent closing of .options container when clicking inside it for years
  $(document).on("click", "#yearsOptions .option", function (e) {
    e.stopPropagation();
  });
  // |- years

  // Function to update button state
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

  // Panel
  if ($(".ipdf").hasClass(".disabled")) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({ delay: { show: 500, hide: 100 } });
    });
  } else {
    // ---

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
            const contributionsByYear = data.reduce((acc, contribution) => {
              const { year } = contribution;
              if (!acc[year]) {
                acc[year] = [];
              }
              acc[year].push(contribution);
              return acc;
            }, {});

            const contributionsByMonth = data.reduce((acc, contribution) => {
              const { month } = contribution;
              if (!acc[month]) {
                acc[month] = [];
              }
              acc[month].push(contribution);
              return acc;
            }, {});

            console.log("Contributions by year:", contributionsByYear);
            console.log("Contributions by month:", contributionsByMonth);

            for (let month in contributionsByMonth) {
              const contrib_month = contributionsByMonth[month];
              console.log(`Contributions in ${month}:`, contrib_month);
              let pTop, contrib;

              switch (month) {
                case "jan":
                  monthNr = 1;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);

                  
                  break;
                case "feb":
                  monthNr = 2;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "mar":
                  monthNr = 3;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "apr":
                  monthNr = 4;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "may":
                  monthNr = 5;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "jun":
                  monthNr = 6;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "jul":
                  monthNr = 7;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "aug":
                  monthNr = 8;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "sep":
                  monthNr = 9;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "oct":
                  monthNr = 10;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "nov":
                  monthNr = 11;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
                case "dec":
                  monthNr = 12;
                  pTop = `<div id='${year}pnl_top${monthNr}' class='pnl_top'></div>`;
                  contrib = `<div id='${year}cntr${monthNr}' class='contributions'></div>`;
                  line = `<div id='${year}l${monthNr}tp' class='line'></div>`;
                  $(pTop).appendTo(`#${year}tp_${monthNr}`);
                  $(contrib).appendTo(`#${year}pnl_top${monthNr}`);
                  $(line).appendTo(`#${year}pnl_top${monthNr}`);
                  cntTopMonthDots = `<div id='${year}dtsTop${monthNr}' class='dots_cnt${monthNr}'></div>`;
                  cntTopDotsTitle = `<div id='${year}dtsTtTop${monthNr}' class='lbl'>Contributions</div>`;
                  // todo <div id="dot#" class="dot#">1</div>
                  $(cntTopMonthDots).appendTo(`#${year}cnt_top${monthNr}`);
                  $(cntTopDotsTitle).appendTo(`#${year}dtsTop${monthNr}`);
                  break;
              }
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
    let tl_year = '<div id="' + year + 'yr" class="year"></div>';
    let tpyr = '<div id="' + year + 'tpyr" class="tp_yr"></div>';
    let cebtn = '<div id="' + year + 'cebtn" class="ce_top"></div>';
    let topl = '<div id="' + year + 'topl" class="top_timeline">';
    let titleou = '<div id="' + year + 'titleou" class="title_ou"></div>';
    let btnhs = '<div id="' + year + 'btnhs" class="btn_hs">Hide year</div>';
    let btnaddnew =
      '<div id="' + year + 'btnaddnew" class="btn_addnew">Add New</div>';
    let tline = '<div id="' + year + 'tline" class="t_line">';

    let yrstart = '<div id="' + year + 'yrstart" class="yr_start">';
    let btmyr = '<div id="' + year + 'btmyr" class="btm_yr">';

    $(tl_year).appendTo(".timeline");
    $(tpyr).appendTo(".year");
    $(cebtn).appendTo(".year");
    $(topl).appendTo("#" + year + "cebtn");
    $(titleou).appendTo("#" + year + "topl");
    $(btnhs).appendTo("#" + year + "topl");
    $(btnaddnew).appendTo("#" + year + "topl");

    for (itp = 1; itp <= 12; itp++) {
      var tp = '<div id="' + year + "tp_" + itp + '" class="tp' + itp + '">';
      $(tp).appendTo("#" + year + "yr");
    }

    $(tline).appendTo("#" + year + "yr");
    $(btmyr).appendTo("#" + year + "yr");

    for (ibtm = 1; ibtm <= 12; ibtm++) {
      var btm = '<div id="' + year + "bt_" + ibtm + '" class="bt' + ibtm + '">';
      $(btm).appendTo("#" + year + "yr");
    }

    $(yrstart).appendTo("#" + year + "tline");
    if (year.length > 4) {
      var dateArray = year.split(",");
      for (x = 0; x <= year.length; x++) {
        $("#" + year + "tlin")
          .find(".child")
          .eq(dateArray[x]);
      }
    } else {
      $('<div id="' + year + "lbl_yr" + '" class="lbl">').appendTo(
        "#" + year + "yrstart"
      );
      $("#" + year + "lbl_yr").html(year);
    }
    // Line
    let tlJan = `<div id="${year}jan" class="tl_jan">
      <div id="${year}cnt_top1" class="cnt_top1"></div>
      <div class="cnt">
        <div class="lbl">jan</div>
      </div>
      <div id="${year}nds_btm1" class="nds_btm1"></div>
    </div>`;
    let tlFeb = `<div id="${year}feb" class="tl_feb">
      <div id="${year}cnt_top2" class="cnt_top2"></div>
      <div class="cnt">
        <div class="lbl">feb</div>
      </div>
      <div id="${year}nds_btm2" class="nds_btm2"></div>
    </div>`;

    let tlMar = `<div id="${year}mar" class="tl_mar">
      <div id="${year}cnt_top3" class="cnt_top3"></div>
      <div class="cnt">
        <div class="lbl">mar</div>
      </div>
      <div id="${year}nds_btm3" class="nds_btm3"></div>
    </div>`;

    let tlApr = `<div id="${year}apr" class="tl_apr">
      <div id="${year}cnt_top4" class="cnt_top4"></div>
      <div class="cnt">
        <div class="lbl">apr</div>
      </div>
      <div id="${year}nds_btm4" class="nds_btm4"></div>
    </div>`;

    let tlMay = `<div id="${year}may" class="tl_may">
      <div id="${year}cnt_top5" class="cnt_top5"></div>
      <div class="cnt">
        <div class="lbl">may</div>
      </div>
      <div id="${year}nds_btm5" class="nds_btm5"></div>
    </div>`;

    let tlJun = `<div id="${year}jun" class="tl_jun">
      <div id="${year}cnt_top6" class="cnt_top6"></div>
      <div class="cnt">
        <div class="lbl">jun</div>
      </div>
      <div id="${year}nds_btm6" class="nds_btm6"></div>
    </div>`;

    let tlJul = `<div id="${year}jul" class="tl_jul">
      <div id="${year}cnt_top7" class="cnt_top7"></div>
      <div class="cnt">
        <div class="lbl">jul</div>
      </div>
      <div id="${year}nds_btm7" class="nds_btm7"></div>
    </div>`;

    let tlAug = `<div id="${year}aug" class="tl_aug">
      <div id="${year}cnt_top8" class="cnt_top8"></div>
      <div class="cnt">
        <div class="lbl">aug</div>
      </div>
      <div id="${year}nds_btm8" class="nds_btm8"></div>
    </div>`;

    let tlSep = `<div id="${year}sep" class="tl_sep">
      <div id="${year}cnt_top9" class="cnt_top9"></div>
      <div class="cnt">
        <div class="lbl">sep</div>
      </div>
      <div id="${year}nds_btm9" class="nds_btm9"></div>
    </div>`;

    let tlOct = `<div id="${year}oct" class="tl_oct">
      <div id="${year}cnt_top10" class="cnt_top10"></div>
      <div class="cnt">
        <div class="lbl">oct</div>
      </div>
      <div id="${year}nds_btm10" class="nds_btm10"></div>
    </div>`;

    let tlNov = `<div id="${year}nov" class="tl_nov">
      <div id="${year}cnt_top11" class="cnt_top11"></div>
      <div class="cnt">
        <div class="lbl">nov</div>
      </div>
      <div id="${year}nds_btm11" class="nds_btm11"></div>
    </div>`;

    let tlDec = `<div id="${year}dec" class="tl_dec">
      <div id="${year}cnt_top12" class="cnt_top12"></div>
      <div class="cnt">
        <div class="lbl">dec</div>
      </div>
      <div id="${year}nds_btm12" class="nds_btm12"></div>
    </div>`;

    $("#" + year + "tline").append(
      tlJan,
      tlFeb,
      tlMar,
      tlApr,
      tlMay,
      tlJun,
      tlJul,
      tlAug,
      tlSep,
      tlOct,
      tlNov,
      tlDec
    );
  }

  // todo
  function yearContribPanelsConstruct(year) {}

  function showTimeline(years, orgUnitsNames) {
    if (years.length === 1) {
      console.log("years: " + years[0]);
      year = years[0];
      yearConstruct(year);
    } else if (years.length > 1) {
      console.log("years: " + years);
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
