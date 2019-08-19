$(document).ready(function () {
    $('#sidebarCollapse').click( function () {
        $('#aside').toggleClass('d-none');
        $('#main-content').toggleClass('painel-content-margin');
    });
    $('#sidebarMovement').click( function () {
        $('#aside').toggleClass('off-screen');
    });
    $('.painel-dropdown').click( function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('dropped');
    });
    
});