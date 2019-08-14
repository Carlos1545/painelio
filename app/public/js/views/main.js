$(document).ready(function () {
    $('#sidebarCollapse').click( function () {
        $('#aside').toggleClass('d-none');
    });
    $('#sidebarMovement').click( function () {
        $('#aside').toggleClass('off-screen');
    });
});