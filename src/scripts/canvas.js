$(document).ready(function () {

    var zoom = 1;

    // Add click event for zoom in button
    $(document).on('click', '#zoomIn', function () {
        zoom += 0.1
        $("#myCanvas").css("transform", "scale(" + zoom + ")")
    });

    // Add click event for zoom out button
    $(document).on('click', '#zoomOut', function () {
        zoom -= 0.1
        $("#myCanvas").css("transform", "scale(" + zoom + ")")
    })

    $(document).on('click', '#zoom-reset', function () {
        $("#myCanvas").css("transform", "scale(1)")
        zoom = 1
    })
})