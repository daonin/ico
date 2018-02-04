$(function () {
    window.chartColors = {
        col01: 'rgb(91, 155, 213)',
        col02: 'rgb(237, 125, 49)',
        col03: 'rgb(165, 165, 165)',
        col04: 'rgb(255, 192, 0)',
        col05: 'rgb(68, 114, 196)',
        col06: 'rgb(112, 173, 71)',
        col07: 'rgb(37, 94, 145)',
        col08: 'rgb(158, 72, 14)',
        col09: 'rgb(99, 99, 99)',
        col10: 'rgb(153, 115, 0)'
    };

    var ctx = document.getElementById('tokenChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: [
                "ФОТ",
                "Antifrod",
                "Маркетинг существующих продуктов",
                "Баунти",
                "Операционные расходы",
                "Эдвайзеры, эскроу, IR",
                "Маркетинг новых продуктов", 
                "Оборудование",
                "Исследования и патенты",
                "Основатели проекта"],
            datasets: [{
                label: "Распределение токенов",
                backgroundColor: [
                    window.chartColors.col01,
                    window.chartColors.col02,
                    window.chartColors.col03,
                    window.chartColors.col04,
                    window.chartColors.col05,
                    window.chartColors.col06,
                    window.chartColors.col07,
                    window.chartColors.col08,
                    window.chartColors.col09,
                    window.chartColors.col10,
                ],
                data: [10, 5, 10, 10, 12, 8, 15, 5, 10, 15],
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                position: 'bottom'
            }
        }
    });
});
