$(document).ready(function () {
    let orgUnits = [];
    let services = [];
    let years = [];

    let tL1Ou;
    let tL1tp1 = [];
    let tL1tp2 = [];
    let tL1tp3 = [];
    let tL1tp4 = [];
    let tL1tp5 = [];
    let tL1tp6 = [];
    let tL1tp7 = [];
    let tL1tp8 = [];
    let tL1tp9 = [];
    let tL1tp10 = [];
    let tL1tp11 = [];
    let tL1tp12 = [];
    let tL1 = [];

    let tL1btmYr;
    let tL1btm1 = [];
    let tL1btm2 = [];
    let tL1btm3 = [];
    let tL1btm4 = [];
    let tL1btm5 = [];
    let tL1btm6 = [];
    let tL1btm7 = [];
    let tL1btm8 = [];
    let tL1btm9 = [];
    let tL1btm10 = [];
    let tL1btm11 = [];
    let tL1btm12 = [];

    let tL2Ou;
    let tL2tp1 = [];
    let tL2tp2 = [];
    let tL2tp3 = [];
    let tL2tp4 = [];
    let tL2tp5 = [];
    let tL2tp6 = [];
    let tL2tp7 = [];
    let tL2tp8 = [];
    let tL2tp9 = [];
    let tL2tp10 = [];
    let tL2tp11 = [];
    let tL2tp12 = [];
    let tL2 = [];

    let tL2btmYr;
    let tL2btm1 = [];
    let tL2btm2 = [];
    let tL2btm3 = [];
    let tL2btm4 = [];
    let tL2btm5 = [];
    let tL2btm6 = [];
    let tL2btm7 = [];
    let tL2btm8 = [];
    let tL2btm9 = [];
    let tL2btm10 = [];
    let tL2btm11 = [];
    let tL2btm12 = [];

    let tL3Ou;
    let tL3tp1 = [];
    let tL3tp2 = [];
    let tL3tp3 = [];
    let tL3tp4 = [];
    let tL3tp5 = [];
    let tL3tp6 = [];
    let tL3tp7 = [];
    let tL3tp8 = [];
    let tL3tp9 = [];
    let tL3tp10 = [];
    let tL3tp11 = [];
    let tL3tp12 = [];
    let tL3 = [];

    let tL3btmYr;
    let tL3btm1 = [];
    let tL3btm2 = [];
    let tL3btm3 = [];
    let tL3btm4 = [];
    let tL3btm5 = [];
    let tL3btm6 = [];
    let tL3btm7 = [];
    let tL3btm8 = [];
    let tL3btm9 = [];
    let tL3btm10 = [];
    let tL3btm11 = [];
    let tL3btm12 = [];

    let id_ou
    let nameOu
    let qry1, qry2, qry3
    let arrYear
    let sortedYears

    $('.msbx-ou').each(function (e) {
        var self = $(this)
        var field = self.find('.msbx-ou_field')
        var fieldOption = field.find('option')
        var placeholder = field.attr('data-placeholder')

        field.hide().after(`<div class="msbx-ou_dropdown"></div>
                            <span class="msbx-ou_placeholder">` + placeholder + `</span>
                            <ul class="msbx-ou_list"></ul>
                            <span class="msbx-ou_arrow"></span>`)

        fieldOption.each(function (e) {
            $('.msbx-ou_list').append(`<li class="msbx-ou_option" data-value="` + $(this).val() + `">
                                                <a class="msbx-ou_text">`+ $(this).text() + `</a>
                                              </li>`)
        })

        var fields = self.find('.msbx-ou_field')
        var dropdown = self.find('.msbx-ou_dropdown')
        var list = self.find('.msbx-ou_list')
        var option = self.find('.msbx-ou_option')
        var optionText = self.find('.msbx-ou_text')

        dropdown.attr('data-multiple', 'true')
        list.css('top', dropdown.height() + 5)

        option.click(function (e) {
            var self = $(this)
            e.stopPropagation()
            self.addClass('-selected')
            field.find('option:contains(' + self.children().text() + ')').prop('selected', true)

            dropdown.append(function (e) {
                return $('<span class="msbx-ou_choice">' + self.children().text() + '<svg class="msbx-ou_deselect -iconX"><use href="#iconX"></use></svg></span>').click(function (e) {
                    var self = $(this)
                    e.stopPropagation()
                    self.remove()

                    list.find('.msbx-ou_option:contains(' + self.text() + ')').removeClass('-selected')
                    dropdown.css('top', dropdown.height() + 5).find('.msbx-ou_noselections').remove()
                    field.find('option:contains(' + self.text() + ')').prop('selected', false)
                    selector(field, "ou")


                    if (dropdown.children(':visible').length === 0) {
                        dropdown.removeClass('-hasValue')

                    }
                })
            }).addClass('-hasValue')
            list.css('top', dropdown.height() + 5)
            if (!option.not('.-selected').length) {
                dropdown.append('<p class="msbx-ou_noselections">No more selections</p>')
            }

            selector(field, "ou")
        })

        dropdown.click(function (e) {
            e.stopPropagation()
            e.preventDefault()
            dropdown.toggleClass('-open')
            list.toggleClass('-open').scrollTop(0).css('top', dropdown.height() + 5)
        })

        $(document).on('click touch', function (e) {
            if (dropdown.hasClass('-open')) {
                dropdown.toggleClass('-open')
                list.removeClass('-open')
            }
        })
    })

    $('.msbx-srv').each(function (e) {
        var self = $(this)
        var field = self.find('.msbx-srv_field')
        var fieldOption = field.find('option')
        var placeholder = field.attr('data-placeholder')

        field.hide().after(`<div class="msbx-srv_dropdown"></div>
                            <span class="msbx-srv_placeholder">` + placeholder + `</span>
                            <ul class="msbx-srv_list"></ul>
                            <span class="msbx-srv_arrow"></span>`)

        fieldOption.each(function (e) {
            $('.msbx-srv_list').append(`<li class="msbx-srv_option" data-value="` + $(this).val() + `">
                                                <a class="msbx-srv_text">`+ $(this).text() + `</a>
                                              </li>`)
        })

        var dropdown = self.find('.msbx-srv_dropdown')
        var list = self.find('.msbx-srv_list')
        var option = self.find('.msbx-srv_option')
        var optionText = self.find('.msbx-srv_text')

        dropdown.attr('data-multiple', 'true')
        list.css('top', dropdown.height() + 5)

        option.click(function (e) {
            var self = $(this)
            e.stopPropagation()
            self.addClass('-selected')
            field.find('option:contains(' + self.children().text() + ')').prop('selected', true)
            dropdown.append(function (e) {
                return $('<span class="msbx-srv_choice">' + self.children().text() + '<svg class="msbx-srv_deselect -iconX"><use href="#iconX"></use></svg></span>').click(function (e) {
                    var self = $(this)
                    e.stopPropagation()
                    self.remove()
                    list.find('.msbx-srv_option:contains(' + self.text() + ')').removeClass('-selected')
                    dropdown.css('top', dropdown.height() + 5).find('.msbx-srv_noselections').remove()
                    field.find('option:contains(' + self.text() + ')').prop('selected', false)
                    selector(field, "srv")

                    if (dropdown.children(':visible').length === 0) {
                        dropdown.removeClass('-hasValue')
                    }
                })
            }).addClass('-hasValue')
            list.css('top', dropdown.height() + 5)
            if (!option.not('.-selected').length) {
                dropdown.append('<p class="msbx-srv_noselections">No more selections</p>')
            }

            selector(field, "srv")
        })

        dropdown.click(function (e) {
            e.stopPropagation()
            e.preventDefault()
            dropdown.toggleClass('-open')
            list.toggleClass('-open').scrollTop(0).css('top', dropdown.height() + 5)
        })

        $(document).on('click touch', function (e) {
            if (dropdown.hasClass('-open')) {
                dropdown.toggleClass('-open')
                list.removeClass('-open')
            }
        })
    })

    $('.msbx-yrs').each(function (e) {
        var self = $(this)
        var field = self.find('.msbx-yrs_field')
        var fieldOption = field.find('option')
        var placeholder = field.attr('data-placeholder')

        field.hide().after(`<div class="msbx-yrs_dropdown"></div>
                            <span class="msbx-yrs_placeholder">` + placeholder + `</span>
                            <ul class="msbx-yrs_list"></ul>
                            <span class="msbx-yrs_arrow"></span>`)

        fieldOption.each(function (e) {
            $('.msbx-yrs_list').append(`<li class="msbx-yrs_option" data-value="` + $(this).val() + `">
                                                <a class="msbx-yrs_text">`+ $(this).text() + `</a>
                                              </li>`)
        })

        var dropdown = self.find('.msbx-yrs_dropdown')
        var list = self.find('.msbx-yrs_list')
        var option = self.find('.msbx-yrs_option')

        dropdown.attr('data-multiple', 'true')
        list.css('top', dropdown.height() + 5)

        option.click(function (e) {
            var self = $(this)
            e.stopPropagation()
            self.addClass('-selected')
            field.find('option:contains(' + self.children().text() + ')').prop('selected', true)
            dropdown.append(function (e) {
                return $('<span class="msbx-yrs_choice">' + self.children().text() + '<svg class="msbx-yrs_deselect -iconX"><use href="#iconX"></use></svg></span>').click(function (e) {
                    var self = $(this)
                    e.stopPropagation()
                    self.remove()
                    list.find('.msbx-yrs_option:contains(' + self.text() + ')').removeClass('-selected')
                    dropdown.css('top', dropdown.height() + 5).find('.msbx-yrs_noselections').remove()
                    field.find('option:contains(' + self.text() + ')').prop('selected', false)
                    selector(field, "yrs")

                    if (dropdown.children(':visible').length === 0) {
                        dropdown.removeClass('-hasValue')
                    }
                })
            }).addClass('-hasValue')
            list.css('top', dropdown.height() + 5)
            if (!option.not('.-selected').length) {
                dropdown.append('<p class="msbx-yrs_noselections">No more selections</p>')
            }

            selector(field, "yrs")
        })

        dropdown.click(function (e) {
            e.stopPropagation()
            e.preventDefault()
            dropdown.toggleClass('-open')
            list.toggleClass('-open').scrollTop(0).css('top', dropdown.height() + 5)
        })

        $(document).on('click touch', function (e) {
            if (dropdown.hasClass('-open')) {
                dropdown.toggleClass('-open')
                list.removeClass('-open')
            }
        })
    })

    function readJson() {
        $.ajax({
            method: "GET",
            url: "data.json",
            success: function (response) {

                // Selectores
                orgUnits.push(response.Ous)
                services.push(response.services)
                years.push(response.years)

                //timeline1
                tL1Ou = response.time_lines1[0].t_line[0].ou;

                tL1tp1.push(response.time_lines1[0].tp1.length)
                tL1tp2.push(response.time_lines1[0].tp2.length)
                tL1tp3.push(response.time_lines1[0].tp3.length)
                tL1tp4.push(response.time_lines1[0].tp4.length)
                tL1tp5.push(response.time_lines1[0].tp5.length)
                tL1tp6.push(response.time_lines1[0].tp6.length)
                tL1tp7.push(response.time_lines1[0].tp7.length)
                tL1tp8.push(response.time_lines1[0].tp8.length)
                tL1tp9.push(response.time_lines1[0].tp9.length)
                tL1tp10.push(response.time_lines1[0].tp10.length)
                tL1tp11.push(response.time_lines1[0].tp11.length)
                tL1tp12.push(response.time_lines1[0].tp12.length)

                tL1.push(response.time_lines1[0].t_line)

                tL1btm1.push(response.time_lines1[0].btm1.length)
                tL1btm2.push(response.time_lines1[0].btm2.length)
                tL1btm3.push(response.time_lines1[0].btm3.length)
                tL1btm4.push(response.time_lines1[0].btm4.length)
                tL1btm5.push(response.time_lines1[0].btm5.length)
                tL1btm6.push(response.time_lines1[0].btm6.length)
                tL1btm7.push(response.time_lines1[0].btm7.length)
                tL1btm8.push(response.time_lines1[0].btm8.length)
                tL1btm9.push(response.time_lines1[0].btm9.length)
                tL1btm10.push(response.time_lines1[0].btm10.length)
                tL1btm11.push(response.time_lines1[0].btm11.length)
                tL1btm12.push(response.time_lines1[0].btm12.length)

                //timeline2
                tL2Ou = response.time_lines2[0].t_line[0].ou;

                tL2tp1.push(response.time_lines2[0].tp1.length)
                tL2tp2.push(response.time_lines2[0].tp2.length)
                tL2tp3.push(response.time_lines2[0].tp3.length)
                tL2tp4.push(response.time_lines2[0].tp4.length)
                tL2tp5.push(response.time_lines2[0].tp5.length)
                tL2tp6.push(response.time_lines2[0].tp6.length)
                tL2tp7.push(response.time_lines2[0].tp7.length)
                tL2tp8.push(response.time_lines2[0].tp8.length)
                tL2tp9.push(response.time_lines2[0].tp9.length)
                tL2tp10.push(response.time_lines2[0].tp10.length)
                tL2tp11.push(response.time_lines2[0].tp11.length)
                tL2tp12.push(response.time_lines2[0].tp12.length)

                tL2.push(response.time_lines2[0].t_line)

                tL2btm1.push(response.time_lines2[0].btm1.length)
                tL2btm2.push(response.time_lines2[0].btm2.length)
                tL2btm3.push(response.time_lines2[0].btm3.length)
                tL2btm4.push(response.time_lines2[0].btm4.length)
                tL2btm5.push(response.time_lines2[0].btm5.length)
                tL2btm6.push(response.time_lines2[0].btm6.length)
                tL2btm7.push(response.time_lines2[0].btm7.length)
                tL2btm8.push(response.time_lines2[0].btm8.length)
                tL2btm9.push(response.time_lines2[0].btm9.length)
                tL2btm10.push(response.time_lines2[0].btm10.length)
                tL2btm11.push(response.time_lines2[0].btm11.length)
                tL2btm12.push(response.time_lines2[0].btm12.length)

                //timeline3
                tL3Ou = response.time_lines3[0].t_line[0].ou;

                tL3tp1.push(response.time_lines3[0].tp1.length)
                tL3tp2.push(response.time_lines3[0].tp2.length)
                tL3tp3.push(response.time_lines3[0].tp3.length)
                tL3tp4.push(response.time_lines3[0].tp4.length)
                tL3tp5.push(response.time_lines3[0].tp5.length)
                tL3tp6.push(response.time_lines3[0].tp6.length)
                tL3tp7.push(response.time_lines3[0].tp7.length)
                tL3tp8.push(response.time_lines3[0].tp8.length)
                tL3tp9.push(response.time_lines3[0].tp9.length)
                tL3tp10.push(response.time_lines3[0].tp10.length)
                tL3tp11.push(response.time_lines3[0].tp11.length)
                tL3tp12.push(response.time_lines3[0].tp12.length)

                tL3.push(response.time_lines3[0].t_line)

                tL3btm1.push(response.time_lines3[0].btm1.length)
                tL3btm2.push(response.time_lines3[0].btm2.length)
                tL3btm3.push(response.time_lines3[0].btm3.length)
                tL3btm4.push(response.time_lines3[0].btm4.length)
                tL3btm5.push(response.time_lines3[0].btm5.length)
                tL3btm6.push(response.time_lines3[0].btm6.length)
                tL3btm7.push(response.time_lines3[0].btm7.length)
                tL3btm8.push(response.time_lines3[0].btm8.length)
                tL3btm9.push(response.time_lines3[0].btm9.length)
                tL3btm10.push(response.time_lines3[0].btm10.length)
                tL3btm11.push(response.time_lines3[0].btm11.length)
                tL3btm12.push(response.time_lines3[0].btm12.length)

            }
        })
    };

    readJson()

    function selector(field, typ) { // seleccion de Selectores
        let array = field.val()

        // Iterar sobre cada elemento del array y aplicar una función a cada uno de ellos
        let result = $.map(array, function (value, index) {
            return value;
        })

        switch (typ) {
            case "ou":
                SetOrgUnits(result, typ)
                break;
            case "srv":
                SetServices(result, typ)
                break;
            case "yrs":
                SetYears(result, typ)
                break;
            default:
                break;
        }

    };

    function SetOrgUnits(st, typ) {

        // paso 1 o infinitas orgU
        nameOu = ""
        for (var i = 0; i < st.length; i++) {

            if (i >= 1) {
                nameOu = nameOu + ", " + st[i];
            } else {
                nameOu = nameOu + st[i];
            }
        }
        console.log("st: " + st)
        console.log("st.length: " + st.length)
        console.log("nameOu: " + nameOu)
        console.log("typ: " + typ)
        $("#top_ou").text(nameOu)
        setTimeline(nameOu, typ)
    };

    function SetServices(st, typ) {
        var nameSrv = ""
        for (var i = 0; i < st.length; i++) {
            if (i >= 1) {
                nameSrv = nameSrv + ", " + st[i];
            } else {
                nameSrv = nameSrv + st[i];
            }
        }
        console.log("nameSrv: " + nameSrv)
        console.log("typ: " + typ)
        $("#top_srv").text(nameSrv)
        setTimeline(nameSrv, typ)
    };

    function SetYears(st, typ) {

        var firstYear = ""
        var lastTwo = ""
        var years = ""
        for (var i = 0; i < st.length; i++) {
            if (i >= 1) {
                lastTwo = lastTwo + "/" + st[i].slice(-2)

            } else {
                firstYear = firstYear + st[i]
            }
        }
        years = firstYear + lastTwo;
        console.log("years: " + years)
        console.log("typ: " + typ)
        $("#top_yrs").text(years)
        setTimeline(years, typ)
    };


    $('.btn-lgnd-inf').on('click', function () {

        dlgtype = 'd_' + $(this).parent().parent().find("input").attr('id')
        dlgTitle = $(this).parent().parent().find(".checkbox").text()
        groupStyle = $(this).parent().parent().find("input").attr('id') + '_g'

        console.log('PASO: ' + 'dlgtype: ' + dlgtype + ' groupStyle: ' + groupStyle)
        contentCards_i(dlgtype, dlgTitle, groupStyle)

    })

    $(document).on('click', '.btn-sys-close', function () {
        $('div.scrim').remove()
    })

    var allCheckboxes = $('[type=checkbox]');

    allCheckboxes.prop('disabled', true)

    function setTimeline(stns, typ) {
        let ou, srv, yrs;

        if (typ === "ou") {
            ou = stns;
        } else if (typ === "srv") {
            srv = stns;
        } else if (typ === "yrs") {
            yrs = stns;
        }

        if (typeof ou === 'undefined') {
        } else {
            qry1 = ou
        }

        if (typeof srv === 'undefined') {
        } else {
            qry2 = srv
        }

        if (typeof yrs === 'undefined') {
        } else {
            qry3 = yrs
        }

        if (typeof qry1 === 'string' && qry1 != "") {

            if (typeof qry3 === 'string' && qry3 != "") {
                allCheckboxes.prop('disabled', false)
                $('.irun').removeClass('disabled');
                $('.ipdf').removeClass('disabled');
            } else {
                allCheckboxes.prop('checked', true)
                allCheckboxes.prop('disabled', true)
                $('.irun').addClass('disabled');
                $('.ipdf').addClass('disabled');
            }
        } else {
            allCheckboxes.prop('checked', true)
            allCheckboxes.prop('disabled', true)
            $('.irun').addClass('disabled');
            $('.ipdf').addClass('disabled');
        }

    }

    function timeline_structure(id_ou, nameOu, year, tLtype) {
        console.log("-------------------")
        console.log("id_ou: " + id_ou)
        console.log("nameOu: " + nameOu)
        console.log("year: " + year)
        console.log("tLtype: " + tLtype)

        var timeline = '<div id="' + id_ou + tLtype + 'tl" class="timeline"></div>'
        var tpyr = '<div id="' + id_ou + tLtype + 'tpyr" class="tp_yr"></div>'
        var cebtn = '<div id="' + id_ou + tLtype + 'cebtn" class="ce_top"></div>'
        var topl = '<div id="' + id_ou + tLtype + 'topl" class="top_timeline">'
        var titleou = '<div id="' + id_ou + tLtype + 'titleou" class="title_ou">' + nameOu + '</div>'
        var btnhs = '<div id="' + id_ou + tLtype + 'btnhs" class="btn_hs">Hide year</div>'
        var btnaddnew = '<div id="' + id_ou + tLtype + 'btnaddnew" class="btn_addnew">Add New</div>'
        var tline = '<div id="' + id_ou + tLtype + 'tline" class="t_line">'
        var yrstart = '<div id="' + id_ou + tLtype + 'yrstart" class="yr_start">'
        var btmyr = '<div id="' + id_ou + tLtype + 'btmyr" class="btm_yr">'

        $(timeline).appendTo('#' + id_ou)
        $(tpyr).appendTo('#' + id_ou + tLtype + 'tl')

        $(cebtn).appendTo('#' + id_ou + tLtype + 'tl')
        $(topl).appendTo('#' + id_ou + tLtype + 'cebtn')
        $(titleou).appendTo('#' + id_ou + tLtype + 'topl')
        $(btnhs).appendTo('#' + id_ou + tLtype + 'topl')
        $(btnaddnew).appendTo('#' + id_ou + tLtype + 'topl')
        for (itp = 1; itp <= 12; itp++) {
            var tp = '<div id="' + id_ou + tLtype + 'tp' + itp + '" class="tp' + itp + '">'
            $(tp).appendTo('#' + id_ou + tLtype + 'tl')
        }
        $(tline).appendTo('#' + id_ou + tLtype + 'tl')
        $(btmyr).appendTo('#' + id_ou + tLtype + 'tl')
        for (ibtm = 1; ibtm <= 12; ibtm++) {
            var btm = '<div id="' + id_ou + tLtype + 'btm_' + ibtm + '" class="btm' + ibtm + '">'
            $(btm).appendTo('#' + id_ou + tLtype + 'tl')
        }
        $(yrstart).appendTo('#' + id_ou + tLtype + 'tline')
        if (year.length > 4) {
            var dateArray = year.split(",");
            for (x = 0; x <= year.length; x++) {
                $('#' + id_ou + tLtype + 'tlin').find('.child').eq(dateArray[x])// Falta crear las otras lineas  de años
            }
        } else {
            $('<div id="' + id_ou + tLtype + 'lbl_yr' + '" class="lbl">').appendTo('#' + id_ou + tLtype + 'yrstart')
            $('#' + id_ou + tLtype + 'lbl_yr').html(year)
        }

        // Top
// todo
        var tlTp1 = '<div id="' + id_ou + tLtype + 'pnl_top1" class="panel_top"><div id="' + id_ou + tLtype + 'contns1" class="contributions"><div id="' + id_ou + tLtype + '1cnstr" class="contrs1"></div></div><div id="' + id_ou + tLtype + 'lc1" class="line"></div></div>'
        var tlTp2 = '<div id="' + id_ou + tLtype + 'pnl_top2" class="panel_top"><div id="' + id_ou + tLtype + 'contns2" class="contributions"><div id="' + id_ou + tLtype + '2cnstr" class="contrs2"></div></div><div id="' + id_ou + tLtype + 'lc2" class="line"></div></div>'
        var tlTp3 = '<div id="' + id_ou + tLtype + 'pnl_top3" class="panel_top"><div id="' + id_ou + tLtype + 'contns3" class="contributions"><div id="' + id_ou + tLtype + '3cnstr" class="contrs3"></div></div><div id="' + id_ou + tLtype + 'lc3" class="line"></div></div>'
        var tlTp4 = '<div id="' + id_ou + tLtype + 'pnl_top4" class="panel_top"><div id="' + id_ou + tLtype + 'contns4" class="contributions"><div id="' + id_ou + tLtype + '4cnstr" class="contrs4"></div></div><div id="' + id_ou + tLtype + 'lc4" class="line"></div></div>'
        var tlTp5 = '<div id="' + id_ou + tLtype + 'pnl_top5" class="panel_top"><div id="' + id_ou + tLtype + 'contns5" class="contributions"><div id="' + id_ou + tLtype + '5cnstr" class="contrs5"></div></div><div id="' + id_ou + tLtype + 'lc5" class="line"></div></div>'
        var tlTp6 = '<div id="' + id_ou + tLtype + 'pnl_top6" class="panel_top"><div id="' + id_ou + tLtype + 'contns6" class="contributions"><div id="' + id_ou + tLtype + '6cnstr" class="contrs6"></div></div><div id="' + id_ou + tLtype + 'lc6" class="line"></div></div>'
        var tlTp7 = '<div id="' + id_ou + tLtype + 'pnl_top7" class="panel_top"><div id="' + id_ou + tLtype + 'contns7" class="contributions"><div id="' + id_ou + tLtype + '7cnstr" class="contrs7"></div></div><div id="' + id_ou + tLtype + 'lc7" class="line"></div></div>'
        var tlTp8 = '<div id="' + id_ou + tLtype + 'pnl_top8" class="panel_top"><div id="' + id_ou + tLtype + 'contns8" class="contributions"><div id="' + id_ou + tLtype + '8cnstr" class="contrs8"></div></div><div id="' + id_ou + tLtype + 'lc8" class="line"></div></div>'
        var tlTp9 = '<div id="' + id_ou + tLtype + 'pnl_top9" class="panel_top"><div id="' + id_ou + tLtype + 'contns9" class="contributions"><div id="' + id_ou + tLtype + '9cnstr" class="contrs9"></div></div><div id="' + id_ou + tLtype + 'lc9" class="line"></div></div>'
        var tlTp10 = '<div id="' + id_ou + tLtype + 'pnl_top10" class="panel_top"><div id="' + id_ou + tLtype + 'contns10" class="contributions"><div id="' + id_ou + tLtype + '10cnstr" class="contrs10"></div></div><div id="' + id_ou + tLtype + 'lc10" class="line"></div></div>'
        var tlTp11 = '<div id="' + id_ou + tLtype + 'pnl_top11" class="panel_top"><div id="' + id_ou + tLtype + 'contns11" class="contributions"><div id="' + id_ou + tLtype + '11cnstr" class="contrs11"></div></div><div id="' + id_ou + tLtype + 'lc11" class="line"></div></div>'
        var tlTp12 = '<div id="' + id_ou + tLtype + 'pnl_top12" class="panel_top"><div id="' + id_ou + tLtype + 'contns12" class="contributions"><div id="' + id_ou + tLtype + '12cnstr" class="contrs12"></div></div><div id="' + id_ou + tLtype + 'lc12" class="line"></div></div>'
        var contrs = '<div id="' + id_ou + tLtype + 'card_cntr" class="card_contr"><div class="partner">' + nameOu + '</div><div class="title">Title</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>';

        // Line
        var tlJan = '<div id="' + id_ou + tLtype + 'jan" class="tl_jan"><div id="' + id_ou + tLtype + 'cntr_top1" class="cntr_top1"></div><div class="cnt"><div class="lbl">jan</div></div><div id="' + id_ou + tLtype + 'cntr_bttm1" class="cntr_bttm1"></div></div>'
        var tlFeb = '<div id="' + id_ou + tLtype + 'feb" class="tl_feb"><div id="' + id_ou + tLtype + 'cntr_top2" class="cntr_top2"></div><div class="cnt"><div class="lbl">feb</div></div><div id="' + id_ou + tLtype + 'cntr_bttm2"  class="cntr_bttm2"></div></div>'
        var tlMar = '<div id="' + id_ou + tLtype + 'mar" class="tl_mar"><div id="' + id_ou + tLtype + 'cntr_top3" class="cntr_top3"></div><div class="cnt"><div class="lbl">mar</div></div><div id="' + id_ou + tLtype + 'cntr_bttm3"  class="cntr_bttm3"></div></div>'
        var tlApr = '<div id="' + id_ou + tLtype + 'apr" class="tl_apr"><div id="' + id_ou + tLtype + 'cntr_top4" class="cntr_top4"></div><div class="cnt"><div class="lbl">apr</div></div><div id="' + id_ou + tLtype + 'cntr_bttm4"  class="cntr_bttm4"></div></div>'
        var tlMay = '<div id="' + id_ou + tLtype + 'may" class="tl_may"><div id="' + id_ou + tLtype + 'cntr_top5" class="cntr_top5"></div><div class="cnt"><div class="lbl">may</div></div><div id="' + id_ou + tLtype + 'cntr_bttm5"  class="cntr_bttm5"></div></div>'
        var tlJun = '<div id="' + id_ou + tLtype + 'jun" class="tl_jun"><div id="' + id_ou + tLtype + 'cntr_top6" class="cntr_top6"></div><div class="cnt"><div class="lbl">jun</div></div><div id="' + id_ou + tLtype + 'cntr_bttm6"  class="cntr_bttm6"></div></div>'
        var tlJul = '<div id="' + id_ou + tLtype + 'jul" class="tl_jul"><div id="' + id_ou + tLtype + 'cntr_top7" class="cntr_top7"></div><div class="cnt"><div class="lbl">jul</div></div><div id="' + id_ou + tLtype + 'cntr_bttm7"  class="cntr_bttm7"></div></div>'
        var tlAug = '<div id="' + id_ou + tLtype + 'aug" class="tl_aug"><div id="' + id_ou + tLtype + 'cntr_top8" class="cntr_top8"></div><div class="cnt"><div class="lbl">aug</div></div><div id="' + id_ou + tLtype + 'cntr_bttm8"  class="cntr_bttm8"></div></div>'
        var tlSep = '<div id="' + id_ou + tLtype + 'sep" class="tl_sep"><div id="' + id_ou + tLtype + 'cntr_top9" class="cntr_top9"></div><div class="cnt"><div class="lbl">sep</div></div><div id="' + id_ou + tLtype + 'cntr_bttm9"  class="cntr_bttm9"></div></div>'
        var tlOct = '<div id="' + id_ou + tLtype + 'oct" class="tl_oct"><div id="' + id_ou + tLtype + 'cntr_top10" class="cntr_top10"></div><div class="cnt"><div class="lbl">oct</div></div><div id="' + id_ou + tLtype + 'cntr_bttm10"  class="cntr_bttm10"></div></div>'
        var tlNov = '<div id="' + id_ou + tLtype + 'nov" class="tl_nov"><div id="' + id_ou + tLtype + 'cntr_top11" class="cntr_top11"></div><div class="cnt"><div class="lbl">nov</div></div><div id="' + id_ou + tLtype + 'cntr_bttm11"  class="cntr_bttm11"></div></div>'
        var tlDic = '<div id="' + id_ou + tLtype + 'dic" class="tl_dic"><div id="' + id_ou + tLtype + 'cntr_top12" class="cntr_top12"></div><div class="cnt"><div class="lbl">dic</div></div><div id="' + id_ou + tLtype + 'cntr_bttm12"  class="cntr_bttm12"></div></div>'

        $('#' + id_ou + tLtype + 'tline').append(tlJan, tlFeb, tlMar, tlApr, tlMay, tlJun, tlJul, tlAug, tlSep, tlOct, tlNov, tlDic);

        // Bottom
        var tlBttm1 = '<div class="pnl_bttm1"><div class="impacts"><div id="' + id_ou + tLtype + 'cards1" class="cards1"></div></div><div class="line"></div></div>'
        var tlBttm2 = '<div class="pnl_bttm2"><div class="impacts"><div id="' + id_ou + tLtype + 'cards2" class="cards2"></div></div><div class="line"></div></div>'
        var tlBttm3 = '<div class="pnl_bttm3"><div class="impacts"><div id="' + id_ou + tLtype + 'cards3" class="cards3"></div></div><div class="line"></div></div>'
        var tlBttm4 = '<div class="pnl_bttm4"><div class="impacts"><div id="' + id_ou + tLtype + 'cards4" class="cards4"></div></div><div class="line"></div></div>'
        var tlBttm5 = '<div class="pnl_bttm5"><div class="impacts"><div id="' + id_ou + tLtype + 'cards5" class="cards5"></div></div><div class="line"></div></div>'
        var tlBttm6 = '<div class="pnl_bttm6"><div class="impacts"><div id="' + id_ou + tLtype + 'cards6" class="cards6"></div></div><div class="line"></div></div>'
        var tlBttm7 = '<div class="pnl_bttm7"><div class="impacts"><div id="' + id_ou + tLtype + 'cards7" class="cards7"></div></div><div class="line"></div></div>'
        var tlBttm8 = '<div class="pnl_bttm8"><div class="impacts"><div id="' + id_ou + tLtype + 'cards8" class="cards8"></div></div><div class="line"></div></div>'
        var tlBttm9 = '<div class="pnl_bttm9"><div class="impacts"><div id="' + id_ou + tLtype + 'cards9" class="cards9"></div></div><div class="line"></div></div>'
        var tlBttm10 = '<div class="pnl_bttm10"><div class="impacts"><div id="' + id_ou + tLtype + 'cards10" class="cards10"></div></div><div class="line"></div></div>'
        var tlBttm11 = '<div class="pnl_bttm11"><div class="impacts"><div id="' + id_ou + tLtype + 'cards11" class="cards11"></div></div><div class="line"></div></div>'
        var tlBttm12 = '<div class="pnl_bttm12"><div class="impacts"><div id="' + id_ou + tLtype + 'cards12" class="cards12"></div></div><div class="line"></div></div>'

        // Bottom
        var tlcard1 = '<div class="card_lgn1"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Regression Introduced</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'
        var tlcard2 = '<div class="card_lgnd2"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Loss</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'
        var tlcard3 = '<div class="card_lgnd3"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Defended</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'
        var tlcard4 = '<div class="card_lgnd4"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Reform Introduced</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'
        var tlcard5 = '<div class="card_lgnd5"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Advanced</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div> </div>'
        var tlcard6 = '<div class="card_lgnd6"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Approved</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'
        var tlcard7 = '<div class="card_lgnd7"><div class="partner">' + nameOu + '</div><div class="title">Need</div><div class="subtitle">Implemented</div><div class="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem ipsum, cond consectetur adipisci (MAX 120 caracters).</div></div>'

        var dtImpacts = '<div class="lbl">Impact</div>'

        var random_lgnd = [tlcard1, tlcard2, tlcard3, tlcard4, tlcard5, tlcard6, tlcard7];

        if (tL1tp1 >= 1 && tLtype == 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp1').append(tlTp1);
            for (i = 1; i <= tL1tp1; i++) {
                $('#' + id_ou + tLtype + '1cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '1dots" class="dots_contr1">').appendTo('#' + id_ou + tLtype + 'cntr_top1')
            $('#' + id_ou + tLtype + '1dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '1cnstr').children().length;
            dotlgnd = '<div id="dot1" class="dot1">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '1dots').append(dotlgnd)
        }
        if (tL1tp2 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp2').append(tlTp2);
            for (i = 1; i <= tL1tp2; i++) {
                $('#' + id_ou + tLtype + '2cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '2dots" class="dots_contr2">').appendTo('#' + id_ou + tLtype + 'cntr_top2')
            $('#' + id_ou + tLtype + '2dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '2cnstr').children().length;
            dotlgnd = '<div id="dot2" class="dot2">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '2dots').append(dotlgnd)
        }
        if (tL1tp3 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp3').append(tlTp3);
            for (i = 1; i <= tL1tp3; i++) {
                $('#' + id_ou + tLtype + '3cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '3dots" class="dots_contr3">').appendTo('#' + id_ou + tLtype + 'cntr_top3')
            $('#' + id_ou + tLtype + '3dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '3cnstr').children().length;
            dotlgnd = '<div id="dot3" class="dot3">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '3dots').append(dotlgnd)
        }
        if (tL1tp4 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp4').append(tlTp4);
            for (i = 1; i <= tL1tp4; i++) {
                $('#' + id_ou + tLtype + '4cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '4dots" class="dots_contr4">').appendTo('#' + id_ou + tLtype + 'cntr_top4')
            $('#' + id_ou + tLtype + '4dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '4cnstr').children().length;
            dotlgnd = '<div id="dot4" class="dot4">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '4dots').append(dotlgnd)
        }
        if (tL1tp5 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp5').append(tlTp5);
            for (i = 1; i <= tL1tp5; i++) {
                $('#' + id_ou + tLtype + '5cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '5dots" class="dots_contr5">').appendTo('#' + id_ou + tLtype + 'cntr_top5')
            $('#' + id_ou + tLtype + '5dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '5cnstr').children().length;
            dotlgnd = '<div id="dot5" class="dot5">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '5dots').append(dotlgnd)
        }
        if (tL1tp6 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp6').append(tlTp6);
            for (i = 1; i <= tL1tp6; i++) {
                $('#' + id_ou + tLtype + '6cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '6dots" class="dots_contr6">').appendTo('#' + id_ou + tLtype + 'cntr_top6')
            $('#' + id_ou + tLtype + '6dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '6cnstr').children().length;
            dotlgnd = '<div id="dot6" class="dot6">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '6dots').append(dotlgnd)
        }
        if (tL1tp7 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp7').append(tlTp7);
            for (i = 1; i <= tL1tp7; i++) {
                $('#' + id_ou + tLtype + '7cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '7dots" class="dots_contr7">').appendTo('#' + id_ou + tLtype + 'cntr_top7')
            $('#' + id_ou + tLtype + '7dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '7cnstr').children().length;
            dotlgnd = '<div id="dot7" class="dot7">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '7dots').append(dotlgnd)
        }
        if (tL1tp8 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp8').append(tlTp8);
            for (i = 1; i <= tL1tp8; i++) {
                $('#' + id_ou + tLtype + '8cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '8dots" class="dots_contr8">').appendTo('#' + id_ou + tLtype + 'cntr_top8')
            $('#' + id_ou + tLtype + '8dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '8cnstr').children().length;
            dotlgnd = '<div id="dot8" class="dot8">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '8dots').append(dotlgnd)
        }
        if (tL1tp9 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp9').append(tlTp9);
            for (i = 1; i <= tL1tp9; i++) {
                $('#' + id_ou + tLtype + '9cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '9dots" class="dots_contr9">').appendTo('#' + id_ou + tLtype + 'cntr_top9')
            $('#' + id_ou + tLtype + '9dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '9cnstr').children().length;
            dotlgnd = '<div id="dot9" class="dot9">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '9dots').append(dotlgnd)
        }
        if (tL1tp10 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp10').append(tlTp10);
            for (i = 1; i <= tL1tp10; i++) {
                $('#' + id_ou + tLtype + '10cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '10dots" class="dots_contr10">').appendTo('#' + id_ou + tLtype + 'cntr_top10')
            $('#' + id_ou + tLtype + '10dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '10cnstr').children().length;
            dotlgnd = '<div id="dot10" class="dot10">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '10dots').append(dotlgnd)
        }
        if (tL1tp11 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp11').append(tlTp11);
            for (i = 1; i <= tL1tp11; i++) {
                $('#' + id_ou + tLtype + '11cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '11dots" class="dots_contr11">').appendTo('#' + id_ou + tLtype + 'cntr_top11')
            $('#' + id_ou + tLtype + '11dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '11cnstr').children().length;
            dotlgnd = '<div id="dot11" class="dot11">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '11dots').append(dotlgnd)
        }
        if (tL1tp12 >= 1) {
            //building contributions
            $('#' + id_ou + tLtype + 'tp12').append(tlTp12);
            for (i = 1; i <= tL1tp12; i++) {
                $('#' + id_ou + tLtype + '12cnstr').append(contrs);
            }
            //building contributions dots
            $('<div id= "' + id_ou + tLtype + '12dots" class="dots_contr12">').appendTo('#' + id_ou + tLtype + 'cntr_top12')
            $('#' + id_ou + tLtype + '12dots').append('<div class="lbl">Contributions</div>')

            var numContr = $('#' + id_ou + tLtype + '12cnstr').children().length;
            dotlgnd = '<div id="dot12" class="dot12">' + numContr + '</div>'
            $('#' + id_ou + tLtype + '12dots').append(dotlgnd)
        }

        //building impacts
        if (tL1btm1 >= 1) {
            $('<div class="activ_' + tL1btm1 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm1')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm1' + ' > .activ_' + tL1btm1)
            $('#' + id_ou + tLtype + 'btm_1').append(tlBttm1)

            for (i = 1; i <= tL1btm1; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards1').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards1').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm1);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm1').children(active).append(dotlgnd);
                }
            }

        }
        if (tL1btm2 >= 1) {
            $('<div class="activ_' + tL1btm2 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm2')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm2' + ' > .activ_' + tL1btm2)
            $('#' + id_ou + tLtype + 'btm_2').append(tlBttm2)

            for (i = 1; i <= tL1btm2; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards2').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards2').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm2);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm2').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm3 >= 1) {
            $('<div class="activ_' + tL1btm3 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm3')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm3' + ' > .activ_' + tL1btm3)
            $('#' + id_ou + tLtype + 'btm_3').append(tlBttm3)

            for (i = 1; i <= tL1btm3; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards3').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards3').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm3);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm3').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm4 >= 1) {
            $('<div class="activ_' + tL1btm4 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm4')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm4' + ' > .activ_' + tL1btm4)
            $('#' + id_ou + tLtype + 'btm_4').append(tlBttm4)

            for (i = 1; i <= tL1btm4; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards4').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards4').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm4);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm4').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm5 >= 1) {
            $('<div class="activ_' + tL1btm5 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm5')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm5' + ' > .activ_' + tL1btm5)
            $('#' + id_ou + tLtype + 'btm_5').append(tlBttm5)

            for (i = 1; i <= tL1btm5; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards5').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards5').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm5);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm5').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm6 >= 1) {
            $('<div class="activ_' + tL1btm6 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm6')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm6' + ' > .activ_' + tL1btm6)
            $('#' + id_ou + tLtype + 'btm_6').append(tlBttm6)

            for (i = 1; i <= tL1btm6; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards6').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards6').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm6);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm6').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm7 >= 1) {
            $('<div class="activ_' + tL1btm7 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm7')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm7' + ' > .activ_' + tL1btm7)
            $('#' + id_ou + tLtype + 'btm_7').append(tlBttm7)

            for (i = 1; i <= tL1btm7; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards7').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards7').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm7);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm7').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm8 >= 1) {
            $('<div class="activ_' + tL1btm8 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm8')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm8' + ' > .activ_' + tL1btm8)
            $('#' + id_ou + tLtype + 'btm_8').append(tlBttm8)

            for (i = 1; i <= tL1btm8; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards8').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards8').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm8);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm8').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm9 >= 1) {
            $('<div class="activ_' + tL1btm9 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm9')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm9' + ' > .activ_' + tL1btm9)
            $('#' + id_ou + tLtype + 'btm_9').append(tlBttm9)

            for (i = 1; i <= tL1btm9; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards9').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards9').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm9);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm9').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm10 >= 1) {
            $('<div class="activ_' + tL1btm10 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm10')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm10' + ' > .activ_' + tL1btm10)
            $('#' + id_ou + tLtype + 'btm_10').append(tlBttm10)

            for (i = 1; i <= tL1btm10; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards10').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards10').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm10);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm10').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm11 >= 1) {
            $('<div class="activ_' + tL1btm11 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm11')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm11' + ' > .activ_' + tL1btm11)
            $('#' + id_ou + tLtype + 'btm_11').append(tlBttm11)

            for (i = 1; i <= tL1btm11; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards11').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards11').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm11);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm11').children(active).append(dotlgnd);
                }
            }
        }
        if (tL1btm12 >= 1) {
            $('<div class="activ_' + tL1btm12 + '">').appendTo('#' + id_ou + tLtype + 'cntr_bttm12')
            $(dtImpacts).appendTo('#' + id_ou + tLtype + 'cntr_bttm12' + ' > .activ_' + tL1btm12)
            $('#' + id_ou + tLtype + 'btm_12').append(tlBttm12)

            for (i = 1; i <= tL1btm12; i++) {
                var randomBtm = random_lgnd[Math.floor(Math.random() * random_lgnd.length)]
                $('#' + id_ou + tLtype + 'cards12').append(randomBtm)
            }

            var lg1 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgn1').length;
            var lg2 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd2').length;
            var lg3 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd3').length;
            var lg4 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd4').length;
            var lg5 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd5').length;
            var lg6 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd6').length;
            var lg7 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd7').length;
            var lg8 = $('#' + id_ou + tLtype + 'cards12').find('.card_lgnd8').length;
            var dotlgnd = ''

            var active = $('.activ_' + tL1btm12);

            for (let i = 1; i <= 8; i++) {
                if (eval(`lg${i}`) != 0) {
                    let dotlgnd = `<div id="${id_ou}dot${i}" class="dot lgnd${i}_p">${eval(`lg${i}`)}</div>`;
                    $('#' + id_ou + tLtype + 'cntr_bttm12').children(active).append(dotlgnd);
                }
            }
        }

    }

    function building_timeline(id_ou, nameOu, year) {
        arrYear = year.split("/");
        timeline_structure(id_ou, nameOu, year, '0');
        //todo del

        if (arrYear.length == 1) {
            //Un año
            console.log("Un año")
            timeline_structure(id_ou, nameOu, year, '0');
        } else {
            //VARIOS años
            console.log("Varios año")
            let prefix = arrYear[0].slice(0, 2);
            for (var i = 0; i < arrYear.length; i++) {
                if (i !== 0) {
                    arrYear[i] = prefix + arrYear[i];
                }
            }
            sortyears(arrYear)

            for (var i = 0; i < sortedYears.length; i++) {
                timeline_structure(id_ou, nameOu, sortedYears[i], i)
            }
        }
    
    }

    function sortyears(arrYear) {

        if (mySwitch.checked) {
            sortedYears = arrYear.slice().sort(function (a, b) {
                return b - a;
            });
        } else {
            sortedYears = arrYear.slice().sort(function (a, b) {
                return a - b;
            });
        }
    }

    function timeline(ou, year) {
        $('.ounit').remove()

        var orgunits = '<div id="0" class="ounit"></div>'
            $('.timelines').append(orgunits)
            building_timeline(0, ou, year);
            console.log("*ou:" + ou)

            //todo del
/*
        if (ou.indexOf(',') !== -1) {
            var arrOu = ou.split(',');
            for (var i = 0; i < arrOu.length; i++) {
                var orgunit = '<div id="' + i + '" class="ounit"></div>'
                $('.timelines').append(orgunit)
                building_timeline(i, arrOu[i], year);
            }
        } else {
            var orgunit = '<div id="0" class="ounit"></div>'
            $('.timelines').append(orgunit)
            building_timeline(0, ou, year);
        }
        */
    }

    // Legends cta

    $('#lgnd0').click(function () {
        $(".card_contr").toggle(this.checked)
        $(".card_contr").parent().parent().parent().toggle(this.show)
    });

    $('#lgnd1').click(function () {
        $(".card_lgn1").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd2').click(function () {
        $(".card_lgnd2").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd3').click(function () {
        $(".card_lgnd3").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd4').click(function () {
        $(".card_lgnd4").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd5').click(function () {
        $(".card_lgnd5").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd6').click(function () {
        $(".card_lgnd6").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd7').click(function () {
        $(".card_lgnd7").toggle(this.checked)
        pnlLgnds();
    });

    $('#lgnd8').click(function () {
        $(".card_lgnd8").toggle(this.checked)
        pnlLgnds();
    });

    $(document).on('click', '.btn_hs', function () {
        id = $(this).prop("id")
        console.log("id: " + id)
        var firstTwoChars = id.substring(0, 2);
        console.log("firstTwoChars: " + firstTwoChars)
        $('#' + firstTwoChars + 'tpyr').toggle();
        $('#' + firstTwoChars + 'btmyr').toggle();
        for (itp = 1; itp <= 12; itp++) {
            var tp = '#' + firstTwoChars + 'tp' + itp
            $(tp).toggle();
        }

        for (ibtm = 1; ibtm <= 12; ibtm++) {
            var btm = '#' + firstTwoChars + 'btm_' + ibtm
            $(btm).toggle();
        }

        if ($('#' + firstTwoChars + 'tpyr').is(":visible")) {
            $(this).text("Hide year");//Hide all years
            console.log("firstTwoChars: " + firstTwoChars)
        } else {
            $(this).text("Show year");//Show all years
        }
    })

    function pnlLgnds() {

        for (i = 1; i <= 12; i++) {
            var panel = '.pnl_bttm' + i
            var cards = '.cards' + i
            var lngtCards = $(cards).children().length;
            var lngtCardsHide = $(cards).children().filter(':hidden').length;
            var isCardshow = $(cards).children().is(':visible')
            var hasChildren = $(panel).has('*').length > 0

            if (hasChildren == true) { // tiene hijos el mes
                if (lngtCardsHide < lngtCards) {
                    $(panel).css("visibility", "visible")
                }
                if (lngtCards != 0 && $(panel).is(':visible') == true) {
                    if ((lngtCards - lngtCardsHide) == 0 && isCardshow == false) {
                        $(panel).css("visibility", "hidden")
                    }
                }
            }
        }
    }

    function pdfStyle(status) {
        switch (status.toLowerCase()) {
            case 'on':
                $(".contributions").css("max-height", "none");
                $(".contributions > div").css("overflow", "hidden");
                $("html").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $("body").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $(".wrapper").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $(".content").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $(".timelines").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $(".ounit").css({
                    'width': 'auto',
                    'height': 'auto'
                })
                $(".timeline").css({
                    'width': 'auto',
                    'grid-template-rows': '36px auto 44px auto'
                })
                $(".impacts").css({
                    'max-height': 'none',
                    'height': 'auto'
                })
                $(".impacts > div").css("overflow", "hidden")
                break;
            case 'off':
                $(".contributions").css("max-height", "35vh")
                $(".contributions > div").css("overflow-x", "auto")


                $(".impacts").css({
                    'max-height': '35vh',
                    'height': 'auto'
                })
                $(".impacts > div").css("overflow", "auto")

                $("html").css({
                    'width': '100%',
                    'height': '100%'
                })
                $("body").css({
                    'width': '100%',
                    'height': '100%'
                })
                $(".wrapper").css({
                    'width': '100%',
                    'height': '100%'
                })
                $(".content").css({
                    'width': 'auto',
                    'height': 'calc(100% - 65px)'
                })
                $(".timelines").css({
                    'width': 'auto',
                    'height': '100%'
                })
                $(".ounit").css({
                    'width': 'auto',
                    'height': '100%'
                })
                $(".timeline").css({
                    'width': 'auto',
                    'height': '100%',
                    'grid-template-rows': '36px 1fr 44px 1fr'
                })
                break;
            default: return '';
        }
    }

    $(".ipdf").click(function () {
        if (!$(this).hasClass("disabled")) {
            $('<div class="scrim">').appendTo('body')

            $('<div class="dlg_pdf">').appendTo('.scrim')
            $('<div class="dlg_pdf_bar">').appendTo('.dlg_pdf')
            $('<div class="lbl">').appendTo('.dlg_pdf_bar')

            $('<div class="dlg_pdf_cta">').appendTo('.dlg_pdf')
            $('<div class="btn-sys-close">').appendTo('.dlg_pdf_cta')

            $('<div class="dlg_cnt">').appendTo('.dlg_pdf')
            $('<div class="dlg_pdf_preview">').appendTo('.dlg_cnt')

            $('<div class="dlg_pdf_canvas">').appendTo('.dlg_pdf_preview')

            $('<div class="dlg_pdf_btns">').appendTo('.dlg_cnt')


            $('<div class="cta_canvas">').appendTo('.dlg_pdf_btns')
            $('<div class="cnt">').appendTo('.cta_canvas')
            $('<div class="z_in">').appendTo('.cnt')
            $('<div class="z_out">').appendTo('.cnt')
            $('<div class="z_res">').appendTo('.cnt')


            $('<div id="zoomIn">').appendTo('.z_in')
            $('<div id="zoomOut">').appendTo('.z_out')
            $('<div id="zoom-reset">').appendTo('.z_res')

            var save_pdf = '<div id="save_pdf" class="btns">Save</div>'
            $('.dlg_pdf_btns').append(save_pdf)

            $('.dlg_pdf_pdf').addClass("d_lgnd0")
            $('.dlg_pdf_bar').addClass("tt_lgnd0")
            $('.dlg_pdf_cta').addClass("i_lgnd0")

            $('.dlg_pdf_bar').children().html("Export to PDF")


            $(".ignore").hide()

            pdfStyle('on')

            html2canvas(document.querySelector(".timeline")).then(canvas => {
                canvas.id = "myCanvas";
                $('.dlg_pdf_canvas').append(canvas)
                $('<script src="src/scripts/canvas.js">').appendTo('.dlg_pdf_canvas')
                $('#save_pdf').on('click', function () {
                    var imgTimeline = canvas.toDataURL('image/png')
                    var pdf = new jsPDF('l', 'mm', 'a4')

                    const imgProps = pdf.getImageProperties(imgTimeline);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgTimeline, 'PNG', 0, 0, pdfWidth - 20, pdfHeight - 20);
                    pdf.save($('.lb_ou').text());
                    $('div.scrim').remove()
                })

                pdfStyle('off')
                /*
                $(".contributions").css("max-height", "35vh")
                $(".contributions > div").css("overflow-x", "auto")
                $(".impacts").css("max-height", "35vh")
                $(".impacts > div").css("overflow-x", "auto")
                */
                $(".ignore").show()
            })
        }
    })

    function contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle, imgs) {
        var imgs = ["1.jpg", "2.jpg", "3.jpg"]
        var url = "https://knowtechture.com/timeline/src/assets/imgs/"
        $('<div class="scrim">').appendTo('body')

        $('<div class="dlg ' + dlgtype + '">').appendTo('.scrim')
        $('<div class="dlg_bar ' + groupStyle + '">').appendTo('.dlg')
        $('<div class="dlg_title">').appendTo('.dlg_bar')
        $('<div class="dlg_cta ' + groupStyle + '">').appendTo('.dlg_bar')
        $('<div class="btn-sys-edit">').appendTo('.dlg_cta')
        $('<div class="btn-sys-close">').appendTo('.dlg_cta')
        $('<div class="dlg_cnt">').appendTo('.dlg')

        $('<div class="cnt_header">').appendTo('.dlg_cnt')
        $('<div class="cnt_sections">').appendTo('.dlg_cnt')
        $('<div class="sections">').appendTo('.cnt_sections')

        $('<div class="wrapper-dlg">').appendTo('.cnt_header')
        $('<div class="header-dlg">').appendTo('.wrapper-dlg')
        $('<div class="top-l-dlg">').appendTo('.header-dlg')
        $('<div class="top-c-dlg">').appendTo('.header-dlg')
        $('<div class="top-r-dlg">').appendTo('.header-dlg')

        $('<div class="toggle-btn-dlg ' + groupStyle + '" id="button1">').appendTo('.top-r-dlg')
        $('<div class="i_dlg_doc">').appendTo('#button1')
        $('<span class="label" id="label1">').appendTo('#button1')

        $('<div class="toggle-btn-dlg ' + groupStyle + '" id="button2">').appendTo('.top-r-dlg')
        $('<div class="i_dlg_imgs">').appendTo('#button2')
        $('<span class="label" id="label2">').appendTo('#button2')

        $('<div class="cnt-dlg">').appendTo('.header-dlg')

        $('.top-l-dlg').html("<label>Advocacy Tracker</label>")
        $('.dlg_title').html(dlgNeed)
        $('.top-c-dlg').html("##/##/####")
        $('.cnt-dlg').html("[ Advocacy Stage ]")
        $('#label1').html("Documents")
        $('#label2').html("Images")

        $('<div class="sec1">').appendTo('.sections')
        $('<div class="dl2">').appendTo('.sec1')

        $('<div class="dl1_title">').appendTo('.dl1')
        $('<div class="dl1_end_d">').appendTo('.dl1')
        $('<div class="dl1_cont">').appendTo('.dl1')

        $('.dl2').html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel blandit libero, non suscipit ligula. Maecenas molestie finibus scelerisque. Curabitur luctus vel orci sed pulvinar. Suspendisse potenti. Donec orci velit, mollis eget arcu a, feugiat aliquam nunc. Morbi a consectetur ligula. Nunc mattis, metus sed dictum venenatis, quam felis placerat odio, at vulputate mauris eros sed mi. Aenean ut augue vestibulum, sollicitudin arcu tincidunt, ultrices sem. Suspendisse quis lobortis felis. Etiam tincidunt congue viverra. Pellentesque sapien nisl, condimentum sit amet diam at, finibus consectetur sapien. Quisque pretium suscipit felis et laoreet. Quisque tincidunt lectus leo, et aliquam arcu pretium vel. Cras finibus tincidunt tincidunt. Praesent eu luctus urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;Duis elit nisi, commodo et ornare eget, ultricies et turpis. Curabitur ullamcorper lacinia urna at mollis. Duis accumsan, mauris vitae posuere pulvinar, tortor ligula facilisis ex, at ultricies justo neque in dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan ante vitae neque imperdiet, a maximus nulla cursus. Nam facilisis scelerisque purus, vitae ornare neque placerat non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vel ante eget arcu pulvinar vehicula at at nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.Aenean mattis ultricies imperdiet. Nulla rhoncus, est sit amet commodo ullamcorper, augue arcu laoreet dolor, tristique dictum velit orci in dui. Nulla ut libero ut tellus porta convallis ut ultrices odio. Ut non volutpat risus, et consectetur justo. Aliquam consequat ut erat vitae tincidunt. Donec fringilla posuere quam, sed aliquet quam rutrum quis. Aenean euismod nulla non sem pharetra, sit amet luctus tortor pulvinar. Quisque consectetur lectus vitae hendrerit euismod. Sed non lobortis eros. Sed accumsan eget justo eu varius. Curabitur consequat, orci eget interdum luctus, turpis purus dictum ipsum, at egestas magna dui sit amet eros. Suspendisse quis sollicitudin sem.Phasellus mi turpis, posuere eget justo quis, maximus laoreet lectus. Praesent tempor urna orci, in auctor nunc porttitor id. Vivamus imperdiet odio non ultricies auctor.")

        $('<div class="sec2">').appendTo('.sections').css({
            'visibility': 'hidden',
            'height': '0px'
        })
        $('<div class="dl3">').appendTo('.sec2')

        $('<div class="dl3title">').appendTo('.dl3')
        $('.dl3title').html("Documents => Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum.")

        $('<div id="file1" class="dl3files">').appendTo('.dl3')

        $('<div id="f_icon1" class="f_icon">').appendTo('#file1')
        $('<div class="doc_file">').appendTo('#f_icon1')
        $('<div id="f_name1" class="f_name">').appendTo('#file1')

        $('#f_name1').html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum.")

        //--------------------------
        $('<div id="file2" class="dl3files">').appendTo('.dl3')
        $('<div id="f_icon2" class="f_icon">').appendTo('#file2')
        $('<div class="pdf_file">').appendTo('#f_icon2')
        $('<div id="f_name2" class="f_name">').appendTo('#file2')
        $('#f_name2').html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum.")

        $('<div id="file3" class="dl3files">').appendTo('.dl3')
        $('<div id="f_icon3" class="f_icon">').appendTo('#file3')
        $('<div class="xls_file">').appendTo('#f_icon3')
        $('<div id="f_name3" class="f_name">').appendTo('#file3')
        $('#f_name3').html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies dui, vel mattis risus sollicitudin vel. Curabitur eget euismod nisl, et luctus ipsum. Integer neque erat, ullamcorper non posuere a, dignissim a mi. Sed odio libero, convallis ut venenatis vitae, vehicula sed nunc. Praesent fringilla mollis purus at placerat. Sed volutpat et elit vel dignissim. Sed ut interdum magna. Nullam finibus velit ipsum.")

        $('<div class="sec3">').appendTo('.sections').css({
            'visibility': 'hidden',
            'height': '0px'
        })
        $('<div class="dl4">').appendTo('.sec3')
        $('<div class="dl4title">').appendTo('.dl4')
        $('<div class="dl4cont">').appendTo('.dl4')
        $('<div class="i1">').appendTo('.dl4cont')
        $('<div class="i2">').appendTo('.dl4cont')
        $('<div class="i3">').appendTo('.dl4cont')
        $('.dl4title').html("Images")
        $(".i1").html("<img src='" + url + imgs[0] + "' style='width:100%; height:auto;'>");
        $(".i2").html("<img src='" + url + imgs[1] + "' style='width:100%; height:auto;'>");
        $(".i3").html("<img src='" + url + imgs[2] + "' style='width:100%; height:auto;'>");
    }

    function contentCards_cont(dlgtype, dlgTitle, groupStyle) {

        $('<div class="scrim">').appendTo('body')

        $('<div class="dlg_contr ' + dlgtype + '">').appendTo('.scrim')
        $('<div class="dlg_bar ' + groupStyle + '">').appendTo('.dlg_contr')
        $('<div class="dlg_title">').appendTo('.dlg_bar')
        $('<div class="dlg_cta ' + groupStyle + '">').appendTo('.dlg_bar')
        $('<div class="btn-sys-edit">').appendTo('.dlg_cta')
        $('<div class="btn-sys-close">').appendTo('.dlg_cta')
        $('<div class="dlg_cnt">').appendTo('.dlg_contr')
        $('<div class="cnt_sections">').appendTo('.dlg_cnt')
        $('<div class="scrs">').appendTo('.cnt_sections')

        $('.dlg_title').html(dlgTitle)
        $('.scrs').html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel blandit libero, non suscipit ligula. Maecenas molestie finibus scelerisque. Curabitur luctus vel orci sed pulvinar. Suspendisse potenti. Donec orci velit, mollis eget arcu a, feugiat aliquam nunc. Morbi a consectetur ligula. Nunc mattis, metus sed dictum venenatis, quam felis placerat odio, at vulputate mauris eros sed mi. Aenean ut augue vestibulum, sollicitudin arcu tincidunt, ultrices sem. Suspendisse quis lobortis felis. Etiam tincidunt congue viverra. Pellentesque sapien nisl, condimentum sit amet diam at, finibus consectetur sapien. Quisque pretium suscipit felis et laoreet. Quisque tincidunt lectus leo, et aliquam arcu pretium vel. Cras finibus tincidunt tincidunt. Praesent eu luctus urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;Duis elit nisi, commodo et ornare eget, ultricies et turpis. Curabitur ullamcorper lacinia urna at mollis. Duis accumsan, mauris vitae posuere pulvinar, tortor ligula facilisis ex, at ultricies justo neque in dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan ante vitae neque imperdiet, a maximus nulla cursus. Nam facilisis scelerisque purus, vitae ornare neque placerat non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vel ante eget arcu pulvinar vehicula at at nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.Aenean mattis ultricies imperdiet. Nulla rhoncus, est sit amet commodo ullamcorper, augue arcu laoreet dolor, tristique dictum velit orci in dui. Nulla ut libero ut tellus porta convallis ut ultrices odio. Ut non volutpat risus, et consectetur justo. Aliquam consequat ut erat vitae tincidunt. Donec fringilla posuere quam, sed aliquet quam rutrum quis. Aenean euismod nulla non sem pharetra, sit amet luctus tortor pulvinar. Quisque consectetur lectus vitae hendrerit euismod. Sed non lobortis eros. Sed accumsan eget justo eu varius. Curabitur consequat, orci eget interdum luctus, turpis purus dictum ipsum, at egestas magna dui sit amet eros. Suspendisse quis sollicitudin sem.Phasellus mi turpis, posuere eget justo quis, maximus laoreet lectus. Praesent tempor urna orci, in auctor nunc porttitor id. Vivamus imperdiet odio non ultricies auctor.")
    }

    function contentCards_i(dlgtype, dlgTitle, groupStyle) {

        $('<div class="scrim">').appendTo('body')

        $('<div class="dlg_i ' + dlgtype + '">').appendTo('.scrim')
        $('<div class="dlg_bar ' + groupStyle + '">').appendTo('.dlg_i')
        $('<div class="dlg_title">').appendTo('.dlg_bar')
        $('<div class="dlg_cta ' + groupStyle + '">').appendTo('.dlg_bar')
        $('<div class="btn-sys-edit">').appendTo('.dlg_cta')
        $('<div class="btn-sys-close">').appendTo('.dlg_cta')
        $('<div class="dlg_cnt">').appendTo('.dlg_i')
        $('<div class="cnt_sections">').appendTo('.dlg_cnt')
        $('<div class="scrs">').appendTo('.cnt_sections')

        $('.dlg_title').html(dlgTitle)
        $('.scrs').html("Aliquam consequat ut erat vitae tincidunt. Donec fringilla posuere quam, sed aliquet quam rutrum quis. Aenean euismod nulla non sem pharetra, sit amet luctus tortor pulvinar. Quisque consectetur lectus vitae hendrerit euismod. Sed non lobortis eros. Sed accumsan eget justo eu varius.")
    }

    $(document).on('click', '.toggle-btn-dlg', function () {

        var numElementosActivos = $('.toggle-btn-dlg.active').length
        var labelContent = $(this).children(".label").html();

        if (numElementosActivos == 1) {

            if ($(this).hasClass('active')) {
                $('.toggle-btn-dlg').removeClass('active').css('width', '36px')
                if (labelContent == "Documents") {
                    $('.sec1').css({
                        'visibility': 'visible',
                        'height': '100%'
                    })
                    $('.sec2').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                    $('.sec3').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                } else {
                    $('.sec1').css({
                        'visibility': 'visible',
                        'height': '100%'
                    })
                    $('.sec2').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                    $('.sec3').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                }
            } else {
                $('.toggle-btn-dlg').removeClass('active').css('width', '36px')
                $(this).addClass('active').css('width', 'max-content')
                if (labelContent == "Documents") {
                    $('.sec1').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                    $('.sec2').css({
                        'visibility': 'visible',
                        'height': '100%'
                    })
                    $('.sec3').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                } else if (labelContent == "Images") {
                    $('.sec1').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                    $('.sec2').css({
                        'visibility': 'hidden',
                        'height': '0px'
                    })
                    $('.sec3').css({
                        'visibility': 'visible',
                        'height': '100%'
                    })

                }
            }
        } else {
            $(this).addClass('active').css('width', 'max-content')
            if (labelContent == "Documents") {
                $('.sec1').css({
                    'visibility': 'hidden',
                    'height': '0px'
                })
                $('.sec2').css({
                    'visibility': 'visible',
                    'height': '100%'
                })
                $('.sec3').css({
                    'visibility': 'hidden',
                    'height': '0px'
                })
            } else {
                $('.sec1').css({
                    'visibility': 'hidden',
                    'height': '0px'
                })
                $('.sec2').css({
                    'visibility': 'hidden',
                    'height': '0px'
                })
                $('.sec3').css({
                    'visibility': 'visible',
                    'height': '100%'
                })
            }
        }
    })

    var dlgtype, dlgNeed, dlgTitle, groupStyle

    $(document).on('click', '.card_lgn1', function () {
        dlgtype = 'd_lgnd1'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd1_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })


    $(document).on('click', '.card_lgnd2', function () {
        dlgtype = 'd_lgnd2'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd2_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_lgnd3', function () {
        dlgtype = 'd_lgnd3'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd3_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_lgnd4', function () {
        dlgtype = 'd_lgnd4'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd4_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_lgnd5', function () {
        dlgtype = 'd_lgnd5'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd5_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_lgnd6', function () {
        dlgtype = 'd_lgnd6'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd6_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_lgnd7', function () {
        dlgtype = 'd_lgnd7'
        dlgNeed = $(this).find(".subtitle").text()
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd7_g'
        contentCards_need(dlgtype, dlgNeed, dlgTitle, groupStyle)
    })

    $(document).on('click', '.card_contr', function () {
        dlgtype = 'd_lgnd0'
        dlgTitle = $(this).find(".title").text()
        groupStyle = 'lgnd0_g'
        contentCards_cont(dlgtype, dlgTitle, groupStyle)
    })

    if ($(".ipdf").hasClass(".disabled")) {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip({ delay: { "show": 500, "hide": 100 } })
        })
    } else {
        // ---

        $('.cnt_ipanel').on('click', function () {
            $('#search-menu').toggleClass('open');
            $('#panel_sh').toggleClass('open');
        });

        $('.cnt_irun').on('click', function () {
            console.log("qry1: " + qry1)
            console.log("qry3: " + qry3)
            timeline(qry1, qry3)
        });
    }
})