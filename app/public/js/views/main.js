$(document).ready(function () {
    $('#sidebarCollapse').click( function () {
        $('#aside').toggleClass('d-none');
        $('#main-content').toggleClass('painel-content-margin');
    });
    $('#sidebarMovement').click( function () {
        $('#aside').toggleClass('off-screen');
    });
    $('#painel-dropdown').click( function (event) {
        event.preventDefault();
        $(this).find('span.pull-right i.fa-angle-right').toggleClass('d-none');
        $(this).find('span.pull-right i.fa-angle-down').toggleClass('d-none');
    });
    
});